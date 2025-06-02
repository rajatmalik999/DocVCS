import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './auth/context';
import { PopupProvider } from './auth/context';
import AppRoutes from './App/routes/routes';
// import Navbar from './utils/Navbar/Navbar';
// import LeftNavigationPanel from './utils/LeftNavigationPanel/LeftNavigationPanel';
import UserRoutes from './auth/router/userRoutes';
import FileVcsRoutes from './FileVCS/router/FileVcsRoutes';
import './App.css';

// Define route constants for better maintainability
const ROUTES = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_SUCCESS: '/auth/verify-success',
    PRE_VERIFICATION: '/auth/pre-verification'
  },
  APP: {
    BASE: '/app',
    DASHBOARD: '/app/dashboard',
    DOCUMENTS: '/app/documents',
    PROJECTS: '/app/projects'
  }
};

// Routes that should not show the navbar
const NO_NAVBAR_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.SIGNUP,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
  ROUTES.AUTH.VERIFY_SUCCESS,
  ROUTES.AUTH.PRE_VERIFICATION
];

// AppContent component to use useLocation
function AppContent() {
  // const location = useLocation();
  // const isNoNavbarRoute = NO_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {/* {!isNoNavbarRoute && <Navbar />} */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: 1980, minHeight: 'calc(100vh - 56px)' }}>
          {/* {!isNoNavbarRoute && <LeftNavigationPanel />} */}
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Authentication Routes */}
              <Route path={`${ROUTES.AUTH.BASE}/*`} element={<UserRoutes />} />
              {/* FileVCS Routes */}
              <Route path="/user/project/*" element={<FileVcsRoutes />} />
              {/* Documents Dashboard Route */}
              <Route path="/app/*" element={<AppRoutes />} />
              {/* Default Routes */}
              <Route path="/" element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />
              <Route path="*" element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/web">
      <PopupProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PopupProvider>
    </BrowserRouter>
  );
}

export default App;
