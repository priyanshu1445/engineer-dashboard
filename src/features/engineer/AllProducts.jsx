import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const AllProducts = () => {
  const [search, setSearch] = useState("");

  // Sample data — can be replaced with API later
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      name: "Priyanshu Sharma",
      email: "priyanshu@example.com",
      address: "Udaipur, Rajasthan",
      issue: "Battery not working",
      date: "2025-11-11",
      wayOfReaching: "Call",
      video: "https://example.com/video.mp4",
      status: "Received",
    },
    {
      id: "ORD002",
      name: "Rahul Singh",
      email: "rahul@example.com",
      address: "Jaipur, Rajasthan",
      issue: "Screen flickering",
      date: "2025-11-09",
      wayOfReaching: "Email",
      video: "https://example.com/video2.mp4",
      status: "Parcel",
    },
    {
      id: "ORD003",
      name: "Lokesh Mehta",
      email: "lokesh@example.com",
      address: "Jodhpur, Rajasthan",
      issue: "Sound not working",
      date: "2025-11-07",
      wayOfReaching: "Website",
      video: "https://example.com/video3.mp4",
      status: "Received",
    },
  ]);

  // Assign function
  const handleAssign = (orderId) => {
    // Remove from AllProducts list
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);

    // Store in localStorage (to show later in "My Assigned Products" page)
    const assigned = JSON.parse(localStorage.getItem("assignedProducts")) || [];
    const assignedOrder = orders.find((order) => order.id === orderId);
    if (assignedOrder) {
      localStorage.setItem(
        "assignedProducts",
        JSON.stringify([...assigned, assignedOrder])
      );
    }

    alert(`✅ Product with Order ID ${orderId} has been assigned to an engineer.`);
  };

  // Filter logic
  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  // Columns for DataTable
  const columns = [
    { name: "Order ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
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
        <span
          className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
            row.status === "Parcel"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleAssign(row.id)}
          className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-sm"
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
          📋 All Products
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
            className="w-full sm:w-auto px-4 py-2.5 rounded text-sm bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-all shadow-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable
            columns={columns}
            data={filteredOrders}
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

export default AllProducts;
