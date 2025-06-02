import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';
import { useTheme } from '../context/themeContext';
import Form from 'react-bootstrap/Form';

function NavScrollExample() {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const { themeName, setThemeName } = useTheme();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        backgroundColor: 'transparent',
        marginTop: '30px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1030,
      }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center px-3 px-lg-5">
        {/* Logo + Brand container */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <Navbar.Brand
            style={{
              fontWeight: 'bold',
              fontSize: '24px',
              fontFamily: 'Roboto, sans-serif',
              margin: 0,
            }}
          >
            Invest Track
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{
              gap: '1rem',
              flexWrap: 'wrap',
              marginLeft: 0,
            }}
          >
            <Nav.Link onClick={() => navigate('/howinvesttrackworks')}>
              How InvestTrack Works
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/AIassistant')}>AI Assistant</Nav.Link>
            <Nav.Link onClick={() => navigate('/ContactUs')}>Contact Us</Nav.Link>
          </Nav>

          <div
            className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 gap-lg-3 ms-lg-3"
            style={{ minWidth: '140px' }}
          >
            <Form.Select
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              aria-label="Select theme"
              className="flex-grow-1"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="ocean">Ocean</option>
              <option value="sunset">Sunset</option>
            </Form.Select>

            <Button
              variant="outline-success"
              onClick={() => navigate('/login')}
              className="w-100 w-lg-auto"
            >
              Log In
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => navigate('/learn')}
              className="w-100 w-lg-auto"
              style={{ backgroundColor: 'lightblue' }}
            >
              Learn More
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
