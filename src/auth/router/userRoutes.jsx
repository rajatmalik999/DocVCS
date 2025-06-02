import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Popup } from '../utils';
import { LoaderProvider } from '../utils';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SuccessfulVerificationPage,
  PreEmailVerificationPage
} from '../pages';

const UserRoutes = () => (
  <LoaderProvider>
    <Popup />
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="verify-success" element={<SuccessfulVerificationPage />} />
      <Route path="pre-email-verification" element={<PreEmailVerificationPage />} />
    </Routes>
  </LoaderProvider>
);

export default UserRoutes;
