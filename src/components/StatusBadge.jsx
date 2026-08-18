import React from 'react';

const StatusBadge = ({ level }) => {
  // Conditional class assignment based on risk level
  const getBadgeClass = () => {
    switch (level) {
      case 'LOW': return 'badge-low';
      case 'MODERATE': return 'badge-moderate';
      case 'HIGH': return 'badge-high';
      case 'CRITICAL': return 'badge-critical';
      default: return 'badge-default';
    }
  };

  return <span className={`status-badge ${getBadgeClass()}`}>{level}</span>;
};

export default StatusBadge;