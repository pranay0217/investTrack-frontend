import React, { useEffect, useState } from 'react';
import Navbar2 from '../components/Navbar2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from '../components/footer';

export const Profile = () => {
  const navigate = useNavigate();

  // State to store user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [clientId, setClientId] = useState('Not connected');
  const [isAngelConnected, setIsAngelConnected] = useState(false);
  const [isZerodhaConnected, setIsZerodhaConnected] = useState(false);

  // Fetch data from localStorage after component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedAngelClientId = localStorage.getItem('angel_clientcode');
    const storedZerodhaToken = localStorage.getItem('token');

    if (storedName && storedEmail) {
      setUserData({
        name: storedName,
        email: storedEmail,
      });
    }

    if (storedAngelClientId) {
      setClientId(storedAngelClientId);
      setIsAngelConnected(true);
    }

    if (storedZerodhaToken) {
      setIsZerodhaConnected(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <Navbar2 />
        <div className="container d-flex justify-content-center align-items-center" style={{ paddingTop: '100px' }}>
          <motion.div
            className="card text-dark shadow-lg"
            style={{ width: '100%', maxWidth: '500px', borderRadius: '20px' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">👤 Profile</h3>
              <h5 className="text-danger text-center"> (Always recommended to logout after use) </h5>
              <div className="mb-3">
                <strong>Name:</strong> {userData.name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userData.email}
              </div>
              <div className="mb-3">
                <strong>Angel One Client ID:</strong> {clientId}
              </div>
              <div className="mb-3">
                <strong>Angel One Status:</strong>{' '}
                <span className={`badge ${isAngelConnected ? 'bg-success' : 'bg-danger'}`}>
                  {isAngelConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <div className="mb-3">
                <strong>Zerodha Status:</strong>{' '}
                <span className={`badge ${isZerodhaConnected ? 'bg-success' : 'bg-danger'}`}>
                  {isZerodhaConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-outline-primary" disabled>
                  Edit Profile
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};
