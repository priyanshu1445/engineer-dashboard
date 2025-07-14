import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import EngineerLayout from '../layout/EngineerLayout';

// Pages
import MyQueue from '../features/engineer/MyQueue';
import ScanOrder from '../features/engineer/ScanOrder';
// import RepairWorkflow from '../features/engineer/RepairWorkflow';
// import History from '../features/engineer/History';
import Login from '../components/auth/Login';

// Auth Wrapper
import PrivateRoute from '../routes/PrivateRoutes';
import Repair from '../features/engineer/Repair';
import History from '../features/engineer/History';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login on /admin */}
        <Route path="/admin" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<EngineerLayout />}>
            <Route path="/my-queue" element={<MyQueue />} />
            <Route path="/scan-order" element={<ScanOrder />} />
            <Route path="/repair-workflow" element={<Repair />} />
            <Route path="/history" element={<History />} />
   
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/my-queue" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
