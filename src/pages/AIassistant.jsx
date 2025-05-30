import React, { useState } from 'react';
import Navbar2 from '../components/Navbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { motion } from 'framer-motion';
import { FaRobot, FaLightbulb } from 'react-icons/fa';
import { Footer } from '../components/footer';

export const AIassistant = () => {
  const navigate = useNavigate();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [analysisData, setAnalysisData] = useState('');
  const [suggestionData, setSuggestionData] = useState('');

  const fetchAIData = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        alert("Login first to analyse your portfolio!");
        console.error("Client code not found in localStorage");
        return;
      }
      const API_BASE_URL = 'http://localhost:8000' || import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API_BASE_URL}/analyze`, {
        params: { username }
      });

      if (res.data.success) {
        setAnalysisData(res.data.data.advisory);
        setSuggestionData(res.data.data.suggestion);
      } else {
        console.error("API response was not successful:", res.data.message);
      }
    } catch (error) {
      console.error('Error fetching AI data:', error);
    }
  };

  const toggleAnalysis = () => {
    setShowAnalysis(!showAnalysis);
    if (!showAnalysis) fetchAIData();
  };

  const openSuggestion = () => {
    setShowSuggestion(true);
    fetchAIData();
  };

  const closeSuggestion = () => setShowSuggestion(false);

  const Spinner = () => (
    <motion.div
      style={{
        width: 40,
        height: 40,
        border: "4px solid rgba(0, 255, 204, 0.2)",
        borderTop: "4px solid #00ffcc",
        borderRadius: "50%",
        margin: "auto"
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );

  const BouncingDots = () => (
    <div className="d-flex justify-content-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 10,
            height: 10,
            margin: '0 5px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'inline-block',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  // Styles for the buttons container and individual buttons
  const buttonStyle = {
    backgroundColor: 'rgba(0, 255, 204, 0.1)', // subtle teal tint
    border: '2px solid #00ffcc',
    borderRadius: '15px',
    padding: '20px 30px',
    width: '130px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#00ffcc',
    boxShadow: '0 0 8px #00ffcc',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  };

  const buttonHoverStyle = {
    backgroundColor: 'rgba(0, 255, 204, 0.25)',
    boxShadow: '0 0 15px 3px #00ffcc',
    transform: 'scale(1.05)',
  };

  const [analyzeHover, setAnalyzeHover] = useState(false);
  const [suggestHover, setSuggestHover] = useState(false);

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar2 />
        <div className="container-fluid" style={{ paddingTop: "100px", paddingBottom: "40px" }}>
          <div className="row align-items-center">
            {/* Left Half */}
            <div className="col-md-6">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/65fd9dc3088caa9883857ceb/Future-financial-technology-controlled-by-AI-robot-using-machine-learning-and/960x0.jpg?format=jpg&width=960"
                alt="Home Illustration"
                className="img-fluid rounded"
                style={{ maxHeight: "80vh", objectFit: "cover", marginTop: "70px" }}
              />
            </div>

            {/* Right Half */}
            <div className="col-md-6 text-white d-flex flex-column align-items-center" style={{ marginTop: "40px" }}>
              <h1 style={{ fontSize: "3.5rem", marginBottom: "30px", textAlign: "center" }}>
                AI Powered <br /> Full Account Analysis <br /> and Suggestions
              </h1>
              <p style={{ fontSize: "1.3rem", marginBottom: "40px", maxWidth: "500px", textAlign: "center" }}>
                InvestTrack is your all-in-one platform for managing investments. Seamlessly connect your brokerage accounts, execute trades with one click, and leverage AI-powered insights to make informed decisions.
              </p>

              <div className="d-flex gap-5">
                {/* Analyze Button */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleAnalysis}
                  onKeyDown={(e) => e.key === 'Enter' && toggleAnalysis()}
                  onMouseEnter={() => setAnalyzeHover(true)}
                  onMouseLeave={() => setAnalyzeHover(false)}
                  style={{ ...buttonStyle, ...(analyzeHover ? buttonHoverStyle : {}) }}
                >
                  <FaRobot size={60} />
                  <div style={{ marginTop: '12px', fontSize: '1.3rem', fontWeight: '600' }}>Analyze</div>
                </div>

                {/* Suggest Button */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openSuggestion}
                  onKeyDown={(e) => e.key === 'Enter' && openSuggestion()}
                  onMouseEnter={() => setSuggestHover(true)}
                  onMouseLeave={() => setSuggestHover(false)}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#suggestionPanel"
                  style={{ ...buttonStyle, ...(suggestHover ? buttonHoverStyle : {}) }}
                >
                  <FaLightbulb size={60} />
                  <div style={{ marginTop: '12px', fontSize: '1.3rem', fontWeight: '600' }}>Suggest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Analysis Panel with spinner */}
          {showAnalysis && (
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="analysisPanel"
            >
              <div className="accordion" id="analysisAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      Portfolio Analysis
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#analysisAccordion">
                    <div className="accordion-body text-dark">
                      {analysisData ? analysisData : <Spinner />}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Suggestion Panel with bouncing dots */}
          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabIndex="-1"
            id="suggestionPanel"
            aria-labelledby="suggestionLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="suggestionLabel" style={{ marginTop: '70px' }}>AI Suggestions</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={closeSuggestion}
              ></button>
            </div>
            <div className="offcanvas-body">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {suggestionData ? (
                  suggestionData.split('\n').map((line, i) => <p key={i}>{line}</p>)
                ) : (
                  <BouncingDots />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
