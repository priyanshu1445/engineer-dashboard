import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const NotApproveProducts = () => {
  const [search, setSearch] = useState("");

  // Sample data
  const [products, setProducts] = useState([
    {
      id: "ORD101",
      name: "Priyanshu Sharma",
      phone: "9876543210",
      email: "priyanshu@example.com",
      address: "Udaipur, Rajasthan",
      issue: "Motherboard issue",
      date: "2025-11-10",
      wayOfReaching: "Call",
      video: "https://example.com/video.mp4",
      rackNo: "RACK-04",
      status: "Not Approved",
    },
    {
      id: "ORD102",
      name: "Rahul Singh",
      phone: "9988776655",
      email: "rahul@example.com",
      address: "Jaipur, Rajasthan",
      issue: "Screen flickering",
      date: "2025-11-08",
      wayOfReaching: "Email",
      video: "https://example.com/video2.mp4",
      rackNo: "RACK-06",
      status: "Not Approved",
    },
  ]);

  // ✅ Remove product when "Parcel" clicked
  const handleParcel = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  // Filtered data based on search
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  // Table Columns
  const columns = [
    { name: "Order ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Address", selector: (row) => row.address },
    { name: "Issue", selector: (row) => row.issue },
    { name: "Date", selector: (row) => row.date },
    { name: "Way of Reaching", selector: (row) => row.wayOfReaching },
    { name: "Rack No", selector: (row) => row.rackNo },
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
        <span className="px-2.5 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleParcel(row.id)}
          className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-sm transition-all"
        >
          Parcel
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
          📦 Not Approved Products
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

export default NotApproveProducts;
