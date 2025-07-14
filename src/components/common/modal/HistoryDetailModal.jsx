import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const HistoryDetailModal = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Device:</strong> {order.device}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Estimate:</strong> {order.estimate}</p>
        <p><strong>Completion Date:</strong> {order.date}</p>
        <p><strong>Notes:</strong> All steps were completed and verified.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HistoryDetailModal;
