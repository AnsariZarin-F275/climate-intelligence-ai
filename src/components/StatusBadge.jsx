import React from "react";

function StatusBadge({ level }) {
  const normalizedLevel = level
    ? level.toUpperCase()
    : "LOW";

  return (
    <span
      className={`status-badge status-${normalizedLevel.toLowerCase()}`}
    >
      <span className="badge-dot"></span>
      {normalizedLevel}
    </span>
  );
}

export default StatusBadge;