import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Footer } from '../components/footer';
import axios from 'axios';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);

      if (res.data.success) {
        alert(res.data.message || "Message sent successfully!");
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        alert(res.data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Container fluid className="py-5 px-3" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} className="bg-white p-4 p-md-5 rounded shadow">
            <h2 className="text-center mb-3" style={{ fontSize: '2rem' }}>Contact Us</h2>
            <p className="text-center text-muted mb-4">
              We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
