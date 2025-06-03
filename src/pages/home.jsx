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

const features = [
  {
    title: "Connect Your Brokerage",
    description:
      "Effortlessly link all your brokerage accounts into one unified dashboard. No more juggling between platforms. With secure connections and instant synchronization, your entire investment landscape is available at your fingertips, updated in real-time for ultimate convenience.",
    image:
      "https://static.vecteezy.com/system/resources/previews/011/397/525/non_2x/crypto-trader-investor-broker-using-cellphone-and-laptop-for-cryptocurrency-financial-market-analysis-forex-trading-stock-market-and-economic-growth-chart-digital-assets-photo.jpg",
  },
  {
    title: "AI-Powered Insights",
    description:
      "Leverage the power of artificial intelligence to gain intelligent insights into your portfolio. Our AI analyzes past trends, detects risk patterns, suggests asset reallocation, and even flags potential opportunities—so you can make smarter, data-driven investment decisions.",
    image:
      "https://thumbs.dreamstime.com/b/cyborg-robot-d-render-robotic-process-automation-rpa-data-analysis-235041564.jpg",
  },
  {
    title: "Real-Time News Feed",
    description:
      "Stay ahead of the market with a personalized news feed curated specifically for your portfolio. Get breaking financial news, earnings updates, and market sentiment analysis that are directly relevant to the stocks and assets you hold—delivered in real-time.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "One-Click Trade Execution",
    description:
      "No more jumping through hoops to make a trade. Execute buy or sell orders directly from your dashboard with a single click. It’s secure, fast, and perfectly integrated with your connected brokerage accounts, making trading as simple as checking your email.",
    image:
      "https://media.istockphoto.com/id/1304733427/photo/financial-portfolio-and-assets-manager-analyzing-investment-statistics-and-indicators-on.jpg?s=612x612&w=0&k=20&c=wdn8Ik_sXRaLd6Vu-qL20ZD9RFyKxJz4kf3nT9AYbMg=",
  },
  {
    title: "Detailed Portfolio Analytics",
    description:
      "Dive deep into your investment performance with advanced analytics. Visualize your portfolio allocation, track profit/loss over time, understand diversification ratios, and generate exportable reports—all through beautiful, intuitive charts designed for clarity and action.",
    image:
      "https://media.istockphoto.com/id/1453953453/photo/strategy-of-diversified-investment.jpg?s=612x612&w=0&k=20&c=GdKGA5EuK0QfKm76ExjkK64iPZLuTUOyIDQlXs-ZRQM=",
  },
];

  return (
    <>
      <div className="container-fluid px-3" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <Navbar />

        <div className="row d-flex flex-column flex-md-row align-items-center py-5">
          {/* Header Section */}
          <div className="col-md-6 mb-4 mb-md-0" style={{ marginTop: '100px' }}>
            <img
              src="https://www.moneyseth.com/media/blog_headers/top_website_for_share_market.webp"
              alt="Home Illustration"
              className="img-fluid w-100 rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>

          <div className="col-md-6 text-white px-2">
            <h1 className="fw-bold mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.3' }}>
              Unlock Your <br /> Investment Potential <br /> with <span style={{ color: '#00d8ff' }}>InvestTrack</span>
            </h1>

            <p style={{ fontSize: '1.1rem' }} className="mb-4">
              InvestTrack is your all-in-one platform for managing investments. Seamlessly connect your brokerage accounts,
              execute trades with one click, and leverage AI-powered insights to make informed decisions.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <button className="btn btn-light" onClick={handleLearn} style={{ padding: '10px 25px', fontSize: '1.1rem', fontWeight: '500', borderRadius: '8px' }}>
                Learn
              </button>
              <button className="btn btn-outline-light" onClick={handleSignUp} style={{ padding: '10px 25px', fontSize: '1.1rem', fontWeight: '500', borderRadius: '8px' }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container py-5">
          {features.map((feature, index) => (
            <div key={index} className={`row align-items-center my-5 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="col-md-6 text-white px-4">
                <h2 style={{ color: '#00d8ff' }}>{feature.title}</h2>
                <p style={{ fontSize: '1.1rem' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Call to Action */}
        <div className="text-center text-white py-5">
          <h2>Why Choose InvestTrack?</h2>
          <p className="mt-3" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Whether you're a beginner investor or an experienced trader, InvestTrack brings together everything you need—
            from intelligent recommendations to real-time data and one-click trading—into one elegant interface.
            Join now to take full control of your financial journey.
          </p>
          <button className="btn btn-primary mt-4 px-4 py-2" onClick={handleSignUp}>
            Get Started Today
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
