import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';

export function Learn() {
  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <Navbar />
        <div
          style={{
            backgroundImage: `url("https://thumbs.dreamstime.com/b/ai-generated-laptop-screen-displaying-stock-market-charts-hand-holding-stylus-image-features-detailed-graphs-346279570.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '40px',
          }}
        >
          <Container className="text-white text-center px-4">
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 'bold',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Smarter Investment <br /> Management with <br /> InvestTrack
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                marginTop: '30px',
                lineHeight: '1.6',
              }}
            >
              InvestTrack simplifies investment management by integrating with
              multiple brokerage accounts. Execute trades with one click and gain
              AI-powered insights for informed decisions. View your detailed portfolio and
              leverage our proprietary ML model for enhanced data analysis.
            </p>
            <Button
              variant="light"
              className="mt-4"
              style={{
                padding: '10px 25px',
                fontSize: '1.2rem',
                border: 'none',
                color: 'black',
                fontWeight: '500',
              }}
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </Button>
          </Container>
        </div>

        {/* Additional Content */}
        <div style={{ backgroundColor: 'white', color: 'black', padding: '40px 0' }}>
          <Container>
            <h2 className="text-center mb-4">Additional Content</h2>
            <p className="text-center mb-5">
              Here is some more content that will make the page scrollable.
            </p>

            {/* Left-Right Split Section */}
            <Row className="g-4 align-items-center">
              {/* Left Half */}
              <Col xs={12} md={6}>
                <div
                  style={{
                    backgroundImage: `url("https://ddnews.gov.in/wp-content/uploads/2024/12/GettyImages-1848933453.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '300px',
                    borderRadius: '10px',
                  }}
                />
              </Col>

              {/* Right Half */}
              <Col xs={12} md={6}>
                <h1 style={{ fontWeight: 'bold', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                  Key Benefits of InvestTrack
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginTop: '20px' }}>
                  InvestTrack offers a range of features designed to enhance your investment
                  experience. From seamless integration with brokerage accounts to an AI assistant
                  that provides personalized insights, our platform is built for efficiency and
                  effectiveness.
                </p>

                {/* Stats */}
                <Row className="mt-4">
                  <Col xs={6} className="mb-4">
                    <h2 style={{ fontWeight: 'bold' }}>100%</h2>
                    <p style={{ fontSize: '1rem' }}>Users can connect multiple accounts effortlessly.</p>
                  </Col>
                  <Col xs={6} className="mb-4">
                    <h2 style={{ fontWeight: 'bold' }}>1000 orders</h2>
                    <p style={{ fontSize: '1rem' }}>Experience one-click order execution for hassle-free trading.</p>
                  </Col>
                  <Col xs={6} className="mb-4">
                    <h2 style={{ fontWeight: 'bold' }}>24 hours</h2>
                    <p style={{ fontSize: '1rem' }}>Our AI assistant is available 24/7 to assist you.</p>
                  </Col>
                  <Col xs={6} className="mb-4">
                    <h2 style={{ fontWeight: 'bold' }}>100 accounts</h2>
                    <p style={{ fontSize: '1rem' }}>Easily manage up to 100 brokerage accounts in one place.</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
