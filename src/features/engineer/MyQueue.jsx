import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Eye, Wrench, Search, Filter, Box } from 'lucide-react';
import {
  Badge,
  Button,
  Dropdown,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import EstimatePreviewModal from '../../components/common/modal/EstimatePreviewModal';

const MyQueue = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      orderId: 'ORD-2311',
      device: 'iPhone 11',
      status: 'Awaiting Customer',
      estimate: '₹1,200',
      lastUpdated: '2h ago',
      customerName: 'Rahul',
      estimateTime: '2 hours',
    },
    {
      id: 2,
      orderId: 'ORD-2291',
      device: 'Dell Vostro',
      status: 'In Repair',
      estimate: '₹3,000',
      lastUpdated: '5 min ago',
      customerName: 'Priya',
      estimateTime: '3.5 hours',
    },
    {
      id: 3,
      orderId: 'ORD-2299',
      device: 'Redmi Note 10',
      status: 'QC Pending',
      estimate: '₹1,800',
      lastUpdated: '25 min ago',
      customerName: 'Aman',
      estimateTime: '1 hour',
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Awaiting Customer':
        return <Badge bg="warning" text="dark">Awaiting Approval</Badge>;
      case 'In Repair':
        return <Badge bg="info">In Repair</Badge>;
      case 'QC Pending':
        return <Badge bg="secondary">QC Pending</Badge>;
      case 'Completed':
        return <Badge bg="success">Completed</Badge>;
      case 'Rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  const handleView = (row) => {
    setModalData({
      ...row,
      cost: row.estimate.replace('₹', ''),
      time: row.estimateTime,
    });
    setShowModal(true);
  };

  const handleStatusUpdate = (newStatus) => {
    const updated = data.map((item) =>
      item.orderId === modalData.orderId
        ? { ...item, status: newStatus }
        : item
    );
    setData(updated);
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
    { name: 'Estimate', selector: (row) => row.estimate, sortable: true },
    { name: 'Last Updated', selector: (row) => row.lastUpdated, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => handleView(row)}>
            <Eye size={16} className="me-1" />
            View
          </Button>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => toast.success(`Repair started for ${row.orderId}`)}
          >
            <Wrench size={16} className="me-1" />
            Open
          </Button>
        </div>
      ),
    },
  ];

  const filteredData = data.filter((row) => {
    const matchSearch =
      row.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      row.device.toLowerCase().includes(searchText.toLowerCase());
    const matchFilter = filterStatus ? row.status === filterStatus : true;
    return matchSearch && matchFilter;
  });

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
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 className="fw-bold d-flex align-items-center gap-2">
          <Box size={20} /> My Queue
        </h4>
      </div>

      {/* Controls: Search, Filter, Export */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
          <InputGroup style={{ maxWidth: '280px' }} size="sm">
            <InputGroup.Text><Search size={14} /></InputGroup.Text>
            <Form.Control
              placeholder="Search Order ID / Device"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>

          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <Filter size={14} className="me-1" />
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterStatus('')}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus('Awaiting Customer')}>Awaiting Approval</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus('In Repair')}>In Repair</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus('QC Pending')}>QC Pending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          <CSVLink
            data={filteredData}
            filename="my-queue.csv"
            className="btn btn-outline-success btn-sm"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
        responsive
      />

      {/* Estimate Preview Modal */}
      {modalData && (
        <EstimatePreviewModal
          show={showModal}
          onHide={() => setShowModal(false)}
          customerName={modalData.customerName}
          deviceName={modalData.deviceName}
          cost={modalData.cost}
          time={modalData.time}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default MyQueue;
