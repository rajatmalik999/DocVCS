import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectDocumentGrid from '../components/ProjectDocumentGrid/ProjectDocumentGrid';
import ProjectGrid from '../components/ProjectGrid/ProjectGrid';
import ProjectTaskGrid from '../components/ProjectTaskGrid/ProjectTaskGrid';
import LeftPanel from '../utils/LeftPanel/LeftPanel';
import ProjectTeamGrid from '../components/ProjectTeamGrid/ProjectTeamGrid';
import DashboardPage from '../pages/DashboardPage/DashboardPage';

const AppRoutes = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 1980, minHeight: '100vh', position: 'relative' }}>
        <LeftPanel />
        <div style={{ 
          flex: 1, 
          marginLeft: '16rem',
          transition: 'margin-left 0.2s ease'
        }}>
          <Routes>
            <Route path="/*" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectGrid />} />
            <Route path="/documents" element={<ProjectDocumentGrid />} />
            <Route path="/tasks" element={<ProjectTaskGrid />} />
            <Route path="/teams" element={<ProjectTeamGrid />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;
