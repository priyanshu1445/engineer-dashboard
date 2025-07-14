import React, { useState } from 'react';
import { InputGroup, Form, Button, Badge } from 'react-bootstrap';
import { ScanLine, Search, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import ScanResultModal from '../../components/common/modal/ScanResultModal';

const ScanOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy order data
  const orders = [
    {
      orderId: 'ORD-1234',
      device: 'Samsung Galaxy S21',
      status: 'Awaiting Customer Approval',
    },
    {
      orderId: 'ORD-2345',
      device: 'iPhone 13 Pro',
      status: 'In Repair',
    },
    {
      orderId: 'ORD-3456',
      device: 'Dell XPS 15',
      status: 'QC Pending',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Awaiting Customer Approval':
        return <Badge bg="warning" text="dark">Awaiting Approval</Badge>;
      case 'In Repair':
        return <Badge bg="info">In Repair</Badge>;
      case 'QC Pending':
        return <Badge bg="secondary">QC Pending</Badge>;
      case 'Completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  const handleScan = () => {
    const matched = orders.find((o) => o.orderId === orderId.trim());

    if (!matched) {
      toast.error('Order ID not found!');
      return;
    }

    setSelectedOrder(matched);
    setShowModal(true);
    toast.success(`Loaded ${matched.orderId}`);
  };

  const handleQuickView = (row) => {
    setOrderId(row.orderId);
    setSelectedOrder(row);
    setShowModal(true);
    toast.info(`Opening ${row.orderId}`);
  };

  const columns = [
    {
      name: 'Order ID',
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: 'Device',
      selector: (row) => row.device,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => getStatusBadge(row.status),
    },
    {
      name: 'Action',
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleQuickView(row)}
        >
          <Eye size={14} className="me-1" />
          View
        </Button>
      ),
    },
  ];

  // ✅ Added customStyles for padding
  const customStyles = {
   rows: { style: { minHeight: '60px' } },
    cells: {
      style: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f1f3f5',
        fontWeight: 'bold',
        fontSize: '14px',
        paddingTop: '14px',
        paddingBottom: '14px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
  };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="fw-bold d-flex align-items-center gap-2">
          <ScanLine size={20} /> Scan or Enter Order
        </h4>
      </div>

      {/* Input Field */}
 <div className="d-flex align-items-center gap-2 mb-3" style={{ maxWidth: '600px' }}>
  <InputGroup className="flex-grow-1">
    <InputGroup.Text><Search size={16} /></InputGroup.Text>
    <Form.Control
      placeholder="Enter or scan Order ID"
      value={orderId}
      onChange={(e) => setOrderId(e.target.value)}
    />
  </InputGroup>
  <Button variant="primary" onClick={handleScan} className="flex-shrink-0">
    Scan Now
  </Button>
</div>


      {/* Data Table */}
      <DataTable
        title="Recent Orders"
        columns={columns}
        data={orders}
        customStyles={customStyles}
        pagination
        highlightOnHover
        responsive
        dense
      />

      {/* Modal */}
      {selectedOrder && (
        <ScanResultModal
          show={showModal}
          onHide={() => setShowModal(false)}
          orderId={selectedOrder.orderId}
          device={selectedOrder.device}
          status={selectedOrder.status}
        />
      )}
    </div>
  );
};

export default ScanOrder;
