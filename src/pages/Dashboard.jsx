import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import { Footer } from '../components/footer';

export function Dashboard() {
  const [zerodhaHoldings, setZerodhaHoldings] = useState(null); // null means not loaded yet
  const [angelHoldings, setAngelHoldings] = useState(null);
  const [activeTab, setActiveTab] = useState('zerodha');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllHoldings = async () => {
    try {
      setLoading(true);
      const username = localStorage.getItem('username');
      const clientId = localStorage.getItem('angel_clientcode');

      if (!username) {
        alert('User not logged in');
        navigate('/login');
        return;
      }

      // Fetch Zerodha holdings
      const zerodhaRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/broker/getZerodhaHoldings?username=${encodeURIComponent(username)}`
      );
      if (zerodhaRes.data?.success && Array.isArray(zerodhaRes.data.data)) {
        const zerodhaData = zerodhaRes.data.data.find(
          (b) => b.broker?.toLowerCase().trim() === 'zerodha'
        );
        setZerodhaHoldings(zerodhaData?.holdings || []);
      } else {
        setZerodhaHoldings([]); // no holdings found
      }

      // Fetch Angel One holdings if clientId exists
      if (clientId) {
        const angelRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/broker/angelonefetchPortfolio?username=${encodeURIComponent(username)}&clientId=${encodeURIComponent(clientId)}`
        );
        if (angelRes.data?.success) {
          const angelData = angelRes.data.data?.[0];
          const extractedHoldings = angelData?.holdings?.holdings || angelData?.holdings || [];
          setAngelHoldings(Array.isArray(extractedHoldings) ? extractedHoldings : []);
        } else {
          setAngelHoldings([]);
        }
      } else {
        setAngelHoldings([]); // no clientId means no Angel One account linked
      }
    } catch (err) {
      console.error('Error fetching holdings:', err);
      setZerodhaHoldings([]);
      setAngelHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHoldings();
  }, []);

  const handleBuy = (symbol) => alert(`Buy action triggered for ${symbol}`);
  const handleSell = (symbol) => alert(`Sell action triggered for ${symbol}`);

  const renderHoldingsCard = (holdings, brokerName) => {
    if (!holdings || holdings.length === 0) {
      return <p className="text-center text-muted">No holdings available.</p>;
    }
    return (
      <div className="card shadow-sm mb-4 border-0 rounded-4 bg-light-subtle">
        <div className="card-body">
          {holdings.map((holding, idx) => {
            const symbol = holding.tradingsymbol || holding.symbol || 'N/A';
            const quantity = holding.quantity || holding.qty || 'N/A';
            const avgPrice =
              holding.average_price ||
              holding.averageprice ||
              holding.avgprice ||
              'N/A';
            const pnl = holding.profitandloss || holding.pnl || 'N/A';
            const ltp = holding.ltp || holding.last_price || 'N/A';
            const exchange = holding.exchange || 'NSE';

            const pnlValue = parseFloat(pnl);
            const isProfit = !isNaN(pnlValue) && pnlValue >= 0;
            const pnlClass = isProfit ? 'text-success' : 'text-danger';

            return (
              <div
                className="row border-bottom py-3 align-items-center hover-bg-light"
                key={idx}
              >
                <div className="col-12 col-sm-6 col-md-3 mb-2">
                  <h6 className="mb-1 text-truncate fw-semibold" title={symbol}>
                    {symbol}
                  </h6>
                  <small className="text-muted">
                    <strong>Qty:</strong> {quantity}
                  </small>
                </div>
                <div className="col-6 col-sm-6 col-md-3 mb-2">
                  <small>
                    <strong>Avg:</strong> ₹{avgPrice}
                  </small>
                  <br />
                  <small>
                    <strong>LTP:</strong> ₹{ltp}
                  </small>
                </div>
                <div className="col-6 col-sm-6 col-md-3 mb-2">
                  <small>
                    <strong>P&L:</strong>{' '}
                    <span className={pnlClass}>₹{pnl}</span>
                  </small>
                  <br />
                  <small>
                    <strong>Exchange:</strong> {exchange}
                  </small>
                </div>
                <div className="col-12 col-md-3 text-md-end mt-2 mt-md-0">
                  <div className="d-flex flex-wrap justify-content-md-end gap-2">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleBuy(symbol)}
                    >
                      Buy
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleSell(symbol)}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const hasZerodha = Array.isArray(zerodhaHoldings) && zerodhaHoldings.length > 0;
  const hasAngel = Array.isArray(angelHoldings) && angelHoldings.length > 0;

  // Adjust default active tab if current active tab has no data
  React.useEffect(() => {
    if (activeTab === 'zerodha' && !hasZerodha && hasAngel) setActiveTab('angelone');
    if (activeTab === 'angelone' && !hasAngel && hasZerodha) setActiveTab('zerodha');
  }, [zerodhaHoldings, angelHoldings, activeTab, hasZerodha, hasAngel]);

  return (
    <>
      <div
        className="bg-light min-vh-100"
        style={{
          background: 'linear-gradient(to right, rgb(84, 110, 150), rgb(99, 129, 163))',
        }}
      >
        <Navbar2 />
        <div style={{ marginTop: '120px' }} />

        <div className="container-fluid px-3 px-sm-5">
          {(hasZerodha || hasAngel) && (
            <ul className="nav nav-pills justify-content-center mb-4 flex-wrap">
              {hasZerodha && (
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'zerodha' ? 'active' : ''}`}
                    onClick={() => setActiveTab('zerodha')}
                  >
                    Zerodha
                  </button>
                </li>
              )}
              {hasAngel && (
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'angelone' ? 'active' : ''}`}
                    onClick={() => setActiveTab('angelone')}
                  >
                    Angel One
                  </button>
                </li>
              )}
            </ul>
          )}

          {loading ? (
            <p className="text-white text-center">Loading data...</p>
          ) : hasZerodha || hasAngel ? (
            activeTab === 'zerodha' ? (
              hasZerodha ? (
                renderHoldingsCard(zerodhaHoldings, 'zerodha')
              ) : (
                <p className="text-white text-center">
                  No Zerodha data found.
                  <button
                    className="btn btn-sm btn-warning ms-2 mt-2"
                    onClick={() => navigate('/addnewbroker')}
                  >
                    Connect Zerodha
                  </button>
                </p>
              )
            ) : activeTab === 'angelone' ? (
              hasAngel ? (
                renderHoldingsCard(angelHoldings, 'angelone')
              ) : (
                <p className="text-white text-center">
                  No Angel One data found.
                  <button
                    className="btn btn-sm btn-warning ms-2 mt-2"
                    onClick={() => navigate('/addnewbroker')}
                  >
                    Connect Angel One
                  </button>
                </p>
              )
            ) : null
          ) : (
            // No holdings at all
            <div className="text-center text-white">
              <p>No brokerage accounts connected yet.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/addnewbroker')}
              >
                Add New Broker
              </button>
            </div>
          )}

          {/* Always show add new broker button */}
          <div className="text-center my-5">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/addnewbroker')}
            >
              Add New Broker
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
