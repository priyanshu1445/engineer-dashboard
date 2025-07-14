// src/components/common/modal/EstimateSentModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EstimateSentModal = ({ show, onHide, customerName, deviceName, cost, time }) => {
  const message = `Hello ${customerName},\nWe've diagnosed your ${deviceName}.\n🛠 Estimated Repair Cost: ₹${cost}\n⏱ Estimated Time: ${time}\nPlease approve to begin the repair.\n✅ Approve | ❌ Reject`;

  const handleSendWhatsApp = () => {
    toast.success('Estimate sent to customer via WhatsApp!');
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
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="success" onClick={handleSendWhatsApp}>
          Send WhatsApp Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EstimateSentModal;
