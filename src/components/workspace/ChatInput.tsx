import React, { useState, useRef } from 'react';
import { Paperclip, ArrowUp, X, FileText, UploadCloud, Bot } from 'lucide-react';
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
  attachedFiles,
  onAddFile,
  onRemoveFile,
}) => {
  const [inputText, setInputText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = (inputText.trim() || attachedFiles.length > 0) && !disabled;

  const handleSubmit = () => {
    if (!canSend) return;
    onSendMessage(inputText.trim(), attachedFiles);
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      onAddFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + ' MB', type: file.type || 'application/octet-stream' });
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      const file = e.dataTransfer.files[0];
      onAddFile({ name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + ' MB', type: file.type || 'application/octet-stream' });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-2xl border transition-all duration-200 ${
        isDragging
          ? 'border-[#EE7027]/60 bg-[#EE7027]/5'
          : 'border-white/10 bg-[#1A1A1A] focus-within:border-white/20'
      }`}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden"
        accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg,.csv,.py,.ts,.cpp,.json" />

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl bg-[#0D0D0D]/90 z-20 flex items-center justify-center gap-2 text-white text-sm font-medium">
          <UploadCloud className="w-5 h-5 text-[#EE7027] animate-bounce" />
          <span>Drop to attach</span>
        </div>
      )}

      {/* Attached file chips */}
      {attachedFiles.length > 0 && (
        <div className="px-3 pt-3 flex flex-wrap gap-2">
          {attachedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 font-medium">
              <FileText className="w-3.5 h-3.5 text-[#EE7027]" />
              <span className="max-w-[160px] truncate">{file.name}</span>
              <span className="text-white/25">({file.size})</span>
              <button type="button" onClick={() => onRemoveFile(idx)} className="ml-1 text-white/25 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder={`Message ${activeAgent.name}...`}
        className="w-full bg-transparent text-sm text-white placeholder-white/25 resize-none focus:outline-none px-4 pt-4 pb-3 leading-relaxed"
        style={{ minHeight: '52px', maxHeight: '180px' }}
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          {/* Attach */}
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors" title="Attach file">
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Agent chip */}
          <button type="button" onClick={onOpenAgentModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors border border-white/10">
            <Bot className="w-3.5 h-3.5" />
            <span>{activeAgent.name}</span>
          </button>
        </div>

        {/* Send */}
        <button type="button" onClick={handleSubmit} disabled={!canSend}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            canSend
              ? 'bg-[#EE7027] hover:bg-[#D65F18] text-white active:scale-95 shadow-lg shadow-[#EE7027]/20'
              : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`} title="Send">
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
