import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { FaChartLine, FaLock, FaSearch, FaUserCog, FaRobot } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';

export const HowInvestTrackWorks = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const handleAccordionToggle = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          color: '#fff',
          padding: '80px 0 30px',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Navbar />
        <Container className="px-3 px-md-0">
          <Row className="text-center">
            <Col>
              <h2
                className="mb-4"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#fff', marginTop: '40px' }}
              >
                How Invest-Track Works
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#e0e0e0',
                }}
              >
                Discover how Invest-Track helps you make smarter investment decisions with AI-powered insights,
                portfolio management, and intuitive tools. Take control of your financial future with ease.
              </p>
            </Col>
          </Row>

          {/* Features Section */}
          <Row className="mt-5 text-center">
            {[{
              id: 1,
              icon: <FaChartLine size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />,
              title: 'Track Your Investments',
              desc: 'Stay on top of your investment portfolio with real-time data, market analysis, and personalized updates.',
              detail: 'With Invest-Track, you can easily monitor and manage your investments across various assets. Real-time data keeps you informed, and personalized notifications alert you to significant portfolio movements.'
            }, {
              id: 2,
              icon: <FaLock size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />,
              title: 'Secure & Reliable',
              desc: 'Invest-Track ensures the highest level of security for your data and portfolio, giving you peace of mind.',
              detail: 'Invest-Track uses end-to-end encryption and secure authentication to ensure your financial data remains private. We prioritize your privacy and ensure secure data storage.'
            }, {
              id: 3,
              icon: <FaSearch size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />,
              title: 'Smart Recommendations',
              desc: 'Get AI-based stock and mutual fund recommendations tailored to your risk appetite and investment goals.',
              detail: 'Our AI technology analyzes your portfolio and market trends to give you personalized recommendations on stocks and mutual funds, optimizing for risk and return.'
            }].map(({ id, icon, title, desc, detail }) => (
              <Col xs={12} md={4} key={id} className="mb-4">
                <Card className="shadow-lg border-0 h-100" style={{ background: '#1f1f2f', borderRadius: '15px' }}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    {icon}
                    <Card.Title className="mt-4 text-white text-center">{title}</Card.Title>
                    <Card.Text style={{ fontSize: '16px', color: '#e0e0e0', textAlign: 'center' }}>{desc}</Card.Text>
                    <Button
                      variant="outline-light"
                      className="mt-3 w-100"
                      style={{ borderRadius: '20px' }}
                      onClick={() => handleAccordionToggle(id)}
                    >
                      Learn More
                    </Button>
                    <Accordion activeKey={activeAccordion === id ? `${id}` : null} className="w-100 mt-3">
                      <Accordion.Item eventKey={`${id}`}>
                        <Accordion.Header>{title} - Details</Accordion.Header>
                        <Accordion.Body style={{ textAlign: 'left' }}>
                          {detail}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Key Features Section */}
          <Row className="mt-5 text-center">
            <Col>
              <h3 className="text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Key Features</h3>
              <p style={{ fontSize: '16px', color: '#e0e0e0' }}>
                Invest-Track empowers investors with features that take the guesswork out of investment decisions.
              </p>
            </Col>
          </Row>

          <Row className="mt-4">
            {[{
              icon: <FaUserCog size={50} style={{ color: '#00c6ff' }} />,
              title: 'Personalized Dashboard',
              desc: 'A user-friendly dashboard that offers personalized views of your portfolio, analytics, and more.'
            }, {
              icon: <FaRobot size={50} style={{ color: '#00c6ff' }} />,
              title: 'AI-Powered Insights',
              desc: 'Our AI technology provides actionable insights based on your investment history and market trends.'
            }, {
              icon: <FaLock size={50} style={{ color: '#00c6ff' }} />,
              title: 'Data Privacy & Security',
              desc: 'We prioritize the security of your data, ensuring all transactions and personal information remain secure.'
            }].map(({ icon, title, desc }, index) => (
              <Col xs={12} md={4} key={index} className="mb-4">
                <Card className="shadow-lg border-0 h-100" style={{ background: '#2c2c3e', borderRadius: '15px' }}>
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    {icon}
                    <Card.Title className="mt-4 text-white">{title}</Card.Title>
                    <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>{desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* CTA Section */}
          <Row className="mt-5 text-center">
            <Col>
              <h3 className="text-white" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                Ready to Get Started?
              </h3>
              <p style={{ fontSize: '16px', color: '#e0e0e0' }}>
                Join Invest-Track today to start optimizing your investment strategy and maximizing your financial growth.
              </p>
              <Button
                variant="light"
                size="lg"
                className="mt-4"
                href="/signup"
                style={{
                  background: '#00c6ff',
                  borderRadius: '30px',
                  fontSize: '18px',
                  padding: '15px 35px',
                  color: '#fff',
                  border: 'none'
                }}
              >
                Sign Up Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};
