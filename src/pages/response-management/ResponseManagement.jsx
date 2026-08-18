import React, { useState } from "react";
import Header from "../../components/Header";
import FieldObservationForm from "../../components/FieldObservationForm";
import ResponseActionPanel from "../../components/ResponseActionPanel";
import StatusBadge from "../../components/StatusBadge";
import "./ResponseManagement.css";

function ResponseManagement({ onBack }) {
  const [selectedRegion, setSelectedRegion] = useState("Mumbai");

  const [responseData, setResponseData] = useState({
    Mumbai: {
      riskLevel: "CRITICAL",
      responseStatus: "Response Required",
      lastUpdated: "Just now",
    },
    Pune: {
      riskLevel: "HIGH",
      responseStatus: "Monitoring",
      lastUpdated: "2 min ago",
    },
    Delhi: {
      riskLevel: "MODERATE",
      responseStatus: "Monitoring",
      lastUpdated: "4 min ago",
    },
    Nagpur: {
      riskLevel: "HIGH",
      responseStatus: "Response Required",
      lastUpdated: "3 min ago",
    },
  });

  const [observation, setObservation] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const currentRegion = responseData[selectedRegion];

  // Update response status when an action is selected
  const handleResponseAction = (action) => {
    let newStatus = "Monitoring";

    if (action === "Issue Public Advisory") {
      newStatus = "Public Advisory Issued";
    } else if (action === "Deploy Response Team") {
      newStatus = "Response Team Deployed";
    } else if (action === "Increase Monitoring") {
      newStatus = "Enhanced Monitoring";
    }

    setResponseData((previousData) => ({
      ...previousData,
      [selectedRegion]: {
        ...previousData[selectedRegion],
        responseStatus: newStatus,
        lastUpdated: "Just now",
      },
    }));

    setSuccessMessage(
      `${action} selected for ${selectedRegion}. Response status updated.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  // Receive submitted field observation from child component
  const handleObservationSubmit = (formData) => {
    setObservation(formData);

    setSuccessMessage(
      `Field observation for ${formData.region} has been recorded successfully.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div className="response-page">

      <Header
        appName="Climate Intelligence AI"
        dashboardTitle="Response Management"
        officerStatus="Online"
        lastSyncTime={new Date().toLocaleTimeString()}
      />

      <main className="response-container">

        {/* Page heading */}
        <section className="response-heading">
          <div>
            <p className="section-label">DISASTER RESPONSE CONTROL</p>

            <h1>Response Management</h1>

            <p className="response-description">
              Coordinate field observations and response actions for
              heatwave-affected regions.
            </p>
          </div>

          {onBack && (
            <button
              className="back-button"
              onClick={onBack}
            >
              ← Back to Risk Dashboard
            </button>
          )}
        </section>

        {/* Region selector */}
        <section className="region-selector-card">

          <div className="selector-info">
            <span className="selector-icon">◎</span>

            <div>
              <p className="selector-label">
                MONITORED REGION
              </p>

              <h2>
                {selectedRegion}
              </h2>
            </div>
          </div>

          <select
            value={selectedRegion}
            onChange={(event) => {
              setSelectedRegion(event.target.value);
              setObservation(null);
            }}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Nagpur">Nagpur</option>
          </select>

        </section>

        {/* Current response status */}
        <section className="current-status-card">

          <div className="status-main">

            <div className="status-icon">
              !
            </div>

            <div>
              <p className="status-overline">
                CURRENT RESPONSE STATUS
              </p>

              <h2>
                {currentRegion.responseStatus}
              </h2>

              <p>
                Last updated: {currentRegion.lastUpdated}
              </p>
            </div>

          </div>

          <div className="risk-status">

            <span className="risk-label">
              CURRENT RISK
            </span>

            <StatusBadge
              level={currentRegion.riskLevel}
            />

          </div>

        </section>

        {/* Success message */}
        {successMessage && (
          <div className="success-message">
            <span>✓</span>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Main response management grid */}
        <section className="response-grid">

          {/* Field observation */}
          <FieldObservationForm
            selectedRegion={selectedRegion}
            onSubmit={handleObservationSubmit}
          />

          {/* Response actions */}
          <ResponseActionPanel
            selectedRegion={selectedRegion}
            riskLevel={currentRegion.riskLevel}
            responseStatus={currentRegion.responseStatus}
            onAction={handleResponseAction}
          />

        </section>

        {/* Latest field observation */}
        {observation && (
          <section className="observation-summary">

            <div className="summary-header">
              <div>
                <p className="section-label">
                  LATEST FIELD REPORT
                </p>

                <h2>
                  Ground Observation
                </h2>
              </div>

              <span className="recorded-badge">
                ✓ Recorded
              </span>
            </div>

            <div className="observation-grid">

              <div className="observation-item">
                <span>Region</span>
                <strong>{observation.region}</strong>
              </div>

              <div className="observation-item">
                <span>Observation Type</span>
                <strong>{observation.observationType}</strong>
              </div>

              <div className="observation-item">
                <span>Temperature</span>
                <strong>
                  {observation.temperature}°C
                </strong>
              </div>

              <div className="observation-item">
                <span>Heat Index</span>
                <strong>
                  {observation.heatIndex}°C
                </strong>
              </div>

            </div>

            <div className="officer-remark">
              <span>Officer Remark</span>
              <p>{observation.remark}</p>
            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default ResponseManagement;