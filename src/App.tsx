import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/common/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { LoginPage } from './pages/LoginPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
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
          {/* Quick Enclave Switch Modal */}
          <AuthModal />

          <Routes>
            {/* Landing Page - Indian Government / PSU Digital Service Portal Style */}
            <Route path="/" element={<LandingPage />} />

            {/* Dedicated Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/employee" element={<LoginPage initialRole="employee" />} />
            <Route path="/login/admin" element={<LoginPage initialRole="admin" />} />

            {/* Admin Portal Dashboard */}
            <Route path="/admin" element={<AdminPortalPage />} />

            {/* Operating System Workspace & Chat (ChatGPT-Clean Style) */}
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/chat" element={<WorkspacePage />} />
            <Route path="/chat/:id" element={<WorkspacePage />} />

            {/* Enterprise & Government Sections */}
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
