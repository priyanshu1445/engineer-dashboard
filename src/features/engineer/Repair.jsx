// src/pages/Repair/Repair.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import EstimateSentModal from '../../components/common/modal/EstimateSentModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Repair = () => {
  const [step, setStep] = useState(1);
  const [showEstimateModal, setShowEstimateModal] = useState(false);

  const [formData, setFormData] = useState({
    summary: '',
    parts: '',
    notes: '',
    cost: '',
    time: '',
    comments: '',
    media: null,
    beforeRepair: null,
    afterRepair: null,
    qcMedia: null,
    approved: false,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSendEstimate = () => {
    if (!formData.cost || !formData.time) {
      toast.error('Please fill estimated cost and time.');
      return;
    }
    setShowEstimateModal(true);
    setStep(3); // move to waiting state
  };

  const handleApproval = () => {
    setFormData({ ...formData, approved: true });
    toast.success('Customer approved the estimate!');
    setStep(4); // move to repair step
  };

  const handleReject = () => {
    toast.error('Customer rejected the estimate.');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card body>
            <h5>🔍 Diagnose Issue</h5>
            <Form.Group className="mb-3">
              <Form.Label>Problem Summary</Form.Label>
              <Form.Control as="textarea" name="summary" rows={2} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Required Parts (optional)</Form.Label>
              <Form.Control name="parts" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control name="notes" onChange={handleInputChange} />
            </Form.Group>
            <Button onClick={() => setStep(2)}>Next</Button>
          </Card>
        );

      case 2:
        return (
          <Card body>
            <h5>📄 Prepare Estimate</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Estimated Cost (INR)</Form.Label>
                <Form.Control name="cost" type="number" onChange={handleInputChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Estimated Time</Form.Label>
                <Form.Control name="time" onChange={handleInputChange} />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Comments (optional)</Form.Label>
              <Form.Control name="comments" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Diagnostic Photo/Video</Form.Label>
              <Form.Control type="file" name="media" onChange={handleInputChange} />
            </Form.Group>
            <Button onClick={handleSendEstimate}>Send Estimate for Approval</Button>
          </Card>
        );

      case 3:
        return (
          <Card body>
            <h5>⏳ Awaiting Customer Approval</h5>
            <p>Status: Waiting...</p>
            <div className="d-flex gap-2">
              <Button variant="success" onClick={handleApproval}>✅ Approve</Button>
              <Button variant="danger" onClick={handleReject}>❌ Reject</Button>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card body>
            <h5>🛠️ Repair In Progress</h5>
            <Form.Group className="mb-3">
              <Form.Label>Upload Before-Repair Media (Required)</Form.Label>
              <Form.Control type="file" name="beforeRepair" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload After-Repair Media (Optional)</Form.Label>
              <Form.Control type="file" name="afterRepair" onChange={handleInputChange} />
            </Form.Group>
            <Button onClick={() => setStep(5)}>Mark Repair Done</Button>
          </Card>
        );

      case 5:
        return (
          <Card body>
            <h5>🔍 QC & Completion</h5>
            <Form.Group className="mb-3">
              <Form.Label>Upload QC Video (Required)</Form.Label>
              <Form.Control type="file" name="qcMedia" onChange={handleInputChange} />
            </Form.Group>
            <Button variant="success" onClick={() => toast.success('Marked as ready for dispatch!')}>
              ✅ Mark as Ready for Dispatch
            </Button>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">🛠️ Repair Workflow</h4>
      {renderStep()}

      <EstimateSentModal
        show={showEstimateModal}
        onHide={() => setShowEstimateModal(false)}
        customerName="Rahul"
        deviceName="iPhone 11"
        cost={formData.cost}
        time={formData.time}
      />

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Repair;
