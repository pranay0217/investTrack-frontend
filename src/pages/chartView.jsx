import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ChartCanvas,
  Chart,
  XAxis,
  YAxis,
  CandlestickSeries,
  LineSeries,
  MACDSeries,
  discontinuousTimeScaleProviderBuilder,
  sma,
  ema,
  macd,
} from "react-financial-charts";
import Navbar2 from '../components/Navbar2';
import { Footer } from '../components/footer';


const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || "demo";

function transformData(rawData) {
  return Object.entries(rawData)
    .map(([date, values]) => ({
      date: new Date(date),
      open: +values["1. open"],
      high: +values["2. high"],
      low: +values["3. low"],
      close: +values["4. close"],
      volume: +values["5. volume"],
    }))
    .reverse();
}

export default function ChartView() {
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("5min");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedSymbol, setSubmittedSymbol] = useState(null);
  const [submittedInterval, setSubmittedInterval] = useState(null);
  const [indicators, setIndicators] = useState([]);

  const containerRef = useRef();
  const [width, setWidth] = useState(800);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  async function fetchData(symbolToFetch, intervalToFetch) {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const functionType =
        intervalToFetch === "daily"
          ? "TIME_SERIES_DAILY"
          : "TIME_SERIES_INTRADAY";
      const intervalParam =
        intervalToFetch === "daily" ? "" : `&interval=${intervalToFetch}`;

      const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbolToFetch}&apikey=${API_KEY}${intervalParam}`;

      const res = await axios.get(url);

      if (res.data.Note) {
        setError("API call frequency exceeded. Please try again later.");
        setLoading(false);
        return;
      }

      if (res.data["Error Message"]) {
        setError("Error: " + res.data["Error Message"]);
        setLoading(false);
        return;
      }

      if (res.data.Information) {
        setError(res.data.Information);
        setLoading(false);
        return;
      }

      const timeSeriesKey =
        intervalToFetch === "daily"
          ? "Time Series (Daily)"
          : `Time Series (${intervalToFetch})`;

      const rawData = res.data[timeSeriesKey];
      if (!rawData) {
        setError("No data available for this symbol and interval.");
        setLoading(false);
        return;
      }

      let formattedData = transformData(rawData);

      if (indicators.includes("SMA")) {
        const sma20 = sma()
          .options({ windowSize: 20 })
          .merge((d, c) => {
            d.sma20 = c;
          })
          .accessor((d) => d.sma20);
        formattedData = sma20(formattedData);
      }

      if (indicators.includes("EMA")) {
        const ema20 = ema()
          .options({ windowSize: 20 })
          .merge((d, c) => {
            d.ema20 = c;
          })
          .accessor((d) => d.ema20);
        formattedData = ema20(formattedData);
      }

      if (indicators.includes("MACD")) {
        const macdCalculator = macd()
          .options({ fast: 12, slow: 26, signal: 9 })
          .merge((d, c) => {
            d.macd = c;
          })
          .accessor((d) => d.macd);
        formattedData = macdCalculator(formattedData);
      }

      setData(formattedData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSymbol = symbol.trim().toUpperCase();
    if (!trimmedSymbol) {
      setError("Please enter a valid symbol.");
      return;
    }
    setSubmittedSymbol(trimmedSymbol);
    setSubmittedInterval(interval);
    fetchData(trimmedSymbol, interval);
  };

  function toggleIndicator(indicator) {
    setIndicators((prev) =>
      prev.includes(indicator)
        ? prev.filter((i) => i !== indicator)
        : [...prev, indicator]
    );
  }

  let chartContent = null;
  if (data.length > 0) {
    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d) => d.date
    );
    const { data: chartData, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(data);

    const start = xAccessor(chartData[Math.max(0, chartData.length - 100)]);
    const end = xAccessor(chartData[chartData.length - 1]);
    const xExtents = [start, end];

    chartContent = (
      <ChartCanvas
        height={400}
        width={width}
        ratio={window.devicePixelRatio || 1}
        margin={{ left: 60, right: 60, top: 20, bottom: 40 }}
        seriesName="Stock"
        data={chartData}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            stroke="#94a3b8"
            tickStroke="#94a3b8"
            tickLabelFill="#94a3b8"
            fontSize={12}
          />
          <YAxis
            axisAt="left"
            orient="left"
            stroke="#94a3b8"
            tickStroke="#94a3b8"
            tickLabelFill="#94a3b8"
            fontSize={12}
          />
          <CandlestickSeries stroke={{ up: "#22c55e", down: "#ef4444" }} wickStroke="#999" />

          {indicators.includes("SMA") && (
            <LineSeries yAccessor={(d) => d.sma20} stroke="#fbbf24" />
          )}

          {indicators.includes("EMA") && (
            <LineSeries yAccessor={(d) => d.ema20} stroke="#3b82f6" />
          )}
        </Chart>

        {indicators.includes("MACD") && (
          <Chart
            id={2}
            yExtents={(d) => d.macd && [d.macd.MACD, d.macd.signal, d.macd.histogram]}
            height={150}
            origin={(w, h) => [0, h - 150]}
          >
            <XAxis
              axisAt="bottom"
              orient="bottom"
              stroke="#94a3b8"
              tickStroke="#94a3b8"
              tickLabelFill="#94a3b8"
              fontSize={12}
            />
            <YAxis
              axisAt="right"
              orient="right"
              stroke="#94a3b8"
              tickStroke="#94a3b8"
              tickLabelFill="#94a3b8"
              fontSize={12}
            />
            <MACDSeries
              yAccessor={(d) => d.macd}
              {...{ fast: 12, slow: 26, signal: 9 }}
            />
          </Chart>
        )}
      </ChartCanvas>
    );
  }

  return (
    <>
      <Navbar2 />
      <div
        ref={containerRef}
        style={{
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          minHeight: "100vh",
          padding: "40px 20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: "flex",
          justifyContent: "center",
        alignItems: "flex-start",
        marginTop : '80px'
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "#1e293b",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)",
          padding: 30,
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ marginBottom: 30, fontWeight: 700, fontSize: 28, color: "#fbbf24", textAlign: "center" }}>
          Stock Chart Viewer
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 25,
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={{
              flexGrow: 1,
              minWidth: 140,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1.5px solid #334155",
              backgroundColor: "#0f172a",
              color: "#f8fafc",
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#fbbf24")}
            onBlur={(e) => (e.target.style.borderColor = "#334155")}
            autoFocus
          />
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            style={{
              minWidth: 120,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1.5px solid #334155",
              backgroundColor: "#0f172a",
              color: "#f8fafc",
              fontSize: 16,
              cursor: "pointer",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#fbbf24")}
            onBlur={(e) => (e.target.style.borderColor = "#334155")}
          >
            <option value="1min">1 Min</option>
            <option value="5min">5 Min</option>
            <option value="15min">15 Min</option>
            <option value="30min">30 Min</option>
            <option value="60min">60 Min</option>
            <option value="daily">Daily</option>
          </select>
          <button
            type="submit"
            style={{
              backgroundColor: "#fbbf24",
              border: "none",
              borderRadius: 8,
              padding: "10px 25px",
              color: "#1e293b",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#d97706")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#fbbf24")}
          >
            Fetch
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          {["SMA", "EMA", "MACD"].map((ind) => (
            <label
              key={ind}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                userSelect: "none",
                fontSize: 16,
              }}
            >
              <input
                type="checkbox"
                checked={indicators.includes(ind)}
                onChange={() => toggleIndicator(ind)}
                style={{
                  width: 18,
                  height: 18,
                  cursor: "pointer",
                  accentColor: "#fbbf24",
                }}
              />
              {ind === "SMA" && "SMA (20)"}
              {ind === "EMA" && "EMA (20)"}
              {ind === "MACD" && "MACD"}
            </label>
          ))}
        </div>

        {loading && (
          <p
            style={{
              color: "#fbbf24",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Loading data for {submittedSymbol}...
          </p>
        )}

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {error}
          </p>
        )}

        {!loading && !error && data.length === 0 && submittedSymbol && (
          <p
            style={{
              color: "#94a3b8",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            No data available.
          </p>
        )}

        {chartContent}
      </div>
    </div>
    <Footer />
    </>
  );
}
