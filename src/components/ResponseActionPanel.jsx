import React from "react";

function ResponseActionPanel({
  selectedRegion,
  riskLevel,
  responseStatus,
  onAction,
}) {

  const actions = [
    {
      title: "Issue Public Advisory",
      description:
        "Notify residents about current heatwave conditions and safety measures.",
      icon: "!",
    },
    {
      title: "Deploy Response Team",
      description:
        "Mobilize field personnel and emergency response resources.",
      icon: "↗",
    },
    {
      title: "Increase Monitoring",
      description:
        "Increase observation frequency and continue close monitoring.",
      icon: "◉",
    },
  ];

  return (
    <section className="action-card">

      <div className="card-heading">

        <div className="card-icon action-icon">
          ⚡
        </div>

        <div>
          <p className="section-label">
            RESPONSE COORDINATION
          </p>

          <h2>
            Response Actions
          </h2>

          <p>
            Select an appropriate action for {selectedRegion}.
          </p>
        </div>

      </div>

      <div className="action-context">

        <div>
          <span>Current Risk</span>
          <strong className={`risk-text ${riskLevel?.toLowerCase()}`}>
            {riskLevel}
          </strong>
        </div>

        <div>
          <span>Response Status</span>
          <strong>
            {responseStatus}
          </strong>
        </div>

      </div>

      <div className="action-list">

        {actions.map((action) => (

          <button
            key={action.title}
            className="response-action"
            onClick={() => onAction(action.title)}
          >

            <span className="action-symbol">
              {action.icon}
            </span>

            <span className="action-content">

              <strong>
                {action.title}
              </strong>

              <small>
                {action.description}
              </small>

            </span>

            <span className="action-arrow">
              →
            </span>

          </button>

        ))}

      </div>

      <div className="response-note">
        <span>i</span>

        <p>
          Response actions update the selected region's
          status immediately and remain visible on the dashboard.
        </p>
      </div>

    </section>
  );
}

export default ResponseActionPanel;