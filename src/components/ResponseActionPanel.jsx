import React from "react";
import StatusBadge from "./StatusBadge";

function ResponseActionPanel({
  riskLevel,
  responseStatus,
  onAction,
}) {
  return (
    <div className="response-action-panel">

      <div className="action-summary">
        <div>
          <span>Current Risk</span>
          <StatusBadge level={riskLevel} />
        </div>

        <div>
          <span>Response Status</span>
          <strong>{responseStatus}</strong>
        </div>
      </div>

      <div className="action-title">
        Select response action
      </div>

      <div className="action-buttons">

        <button
          type="button"
          className="response-action advisory"
          onClick={() =>
            onAction("Issue Public Advisory")
          }
        >
          <span className="action-button-icon">
            ◇
          </span>

          <span>
            <strong>Issue Public Advisory</strong>
            <small>
              Notify the public about heatwave risk.
            </small>
          </span>

          <span className="arrow">→</span>
        </button>

        <button
          type="button"
          className="response-action deploy"
          onClick={() =>
            onAction("Deploy Response Team")
          }
        >
          <span className="action-button-icon">
            +
          </span>

          <span>
            <strong>Deploy Response Team</strong>
            <small>
              Dispatch personnel to the affected region.
            </small>
          </span>

          <span className="arrow">→</span>
        </button>

        <button
          type="button"
          className="response-action monitoring"
          onClick={() =>
            onAction("Increase Monitoring")
          }
        >
          <span className="action-button-icon">
            ◉
          </span>

          <span>
            <strong>Increase Monitoring</strong>
            <small>
              Increase frequency of regional monitoring.
            </small>
          </span>

          <span className="arrow">→</span>
        </button>

      </div>
    </div>
  );
}

export default ResponseActionPanel;