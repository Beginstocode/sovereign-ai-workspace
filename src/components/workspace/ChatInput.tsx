import React, { useState } from 'react';
import { 
  Paperclip, 
  ArrowRight, 
  X, 
  FileText, 
  UploadCloud,
  CornerDownLeft
} from 'lucide-react';
import { Agent } from '../../types';

interface AttachedFile {
  name: string;
  size: string;
  type: string;
}

interface ChatInputProps {
  onSendMessage: (text: string, files: AttachedFile[]) => void;
  disabled?: boolean;
  activeAgent: Agent;
  onOpenAgentModal: () => void;
  onOpenToolsModal?: () => void;
  attachedFiles: AttachedFile[];
  onAddFile: (file: AttachedFile) => void;
  onRemoveFile: (index: number) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  activeAgent,
  onOpenAgentModal,
  onOpenToolsModal,
  attachedFiles,
  onAddFile,
  onRemoveFile
}) => {
  const [inputText, setInputText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && attachedFiles.length === 0) || disabled) return;
    onSendMessage(inputText.trim(), attachedFiles);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      onAddFile({
        name: file.name,
        size: sizeStr,
        type: file.type || 'application/octet-stream'
      });
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      onAddFile({
        name: file.name,
        size: sizeStr,
        type: file.type || 'application/octet-stream'
      });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-xl border transition-all duration-200 shadow-sm ${
        isDragging
          ? 'border-[#F97316] bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#FFF7ED]'
          : 'border-[#262626] dark:border-[#262626] light:border-[#D4D4D4] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] focus-within:border-[#525252] dark:focus-within:border-[#525252] light:focus-within:border-[#171717]'
      }`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg,.csv,.rs,.py,.ts,.cpp,.json"
      />

      {/* Drag & drop overlay preview */}
      {isDragging && (
        <div className="absolute inset-0 rounded-xl bg-[#171717]/90 backdrop-blur-sm z-20 flex items-center justify-center gap-2 text-white font-mono text-xs">
          <UploadCloud className="w-4 h-4 text-[#F97316] animate-bounce" />
          <span>Drop confidential file for local ingestion</span>
        </div>
      )}

      {/* Attached Files Chips Bar */}
      {attachedFiles.length > 0 && (
        <div className="p-2.5 pb-0 flex items-center gap-2 flex-wrap">
          {attachedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#262626] dark:bg-[#262626] light:bg-[#F5F5F5] border border-[#333333] dark:border-[#333333] light:border-[#E5E5E5] text-xs font-mono text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717]"
            >
              <FileText className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="truncate max-w-[180px] font-medium">{file.name}</span>
              <span className="text-[#A3A3A3] text-[10px]">({file.size})</span>
              <button
                type="button"
                onClick={() => onRemoveFile(idx)}
                className="hover:text-red-400 text-[#737373] p-0.5 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Textarea - clean, high contrast, generous whitespace */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={2}
        placeholder={`Message ${activeAgent.name}... (Press Enter to send, Shift+Enter for new line)`}
        className="w-full bg-transparent text-sm text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717] placeholder-[#737373] resize-none focus:outline-none px-4 pt-3.5 pb-2 font-sans"
      />

      {/* Action Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-[#1F1F1F] dark:border-[#1F1F1F] light:border-[#F5F5F5] text-xs">
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black hover:bg-[#262626] dark:hover:bg-[#262626] light:hover:bg-[#F5F5F5] transition-colors"
            title="Attach confidential files"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Attach</span>
          </button>

          <button
            type="button"
            onClick={onOpenAgentModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black hover:bg-[#262626] dark:hover:bg-[#262626] light:hover:bg-[#F5F5F5] transition-colors"
            title="Switch specialist agent"
          >
            <span className="text-[#F97316] font-semibold">//</span>
            <span>{activeAgent.name}</span>
          </button>
        </div>

        {/* Right Send Button - clean, solid, high contrast */}
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={disabled || (!inputText.trim() && attachedFiles.length === 0)}
          className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${
            inputText.trim() || attachedFiles.length > 0
              ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white hover:opacity-90'
              : 'bg-[#262626] dark:bg-[#262626] light:bg-[#E5E5E5] text-[#525252] dark:text-[#525252] light:text-[#A3A3A3] cursor-not-allowed'
          }`}
          title="Send message"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
