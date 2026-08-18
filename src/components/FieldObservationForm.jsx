import React, { useState } from "react";

function FieldObservationForm({ selectedRegion, onSubmit }) {

  const [formData, setFormData] = useState({
    region: selectedRegion || "",
    observationType: "",
    temperature: "",
    heatIndex: "",
    remark: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.region) {
      newErrors.region = "Region is required.";
    }

    if (!formData.observationType) {
      newErrors.observationType =
        "Observation type is required.";
    }

    if (formData.temperature === "") {
      newErrors.temperature =
        "Temperature is required.";
    } else if (
      Number(formData.temperature) < -20 ||
      Number(formData.temperature) > 60
    ) {
      newErrors.temperature =
        "Temperature must be between -20°C and 60°C.";
    }

    if (formData.heatIndex === "") {
      newErrors.heatIndex =
        "Heat index is required.";
    } else if (isNaN(Number(formData.heatIndex))) {
      newErrors.heatIndex =
        "Heat index must be numerical.";
    }

    if (!formData.remark.trim()) {
      newErrors.remark =
        "Officer remark is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);

    setFormData({
      region: selectedRegion || "",
      observationType: "",
      temperature: "",
      heatIndex: "",
      remark: "",
    });

    setErrors({});
  };

  return (
    <section className="form-card">

      <div className="card-heading">

        <div className="card-icon observation-icon">
          +
        </div>

        <div>
          <p className="section-label">
            FIELD REPORT
          </p>

          <h2>
            Ground Observation
          </h2>

          <p>
            Record climate conditions observed by field personnel.
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Region */}
        <div className="form-group">

          <label htmlFor="region">
            Region
          </label>

          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">
              Select region
            </option>

            <option value="Mumbai">
              Mumbai
            </option>

            <option value="Pune">
              Pune
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Nagpur">
              Nagpur
            </option>
          </select>

          {errors.region && (
            <small className="field-error">
              {errors.region}
            </small>
          )}

        </div>

        {/* Observation type */}
        <div className="form-group">

          <label htmlFor="observationType">
            Observation Type
          </label>

          <select
            id="observationType"
            name="observationType"
            value={formData.observationType}
            onChange={handleChange}
          >
            <option value="">
              Select observation type
            </option>

            <option value="Temperature Check">
              Temperature Check
            </option>

            <option value="Heat Index Assessment">
              Heat Index Assessment
            </option>

            <option value="Ground Condition">
              Ground Condition
            </option>

            <option value="Public Impact">
              Public Impact
            </option>
          </select>

          {errors.observationType && (
            <small className="field-error">
              {errors.observationType}
            </small>
          )}

        </div>

        <div className="two-column">

          {/* Temperature */}
          <div className="form-group">

            <label htmlFor="temperature">
              Observed Temperature
            </label>

            <div className="input-with-unit">

              <input
                type="number"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g. 42"
                step="0.1"
              />

              <span>°C</span>

            </div>

            {errors.temperature && (
              <small className="field-error">
                {errors.temperature}
              </small>
            )}

          </div>

          {/* Heat Index */}
          <div className="form-group">

            <label htmlFor="heatIndex">
              Observed Heat Index
            </label>

            <div className="input-with-unit">

              <input
                type="number"
                id="heatIndex"
                name="heatIndex"
                value={formData.heatIndex}
                onChange={handleChange}
                placeholder="e.g. 45"
                step="0.1"
              />

              <span>°C</span>

            </div>

            {errors.heatIndex && (
              <small className="field-error">
                {errors.heatIndex}
              </small>
            )}

          </div>

        </div>

        {/* Officer remark */}
        <div className="form-group">

          <label htmlFor="remark">
            Officer Remark
          </label>

          <textarea
            id="remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            placeholder="Enter field observations or important conditions..."
            rows="4"
          />

          {errors.remark && (
            <small className="field-error">
              {errors.remark}
            </small>
          )}

        </div>

        <button
          type="submit"
          className="submit-observation"
        >
          Record Observation
          <span>→</span>
        </button>

      </form>

    </section>
  );
}

export default FieldObservationForm;