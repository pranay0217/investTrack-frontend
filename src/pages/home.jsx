import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/footer';

export const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLearn = () => {
    navigate('/learn');
  };

  sessionStorage.clear();
  localStorage.clear();

  return (
    <>
      <div className="container-fluid px-3" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <Navbar />

        <div className="row d-flex flex-column flex-md-row align-items-center py-5">
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0" style={{marginTop: '100px'}}>
            <img
                src="https://www.moneyseth.com/media/blog_headers/top_website_for_share_market.webp"
                alt="Home Illustration"
                className="img-fluid w-100 rounded shadow"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />

          </div>

          {/* Text Section */}
          <div className="col-md-6 text-white px-2">
            <h1 className="fw-bold mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.3' }}>
              Unlock Your <br /> Investment Potential <br /> with <span style={{ color: '#00d8ff' }}>InvestTrack</span>
            </h1>

            <p style={{ fontSize: '1.1rem' }} className="mb-4">
              InvestTrack is your all-in-one platform for managing investments. Seamlessly connect your brokerage accounts,
              execute trades with one click, and leverage AI-powered insights to make informed decisions. Start optimizing
              your portfolio today and achieve your financial goals with InvestTrack.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                className="btn btn-light"
                onClick={handleLearn}
                style={{
                  padding: '10px 25px',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  borderRadius: '8px',
                }}
              >
                Learn
              </button>
              <button
                className="btn btn-outline-light"
                onClick={handleSignUp}
                style={{
                  padding: '10px 25px',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  borderRadius: '8px',
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
