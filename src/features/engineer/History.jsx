import React, { useState } from 'react';
import { Badge, Button, InputGroup, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, History as HistoryIcon, Search } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryDetailModal from '../../components/common/modal/HistoryDetailModal';

const History = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      id: 1,
      orderId: 'ORD-2201',
      device: 'Samsung Galaxy S21',
      status: 'Completed',
      estimate: '₹2,500',
      date: '2024-06-20',
    },
    {
      id: 2,
      orderId: 'ORD-2202',
      device: 'iPhone 13 Pro',
      status: 'Rejected',
      estimate: '₹3,200',
      date: '2024-06-18',
    },
    {
      id: 3,
      orderId: 'ORD-2203',
      device: 'Dell XPS 15',
      status: 'Completed',
      estimate: '₹1,800',
      date: '2024-06-10',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge bg="success">Completed</Badge>;
      case 'Rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleView = (row) => {
    setSelectedOrder(row);
    setShowModal(true);
  };

  const columns = [
    { name: 'Order ID', selector: (row) => row.orderId, sortable: true },
    { name: 'Device', selector: (row) => row.device, sortable: true },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => getStatusBadge(row.status),
      sortable: true,
    },
    { name: 'Estimate', selector: (row) => row.estimate },
    { name: 'Completion Date', selector: (row) => row.date },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleView(row)}
        >
          <Eye size={16} className="me-1" />
          View
        </Button>
      ),
    },
  ];

  const filteredData = data.filter((row) =>
    row.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
    row.device.toLowerCase().includes(searchText.toLowerCase())
  );

  const customStyles = {
    rows: { style: { minHeight: '60px' } },
    headCells: {
      style: {
        backgroundColor: '#f1f3f5',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 className="fw-bold d-flex align-items-center gap-2">
          <HistoryIcon size={20} /> History
        </h4>
      </div>

      <div className="mb-3" style={{ maxWidth: '300px' }}>
        <InputGroup size="sm">
          <InputGroup.Text><Search size={14} /></InputGroup.Text>
          <Form.Control
            placeholder="Search by Order ID / Device"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
        responsive
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />

      {/* Modal */}
      <HistoryDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default History;
