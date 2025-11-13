import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box, QrCode, Wrench, Archive, LogOut, ChevronDown, ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `nav-link d-flex align-items-center gap-2 px-3 py-2 ${isActive ? 'bg-primary text-white' : 'text-dark'}`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

const SidebarGroup = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(true); // Keep open by default

  return (
    <div className="px-2">
      <div
        className="d-flex justify-content-between align-items-center px-2 py-2 text-dark fw-bold"
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <span className="d-flex align-items-center gap-2">
          <Icon size={18} />
          {label}
        </span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      {open && <div className="ms-4">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="vh-100 bg-light border-end" style={{ width: 240, overflowY: 'auto' }}>
      <div className="p-3 border-bottom text-primary fw-bold fs-5">Engineer Panel</div>

      {/* ✅ Updated paths to match route config */}
      <SidebarItem icon={Box} label="All Products" path="/all-products" />
      {/* <SidebarItem icon={Box} label="My Queue" path="/my-queue" /> */}
      <SidebarItem icon={Box} label="Assigned Products" path="/assign-products" />
      <SidebarItem icon={Box} label="Approve  Products" path="/approve-products" />
      <SidebarItem icon={Box} label="Not Approve  Products" path="/not-approve-products" />
      <SidebarItem icon={Box} label="Awaiting Quality Check Products" path="/awaiting-products" />
      <SidebarItem icon={Box} label="Assigned Quality Check Products" path="/assign-quality-products" />
      {/* <SidebarItem icon={QrCode} label="Scan / Enter Order" path="/scan-order" /> */}
      {/* <SidebarItem icon={Wrench} label="Repair Workflow" path="/repair-workflow" /> */}
      {/* <SidebarItem icon={Archive} label="History" path="/history" /> */}

      {/* Logout */}
      <div className="mt-4">
        <SidebarItem icon={LogOut} label="Logout" path="/admin" />
      </div>
    </div>
  );
};

export default Sidebar;
