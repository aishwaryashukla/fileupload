import React, {useState} from 'react'
import { Container, Row, Col, ProgressBar, Button, Form, Table, Alert, Nav } from "react-bootstrap";

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [backendErrors, setBackendErrors] = useState("");
  const [analytics, setAnalytics] = useState([]);

  // Supported file types
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "text/plain",
    "application/pdf",
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ];

  // Handle file upload with validation
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(null);
    setErrors("");

    if (uploadedFile) {
      // File size validation (1MB = 1,048,576 bytes)
      if (uploadedFile.size > 1048576) {
        setErrors("File size exceeds 1MB. Please upload a smaller file.");
      }
      // File type validation
      else if (!allowedFileTypes.includes(uploadedFile.type)) {
        setErrors(
          "Invalid file type. Only JPEG, PNG, Text, PDF, and Excel files are allowed."
        );
      } else {
        setFile(uploadedFile);
      }
    }
  };

  // Simulate backend processing
  const processFile = () => {
    setBackendErrors("");
    if (!file) {
      setBackendErrors("No file uploaded. Please upload a valid file.");
      return false;
    }

    // Simulating backend response
    if (file.name.includes("error")) {
      setBackendErrors("The file contains invalid data. Please upload a valid file.");
      return false;
    }

    // Generate mock analytics data
    setAnalytics([
      { id: 1, metric: "File Name", value: file.name },
      { id: 2, metric: "File Size", value: `${(file.size / 1024).toFixed(2)} KB` },
      { id: 3, metric: "File Type", value: file.type },
    ]);
    return true;
  };

  // Handle navigation to steps
  const goToStep = (targetStep) => {
    if (targetStep === 1 || (targetStep === 2 && file) || (targetStep === 3 && analytics.length > 0)) {
      setStep(targetStep);
    }
  };

  // Handle Next button
  const handleNext = () => {
    if (step === 1 && !file) {
      setErrors("Please upload a valid file before proceeding.");
      return;
    }

    if (step === 2) {
      const success = processFile();
      if (!success) return;
    }

    setStep((prevStep) => prevStep + 1);
  };

  // Handle Previous button
  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center">File Analytics Dashboard</h3><br/>

          {/* Step Navigation */}
          <Nav variant="pills" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link
                active={step === 1}
                onClick={() => goToStep(1)}
                style={{ cursor: "pointer" }}
              >
                Step 1: Upload File
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={step === 2}
                onClick={() => goToStep(2)}
                disabled={!file}
                style={{ cursor: file ? "pointer" : "not-allowed" }}
              >
                Step 2: Process File
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={step === 3}
                onClick={() => goToStep(3)}
                disabled={analytics.length === 0}
                style={{
                  cursor: analytics.length > 0 ? "pointer" : "not-allowed",
                }}
              >
                Step 3: View Analytics
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <ProgressBar now={(step / 3) * 100} className="mb-4" />
        </Col>
      </Row>

      {/* Step Content */}
      {step === 1 && (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4>Step 1: Upload File</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Upload your file (Max size: 1MB)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
              {errors && <Alert variant="danger">{errors}</Alert>}
            </Form>
          </Col>
        </Row>
      )}

      {step === 2 && (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4>Step 2: Process File</h4>
            <p>Simulating backend validation and processing...</p>
            {backendErrors ? (
              <Alert variant="danger">{backendErrors}</Alert>
            ) : (
              <Alert variant="success">File processed successfully. Click next to view analytics.</Alert>
            )}
          </Col>
        </Row>
      )}

      {step === 3 && (
        <Row>
          <Col>
            <h4>Step 3: File Analytics</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.metric}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* Navigation Buttons */}
      <Row className="mt-4">
        <Col className="d-flex justify-content-between">
          <Button
            variant="secondary"
            disabled={step === 1}
            onClick={handlePrev}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={step === 3}
          >
            {step === 2 && backendErrors ? "Retry" : "Next"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};


export default Dashboard
