import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, NavLink } from 'react-router-dom';
import logout from './logout';

// Function to get navbar style based on theme
const getNavbarStyle = (theme) => {
  switch (theme) {
    case 'dark':
      return { backgroundColor: '#121212', color: '#ffffff' };  // Dark theme
    case 'ocean':
      return { backgroundColor: '#0e7490', color: '#ffffff' };  // Ocean theme
    case 'sunset':
      return { backgroundColor: '#ff7043', color: '#000000' };  // Sunset theme
    default:  // Light theme
      return { backgroundColor: '#f8f9fa', color: '#000000' };  // Light theme
  }
};

function SidebarWithNavbar() {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');  // Initialize theme from localStorage
  const navigate = useNavigate();

  const toggleSidebar = () => setShow(!show);

  const username = localStorage.getItem('username')
  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);  // Save the selected theme in localStorage
  };

  useEffect(() => {
    // Apply the theme to the body element (this applies to the whole page except the navbar)
    document.body.className = '';  // Clear previous theme class
    document.body.classList.add(`theme-${theme}`);  // Add the selected theme class
  }, [theme]);

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          ...getNavbarStyle(theme),  // Apply the navbar style based on the selected theme
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1050,
          padding: '0.3rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop : '30px'
        }}
      >
        <Container fluid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          <div
            onClick={handleProfileClick}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #ccc',
              cursor: 'pointer',
              flexShrink: 0,
              userSelect: 'none',
            }}
            title="Go to Profile"
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {username ? username.charAt(0).toUpperCase() : ''}
            </span>
          </div>

          <Navbar.Text
            className="d-none d-sm-block"
            style={{
              color: theme === 'dark' ? 'white' : 'black',
              marginLeft: '0.5rem',
              fontWeight: '600',
              userSelect: 'none',
            }}
          >
            {username || 'Guest'}
          </Navbar.Text>

          <h1
            style={{
              color: theme === 'dark' ? 'white' : 'black',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1.25rem',
              margin: 0,
              userSelect: 'none',
            }}
            className="mx-auto text-truncate"
            title="INVEST-TRACK"
          >
            INVEST-TRACK
          </h1>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" size="sm">
                Theme
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleThemeChange('light')}>Light</Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange('dark')}>Dark</Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange('ocean')}>Ocean</Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange('sunset')}>Sunset</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant={theme === 'dark' ? "outline-light" : "outline-dark"}
              onClick={toggleSidebar}
              style={{
                border: '1px solid #ccc',
                padding: '0.4rem 0.7rem',
                marginLeft: '10px',
                fontSize: '1.5rem',
                lineHeight: 1,
                userSelect: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle Sidebar"
            >
              &#9776;
            </Button>
          </div>
        </Container>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={toggleSidebar}
        placement="end"
        style={{ width: '75vw', maxWidth: '300px' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: 'bold', color: 'black', marginTop : '70px' }}>Features</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ fontSize: '1.1rem' }}>
            <Nav.Link
              as={NavLink}
              to="/Dashboard"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/addnewbroker"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              Add New Broker
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/AI-assistant"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              AI Assistance
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/Contact"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/news"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              News
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/chart"
              onClick={toggleSidebar}
              style={{ color: '#0d6efd', padding: '0.5rem 0' }}
            >
              View Chart
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={() => {
                toggleSidebar();
                handleLogout();
              }}
              style={{ color: 'red', fontWeight: 'bold', padding: '0.5rem 0' }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidebarWithNavbar;
