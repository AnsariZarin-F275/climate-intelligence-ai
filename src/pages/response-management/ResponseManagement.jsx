import React, { useState } from "react";
import FieldObservationForm from "../../components/FieldObservationForm";
import ResponseActionPanel from "../../components/ResponseActionPanel";
import StatusBadge from "../../components/StatusBadge";
import "./ResponseManagement.css";

const regions = {
  Mumbai: {
    temperature: 43,
    humidity: 68,
    windSpeed: 12,
    heatIndex: 46,
    responseStatus: "Response Required",
    lastUpdated: "Just now",
  },
  Pune: {
    temperature: 38,
    humidity: 54,
    windSpeed: 15,
    heatIndex: 39,
    responseStatus: "Monitoring",
    lastUpdated: "2 min ago",
  },
  Delhi: {
    temperature: 44,
    humidity: 61,
    windSpeed: 10,
    heatIndex: 45,
    responseStatus: "Response Required",
    lastUpdated: "1 min ago",
  },
  Nagpur: {
    temperature: 41,
    humidity: 58,
    windSpeed: 13,
    heatIndex: 43,
    responseStatus: "Team Standby",
    lastUpdated: "3 min ago",
  },
};

function getRiskLevel(heatIndex) {
  if (heatIndex >= 45) return "CRITICAL";
  if (heatIndex >= 40) return "HIGH";
  if (heatIndex >= 30) return "MODERATE";
  return "LOW";
}

function ResponseManagement({ onBack }) {
  const [selectedRegion, setSelectedRegion] = useState("Mumbai");
  const [responseStatus, setResponseStatus] = useState(
    regions.Mumbai.responseStatus
  );
  const [observationMessage, setObservationMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const region = regions[selectedRegion];
  const riskLevel = getRiskLevel(region.heatIndex);

  const handleRegionChange = (event) => {
    const regionName = event.target.value;

    setSelectedRegion(regionName);
    setResponseStatus(regions[regionName].responseStatus);
    setObservationMessage("");
    setActionMessage("");
  };

  const handleObservationSubmit = (data) => {
    console.log("Field observation:", data);

    setObservationMessage(
      `Field observation for ${selectedRegion} has been recorded successfully.`
    );
  };

  const handleResponseAction = (action) => {
    let newStatus = "Monitoring";

    if (action === "Issue Public Advisory") {
      newStatus = "Public Advisory Issued";
    } else if (action === "Deploy Response Team") {
      newStatus = "Response Team Deployed";
    } else if (action === "Increase Monitoring") {
      newStatus = "Enhanced Monitoring";
    }

    setResponseStatus(newStatus);

    setActionMessage(
      `${action} selected for ${selectedRegion}. Response status updated.`
    );
  };

  return (
    <div className="response-page">
      {/* Page Header */}
      <section className="response-hero">
        <div>
          <div className="eyebrow">
            DISASTER RESPONSE CONTROL
          </div>

          <h1>Response Management</h1>

          <p>
            Coordinate field observations and response actions for
            heatwave-affected regions.
          </p>
        </div>

        <div className="hero-status">
          <span className="status-dot"></span>
          <span>Operations Active</span>
        </div>
      </section>

      {/* Region Selector */}
      <section className="region-selector-card">
        <div className="region-selector-left">
          <div className="region-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="currentColor"
              />
            </svg>
          </div>

          <div>
            <span className="small-label">
              MONITORED REGION
            </span>

            <h2>{selectedRegion}</h2>
          </div>
        </div>

        <div className="region-select-wrapper">
          <label htmlFor="response-region">
            Select region
          </label>

          <select
            id="response-region"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>
      </section>

      {/* Current Response Status */}
      <section className="response-status-card">
        <div className="response-status-main">
          <div className={`alert-icon ${riskLevel.toLowerCase()}`}>
            !
          </div>

          <div>
            <span className="small-label">
              CURRENT RESPONSE STATUS
            </span>

            <h3>{responseStatus}</h3>

            <p>
              Last updated: {region.lastUpdated}
            </p>
          </div>
        </div>

        <div className="current-risk">
          <span className="small-label">
            CURRENT RISK
          </span>

          <StatusBadge level={riskLevel} />
        </div>
      </section>

      {/* Climate Snapshot */}
      <section className="climate-snapshot">
        <div className="section-heading">
          <div>
            <span className="small-label">
              LIVE CONDITIONS
            </span>
            <h2>Climate Snapshot</h2>
          </div>

          <span className="live-indicator">
            <span></span>
            Live data
          </span>
        </div>

        <div className="climate-grid">
          <div className="climate-metric">
            <span className="metric-icon">°</span>
            <div>
              <span>Temperature</span>
              <strong>{region.temperature}°C</strong>
            </div>
          </div>

          <div className="climate-metric">
            <span className="metric-icon">%</span>
            <div>
              <span>Humidity</span>
              <strong>{region.humidity}%</strong>
            </div>
          </div>

          <div className="climate-metric">
            <span className="metric-icon">≈</span>
            <div>
              <span>Wind Speed</span>
              <strong>{region.windSpeed} km/h</strong>
            </div>
          </div>

          <div className={`climate-metric heat-index ${riskLevel.toLowerCase()}`}>
            <span className="metric-icon">⚠</span>
            <div>
              <span>Heat Index</span>
              <strong>{region.heatIndex}°C</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Operations */}
      <section className="operations-grid">
        {/* Field Observation */}
        <div className="operation-card">
          <div className="operation-header">
            <div className="operation-icon blue">
              +
            </div>

            <div>
              <span className="small-label">
                FIELD REPORT
              </span>

              <h2>Ground Observation</h2>

              <p>
                Record climate conditions observed by field personnel.
              </p>
            </div>
          </div>

          <FieldObservationForm
            selectedRegion={selectedRegion}
            onSubmit={handleObservationSubmit}
          />

          {observationMessage && (
            <div className="success-message">
              <span>✓</span>
              {observationMessage}
            </div>
          )}
        </div>

        {/* Response Actions */}
        <div className="operation-card">
          <div className="operation-header">
            <div className="operation-icon orange">
              ⚡
            </div>

            <div>
              <span className="small-label">
                RESPONSE COORDINATION
              </span>

              <h2>Response Actions</h2>

              <p>
                Select an appropriate action for {selectedRegion}.
              </p>
            </div>
          </div>

          <ResponseActionPanel
            riskLevel={riskLevel}
            responseStatus={responseStatus}
            onAction={handleResponseAction}
          />

          {actionMessage && (
            <div className="success-message">
              <span>✓</span>
              {actionMessage}
            </div>
          )}
        </div>
      </section>

      {/* Bottom information */}
      <section className="response-guidance">
        <div className="guidance-icon">
          i
        </div>

        <div>
          <strong>Response coordination guidance</strong>

          <p>
            Actions should be selected according to the current heat
            index risk level and field conditions. Critical conditions
            require immediate response coordination.
          </p>
        </div>
      </section>

      {/* Back button only if parent provides it */}
      {onBack && (
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Risk Dashboard
        </button>
      )}
    </div>
  );
}

export default ResponseManagement;