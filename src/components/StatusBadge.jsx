import React from "react";

function StatusBadge({ level }) {

  const normalizedLevel =
    level?.toUpperCase() || "LOW";

  return (
    <span
      className={`status-badge status-${normalizedLevel.toLowerCase()}`}
    >
      <span className="status-dot"></span>

      {normalizedLevel}
    </span>
  );
}

export default StatusBadge;