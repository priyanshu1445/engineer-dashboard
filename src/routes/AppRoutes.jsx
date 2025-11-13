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
import AllProducts from '../features/engineer/AllProducts';
import AssignProducts from '../features/engineer/AssignProducts';
import ApprovedProducts from '../features/engineer/ApprovedProducts';
import AwaitingQualityCheck from '../features/engineer/AwaitingQualityCheck';
import NotApproveProducts from '../features/engineer/NotApproveProducts';
import AssignedQualityCheckProducts from '../features/engineer/AssignedQualityCheckProducts';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login on /admin */}
        <Route path="/admin" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<EngineerLayout />}>  
            {/* <Route path="/my-queue" element={<MyQueue />} /> */}
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/assign-products" element={<AssignProducts />} />
            <Route path="/approve-products" element={<ApprovedProducts />} />
            <Route path="/not-approve-products" element={<NotApproveProducts />} />
            <Route path="/awaiting-products" element={<AwaitingQualityCheck />} />
            <Route path="/assign-quality-products" element={<AssignedQualityCheckProducts />} />
            <Route path="/scan-order" element={<ScanOrder />} />
            <Route path="/repair-workflow" element={<Repair />} />
            <Route path="/history" element={<History />} />
   
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/all-products" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
