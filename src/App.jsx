import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import RiskAssessment from "./components/RiskAssessment";
import AlertPanel from "./components/AlertPanel";
import ResponseManagement from "./pages/response-management/ResponseManagement";

import { fetchClimateData } from "./services/climateApi";
import { getRiskAssessment } from "./utils/riskAnalyzer";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("risk");

  const [selectedRegion, setSelectedRegion] = useState("Mumbai");
  const [climateData, setClimateData] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState({});
  const [alert, setAlert] = useState({ active: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const loadRegionalData = async (region) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchClimateData(region);

      setClimateData(data);

      const assessment = getRiskAssessment(data.heatIndex);

      setRiskAssessment(assessment);

      if (
        assessment.riskLevel === "HIGH" ||
        assessment.riskLevel === "CRITICAL"
      ) {
        setAlert({
          active: true,
          severity: assessment.riskLevel,
          message: `Heatwave conditions detected in ${region}. Immediate action required.`,
        });
      } else {
        setAlert({
          active: false,
        });
      }

      setLastSyncTime(data.lastUpdated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegionalData(selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadRegionalData(selectedRegion);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedRegion]);

  const handleAcknowledgeAlert = () => {
    setAlert({
      ...alert,
      active: false,
    });
  };

  const handleRefresh = () => {
    loadRegionalData(selectedRegion);
  };

  return (
    <div className="app-container">

      {/* SHARED HEADER — rendered exactly once */}
      <Header
        appName="Climate Intelligence AI"
        dashboardTitle={
          currentPage === "response"
            ? "Response Management"
            : "Risk Assessment & Alerts"
        }
        officerStatus="Online"
        lastSyncTime={lastSyncTime}
      />

      {/* PAGE NAVIGATION */}
      <nav className="page-navigation">
        <button
          className={currentPage === "risk" ? "active" : ""}
          onClick={() => setCurrentPage("risk")}
        >
          Risk Dashboard
        </button>

        <button
          className={currentPage === "response" ? "active" : ""}
          onClick={() => setCurrentPage("response")}
        >
          Response Management
        </button>
      </nav>

      {/* THIRD PAGE */}
      {currentPage === "response" ? (
        <ResponseManagement
          onBack={() => setCurrentPage("risk")}
        />
      ) : (
        <main className="main-content">

          <div className="controls">
            <label htmlFor="region-select">
              Select Region:
            </label>

            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) =>
                setSelectedRegion(e.target.value)
              }
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Nagpur">Nagpur</option>
            </select>

            <button
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading
                ? "Refreshing..."
                : "Refresh Data"}
            </button>
          </div>

          {loading && (
            <p className="loading-text">
              Loading climate data...
            </p>
          )}

          {error && (
            <p className="error-text">
              Error: {error}
            </p>
          )}

          {climateData && !loading && (
            <div className="dashboard-grid">

              <RiskAssessment
                riskLevel={riskAssessment.riskLevel}
                assessment={`Based on a heat index of ${climateData.heatIndex}°C, the region is classified as ${riskAssessment.riskLevel} risk.`}
                recommendedAction={
                  riskAssessment.recommendedAction
                }
                heatIndex={climateData.heatIndex}
              />

              <AlertPanel
                alert={alert}
                onAcknowledge={handleAcknowledgeAlert}
              />

            </div>
          )}

        </main>
      )}
    </div>
  );
}

export default App;