import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const AwaitingQualityCheck = () => {
  const [search, setSearch] = useState("");

  // Sample data
  const [products, setProducts] = useState([
    {
      id: "ORD001",
      name: "Priyanshu Sharma",
      phone: "9876543210",
      email: "priyanshu@example.com",
      address: "Udaipur, Rajasthan",
      issue: "Battery not charging",
      date: "2025-11-11",
      wayOfReaching: "Call",
      video: "https://example.com/video.mp4",
      rackNo: "RACK-12",
      status: "Approved",
    },
    {
      id: "ORD002",
      name: "Rahul Singh",
      phone: "9876509876",
      email: "rahul@example.com",
      address: "Jaipur, Rajasthan",
      issue: "Display cracked",
      date: "2025-11-09",
      wayOfReaching: "Email",
      video: "https://example.com/video2.mp4",
      rackNo: "RACK-08",
      status: "Approved",
    },
  ]);

  // Handle assign action (just removes from table)
  const handleAssignToMe = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  // Filter logic
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  // Table columns
  const columns = [
    { name: "Order ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Address", selector: (row) => row.address },
    { name: "Issue", selector: (row) => row.issue },
    { name: "Date", selector: (row) => row.date },
    { name: "Way of Reaching", selector: (row) => row.wayOfReaching },
    {
      name: "Video",
      cell: (row) => (
        <a
          href={row.video}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-medium"
        >
          View
        </a>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          {row.status}
        </span>
      ),
    },
    { name: "Rack No", selector: (row) => row.rackNo },

    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleAssignToMe(row.id)}
          className="px-3 py-1.5 text-xs font-medium rounded bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm transition-all"
        >
          Assign 
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
          🧰 Awaiting Quality Check
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-72">
            <FaSearch
              size={16}
              className="absolute left-3 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by order, name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm w-full border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            className="w-full sm:w-auto px-4 py-2.5 text-sm bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-all shadow-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-x-auto">
        <div className="min-w-[800px]">
          <DataTable
            columns={columns}
            data={filtered}
            pagination
            highlightOnHover
            dense
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default AwaitingQualityCheck;
