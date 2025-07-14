import React, { useState } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ScanResultModal = ({ show, onHide, orderId, device, status }) => {
  const [assigned, setAssigned] = useState(status !== 'Awaiting Customer Approval');

  const handleAssign = () => {
    toast.success('Order assigned to you!');
    setAssigned(true);
  };

  const handleGoToWorkflow = () => {
    alert(`Navigating to Repair Workflow for ${orderId}`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Scan Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Device:</strong> {device}</p>
        <p><strong>Status:</strong>{' '}
          <Badge bg={
            status === 'Awaiting Customer Approval' ? 'warning' :
            status === 'In Repair' ? 'info' :
            status === 'QC Pending' ? 'secondary' : 'light'
          }>
            {status}
          </Badge>
        </p>

        {!assigned && (
          <div className="mt-3">
            <Button variant="success" onClick={handleAssign}>
              Assign to Me
            </Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleGoToWorkflow} disabled={!assigned}>
          Go to Repair Workflow
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScanResultModal;
