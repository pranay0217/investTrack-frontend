import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import { Footer } from '../components/footer';

export function Dashboard() {
  const [zerodhaHoldings, setZerodhaHoldings] = useState(null); // null = not loaded yet
  const [angelHoldings, setAngelHoldings] = useState(null);
  const [activeTab, setActiveTab] = useState('zerodha');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllHoldings = async () => {
    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      const clientId = localStorage.getItem("angel_clientcode");

      if (!username) {
        alert("User not logged in");
        navigate("/login");
        return;
      }

      // Fetch Zerodha holdings
      try {
        const zerodhaRes = await axios.get(`${import.meta.env.VITE_API_URL}/broker/getZerodhaHoldings?username=${encodeURIComponent(username)}`);
        if (zerodhaRes.data?.success && Array.isArray(zerodhaRes.data.data)) {
          const zerodhaData = zerodhaRes.data.data.find(b => b.broker?.toLowerCase() === 'zerodha');
          setZerodhaHoldings(zerodhaData?.holdings || []);
        } else {
          setZerodhaHoldings([]);
        }
      } catch (err) {
        console.error('Error fetching Zerodha:', err);
        setZerodhaHoldings([]);
      }

      // Fetch Angel One holdings (only if clientId is present)
      if (clientId) {
        try {
          const angelRes = await axios.get(`${import.meta.env.VITE_API_URL}/broker/angelonefetchPortfolio?username=${encodeURIComponent(username)}&clientId=${encodeURIComponent(clientId)}`);
          console.log("Angel One Response:", angelRes.data);
          if (angelRes.data?.success) {
            const angelData = angelRes.data.data?.[0];
            const extractedHoldings = angelData?.holdings?.holdings || [];
            setAngelHoldings(extractedHoldings);
          } else {
            setAngelHoldings([]);
          }
        } catch (err) {
          console.error('Error fetching Angel One:', err);
          setAngelHoldings([]);
        }
      } else {
        setAngelHoldings([]); // Still set to empty array to show "Connect Angel" UI
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHoldings();
  }, []);

  const handleBuy = symbol => alert(`Buy action triggered for ${symbol}`);
  const handleSell = symbol => alert(`Sell action triggered for ${symbol}`);

  const renderHoldingsCard = (holdings) => (
    <div className="card shadow-sm mb-4 border-0 rounded-4 bg-light-subtle">
      <div className="card-body">
        {holdings.map((holding, idx) => {
          const symbol = holding.tradingsymbol || holding.symbol || 'N/A';
          const quantity = holding.quantity || holding.qty || 'N/A';
          const avgPrice = holding.average_price || holding.averageprice || holding.avgprice || 'N/A';
          const pnl = holding.profitandloss || holding.pnl || 'N/A';
          const ltp = holding.ltp || holding.last_price || 'N/A';
          const exchange = holding.exchange || 'NSE';
          const pnlValue = parseFloat(pnl);
          const isProfit = !isNaN(pnlValue) && pnlValue >= 0;
          const pnlClass = isProfit ? 'text-success' : 'text-danger';

          return (
            <div className="row border-bottom py-3 align-items-center hover-bg-light" key={idx}>
              <div className="col-12 col-sm-6 col-md-3 mb-2">
                <h6 className="mb-1 text-truncate fw-semibold" title={symbol}>{symbol}</h6>
                <small className="text-muted"><strong>Qty:</strong> {quantity}</small>
              </div>
              <div className="col-6 col-sm-6 col-md-3 mb-2">
                <small><strong>Avg:</strong> ₹{avgPrice}</small><br />
                <small><strong>LTP:</strong> ₹{ltp}</small>
              </div>
              <div className="col-6 col-sm-6 col-md-3 mb-2">
                <small><strong>P&L:</strong> <span className={pnlClass}>₹{pnl}</span></small><br />
                <small><strong>Exchange:</strong> {exchange}</small>
              </div>
              <div className="col-12 col-md-3 text-md-end mt-2 mt-md-0">
                <div className="d-flex flex-wrap justify-content-md-end gap-2">
                  <button className="btn btn-outline-success btn-sm" onClick={() => handleBuy(symbol)}>Buy</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleSell(symbol)}>Sell</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const hasZerodha = zerodhaHoldings !== null;
  const hasAngel = angelHoldings !== null;

  return (
    <>
      <div className="bg-light min-vh-100" style={{ background: 'linear-gradient(to right, rgb(84, 110, 150), rgb(99, 129, 163))' }}>
        <Navbar2 />
        <div style={{ marginTop: '120px' }} />
        <div className="container-fluid px-3 px-sm-5">
          {(hasZerodha || hasAngel) && (
            <ul className="nav nav-pills justify-content-center mb-4 flex-wrap">
              {hasZerodha && (
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'zerodha' ? 'active' : ''}`} onClick={() => setActiveTab('zerodha')}>
                    Zerodha
                  </button>
                </li>
              )}
              {hasAngel && (
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === 'angelone' ? 'active' : ''}`} onClick={() => setActiveTab('angelone')}>
                    Angel One
                  </button>
                </li>
              )}
            </ul>
          )}

          {loading ? (
            <p className="text-white text-center">Loading data...</p>
          ) : (
            <>
              {activeTab === 'zerodha' && hasZerodha && (
                zerodhaHoldings.length > 0 ? renderHoldingsCard(zerodhaHoldings) : (
                  <p className="text-white text-center">
                    No Zerodha holdings found.
                    <button className="btn btn-sm btn-warning ms-2 mt-2" onClick={() => navigate('/addnewbroker')}>
                      Connect Zerodha
                    </button>
                  </p>
                )
              )}
              {activeTab === 'angelone' && hasAngel && (
                angelHoldings.length > 0 ? renderHoldingsCard(angelHoldings) : (
                  <p className="text-white text-center">
                    No Angel One holdings found.
                    <button className="btn btn-sm btn-warning ms-2 mt-2" onClick={() => navigate('/addnewbroker')}>
                      Connect Angel One
                    </button>
                  </p>
                )
              )}
            </>
          )}

          <div className="text-center my-5">
            <button className="btn btn-primary" onClick={() => navigate('/addnewbroker')}>Add New Broker</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
