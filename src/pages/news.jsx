import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { motion } from "framer-motion";
import { Footer } from "../components/footer";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/news/Latestnews`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="min-vh-100 bg-gradient-to-br from-[#141e30] to-[#243b55] text-white d-flex flex-column">
        <Navbar2 />
        <div className="container max-w-7xl mx-auto pt-28 pb-20 px-3 px-sm-4 px-md-5">
          <h1
            className="text-center mb-12 fw-bold"
            style={{
              marginTop: "150px",
              fontSize: "2.5rem",
              lineHeight: 1.1,
              textShadow: "0 0 8px rgba(0,0,0,0.8)",
            }}
          >
            📰 Curated Market & Sports Headlines
          </h1>

          {/* Loader Animation */}
          {loading && (
            <div className="d-flex justify-content-center align-items-center py-10">
              <div
                className="spinner-border text-info"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="alert alert-danger text-center fs-5 mt-4">
              {error}
            </div>
          )}

          {/* News Grid */}
          <div className="row g-4 mt-3">
            {news.length > 0 ? (
              news.map((article, idx) => (
                <div
                  className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
                  key={idx}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="card shadow-lg rounded-4 overflow-hidden flex-fill"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                    }}
                  >
                    <div className="card-body d-flex flex-column p-3 p-sm-4">
                      <NewsCard article={article} />
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              !loading && (
                <div className="col-12 text-center mt-10 text-secondary fs-5">
                  <p>No news available at the moment.</p>
                </div>
              )
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
