import React from 'react';
import StatusBadge from './StatusBadge';

const AlertPanel = ({ alert, onAcknowledge }) => {
  // Conditional rendering based on alert status
  if (!alert || !alert.active) {
    return (
      <div className="card alert-panel-card">
        <h2>Active Alerts</h2>
        <p className="no-alerts">No active alerts for this region.</p>
      </div>
    );
  }

  return (
    <div className="card alert-panel-card">
      <h2>Active Alerts</h2>
      <div className="alert-item">
        <div className="alert-header">
          <span>Heatwave Alert</span>
          <StatusBadge level={alert.severity} />
        </div>
        <p className="alert-message">{alert.message}</p>
        <button className="btn-acknowledge" onClick={onAcknowledge}>
          Acknowledge Alert
        </button>
      </div>
    </div>
  );
};

export default AlertPanel;