import React from 'react';
import StatusBadge from './StatusBadge';

const RiskAssessment = ({ riskLevel, assessment, recommendedAction, heatIndex }) => {
  return (
    <div className="card risk-assessment-card">
      <h2>AI Risk Assessment</h2>
      
      <div className="assessment-header">
        <span>Current Risk Level:</span>
        <StatusBadge level={riskLevel} />
      </div>
      
      <div className="assessment-details">
        <div className="detail-item">
          <label>Heat Index:</label>
          <span className="heat-index-value">{heatIndex}°C</span>
        </div>
        <div className="detail-item">
          <label>AI Assessment:</label>
          <p>{assessment}</p>
        </div>
        <div className="detail-item">
          <label>Recommended Action:</label>
          <p className="action-text">{recommendedAction}</p>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;