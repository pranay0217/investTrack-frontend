import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer';

const brokers = [
  {
    name: "Angel One",
    description: "Trade with India's leading stock broker",
    logo: "https://asset.brandfetch.io/idDA95rr8l/idok3mM_r-.jpeg",
    connectable: true,
  },
  {
    name: "Zerodha",
    description: "Invest in stocks and mutual funds",
    logo: "https://zerodha.com/static/images/logo.svg",
    connectable: true,
  },
  {
    name: "Groww",
    description: "Simple investing in stocks and mutual funds",
    logo: "https://groww.in/favicon.ico",
    connectable: false,
  },
  {
    name: "ICICIdirect",
    description: "Full-service broker by ICICI Bank",
    logo: "https://www.icicidirect.com/idirectcontent/images/logo.svg",
    connectable: false,
  },
];

const username = localStorage.getItem("username") || "";

export const Addnewbroker = () => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [formData, setFormData] = useState({
    clientcode: '',
    pin: '',
    totp: '',
  });
  const [connectedBrokers, setConnectedBrokers] = useState({});
  const [pinVisible, setPinVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedConnections = JSON.parse(localStorage.getItem("connected_brokers")) || {};
    setConnectedBrokers(storedConnections);
  }, []);

  const persistConnections = (newConnections) => {
    localStorage.setItem("connected_brokers", JSON.stringify(newConnections));
  };

  const handleConnectClick = (broker) => {
    if (broker.name === "Angel One") {
      setSelectedBroker(broker);
    } else if (broker.name === "Zerodha") {
      const api_key = "u0hnb2qmwtn6aydg";
      const loginUrl = `https://kite.zerodha.com/connect/login?v=3&api_key=${api_key}`;
      sessionStorage.setItem("zerodha_incomplete_session", true);
      window.location.href = loginUrl;
    } else {
      alert(`${broker.name} integration is coming soon!`);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientcode || !formData.pin || !formData.totp) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        ...formData,
        state: 'web',
        username: username
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/broker/angelonelogin`, payload);

      if (res.data.success) {
        const token = res.data.token;
        const clientcode = formData.clientcode;

        localStorage.setItem("angel_token", token);
        localStorage.setItem("angel_clientcode", clientcode);

        const updatedConnections = {
          ...connectedBrokers,
          [selectedBroker.name]: {
            connectedAt: Date.now(),
            portfolioFetched: false,
          },
        };
        setConnectedBrokers(updatedConnections);
        persistConnections(updatedConnections);

        alert('Login successful! Redirecting to dashboard...');
        navigate('/Dashboard');
      } else {
        alert('Login failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div
        className="min-vh-100 d-flex flex-column"
        style={{
          background: 'linear-gradient(to right, rgb(84, 110, 150), rgb(99, 129, 163))',
          backgroundSize: 'cover',
        }}
      >
        <Navbar2 />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-column p-3">
          <div className="container">
            <h2 className="mb-4 text-center text-white">Connect Your Broker</h2>
            <div className="row justify-content-center">
              {brokers.map((broker, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
                >
                  <div className="card shadow-sm w-100 text-center">
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="mx-auto mt-3"
                      style={{
                        maxWidth: '100px',
                        maxHeight: '60px',
                        objectFit: 'contain',
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5>{broker.name}</h5>
                      <p className="flex-grow-1">{broker.description}</p>
                      {broker.connectable ? (
                        <button
                          className="btn btn-primary mt-auto"
                          onClick={() => handleConnectClick(broker)}
                          disabled={connectedBrokers[broker.name]?.portfolioFetched}
                        >
                          {connectedBrokers[broker.name]?.portfolioFetched
                            ? 'Connected'
                            : 'Connect'}
                        </button>
                      ) : (
                        <button className="btn btn-secondary mt-auto" disabled>
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedBroker?.name === 'Angel One' && (
              <div className="mt-5 px-3">
                <h4 className="text-center text-white mb-4">Login to Angel One</h4>
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border rounded bg-light mx-auto shadow"
                  style={{ maxWidth: '500px', width: '100%' }}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Client Code"
                      name="clientcode"
                      className="form-control"
                      value={formData.clientcode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <input
                      type={pinVisible ? 'text' : 'password'}
                      placeholder="PIN or PASSWORD"
                      name="pin"
                      className="form-control"
                      value={formData.pin}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y"
                      style={{ border: 'none', background: 'none' }}
                      onClick={() => setPinVisible(!pinVisible)}
                      aria-label={pinVisible ? 'Hide PIN' : 'Show PIN'}
                    >
                      <i className={`fas ${pinVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </button>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter TOTP"
                      name="totp"
                      className="form-control"
                      value={formData.totp}
                      onChange={handleInputChange}
                      required
                    />
                    <small className="form-text text-muted mt-1">
                      Don't know how to generate TOTP?{' '}
                      <a
                        href="https://support.google.com/accounts/answer/1066447?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here
                      </a>
                    </small>
                  </div>
                  <button className="btn btn-success w-100" type="submit">
                    Login
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
