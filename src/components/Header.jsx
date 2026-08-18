import React from 'react';

const Header = ({ appName, dashboardTitle, officerStatus, lastSyncTime }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="app-name">{appName}</h1>
        <p className="dashboard-title">{dashboardTitle}</p>
      </div>
      <div className="header-right">
        <p className="officer-status">
          Status: <strong>{officerStatus}</strong>
        </p>
        <p className="sync-time">Last Sync: {lastSyncTime || 'Never'}</p>
      </div>
    </header>
  );
};

export default Header;