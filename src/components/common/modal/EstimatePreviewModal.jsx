import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EstimatePreviewModal = ({
  show,
  onHide,
  customerName,
  deviceName,
  cost,
  time,
  onStatusUpdate,
}) => {
  const message = `Hello ${customerName},\nWe've diagnosed your ${deviceName}.\n🛠 Estimated Repair Cost: ₹${cost}\n⏱ Estimated Time: ${time}\nPlease approve to begin the repair.\n✅ Approve | ❌ Reject`;

  const handleApprove = () => {
    toast.success('Customer approved the estimate');
    onStatusUpdate('In Repair');
    onHide();
  };

  const handleReject = () => {
    toast.error('Customer rejected the estimate');
    onStatusUpdate('Rejected');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Estimate Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{message}</pre>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between flex-wrap">
        <div className="d-flex gap-2">
          <Button variant="success" onClick={handleApprove}>
            ✅ Approve
          </Button>
          <Button variant="danger" onClick={handleReject}>
            ❌ Reject
          </Button>
        </div>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EstimatePreviewModal;
