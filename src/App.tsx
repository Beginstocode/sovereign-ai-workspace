import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/common/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { LoginPage } from './pages/LoginPage';
import { AgentsPage } from './pages/AgentsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ModelsPage } from './pages/ModelsPage';
import { ToolsPage } from './pages/ToolsPage';
import { ActivityPage } from './pages/ActivityPage';
import { SecurityPage } from './pages/SecurityPage';
import { ProjectsPage } from './pages/ProjectsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Global Enclave Authentication Modal */}
          <AuthModal />

          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Dedicated Authentication Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Operating System Workspace & Chat */}
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/chat" element={<WorkspacePage />} />
            <Route path="/chat/:id" element={<WorkspacePage />} />

            {/* Enterprise Views */}
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/projects" element={<ProjectsPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
