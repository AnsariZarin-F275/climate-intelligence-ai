import React, { useState } from "react";

function FieldObservationForm({
  selectedRegion,
  onSubmit,
}) {
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

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
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
        "Heat Index is required.";
    } else if (isNaN(Number(formData.heatIndex))) {
      newErrors.heatIndex =
        "Heat Index must be numerical.";
    }

    if (!formData.remark.trim()) {
      newErrors.remark =
        "Officer remark is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);

    setFormData({
      region: selectedRegion,
      observationType: "",
      temperature: "",
      heatIndex: "",
      remark: "",
    });

    setErrors({});
  };

  return (
    <form
      className="field-observation-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">

        <div className="form-field">
          <label>Region</label>

          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">Select region</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Nagpur">Nagpur</option>
          </select>

          {errors.region && (
            <span className="field-error">
              {errors.region}
            </span>
          )}
        </div>

        <div className="form-field">
          <label>Observation Type</label>

          <select
            name="observationType"
            value={formData.observationType}
            onChange={handleChange}
          >
            <option value="">
              Select observation
            </option>
            <option value="Temperature Check">
              Temperature Check
            </option>
            <option value="Heat Stress">
              Heat Stress
            </option>
            <option value="Public Condition">
              Public Condition
            </option>
            <option value="Infrastructure">
              Infrastructure
            </option>
          </select>

          {errors.observationType && (
            <span className="field-error">
              {errors.observationType}
            </span>
          )}
        </div>

        <div className="form-field">
          <label>Observed Temperature</label>

          <div className="input-with-unit">
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="e.g. 42"
            />
            <span>°C</span>
          </div>

          {errors.temperature && (
            <span className="field-error">
              {errors.temperature}
            </span>
          )}
        </div>

        <div className="form-field">
          <label>Observed Heat Index</label>

          <div className="input-with-unit">
            <input
              type="number"
              name="heatIndex"
              value={formData.heatIndex}
              onChange={handleChange}
              placeholder="e.g. 45"
            />
            <span>°C</span>
          </div>

          {errors.heatIndex && (
            <span className="field-error">
              {errors.heatIndex}
            </span>
          )}
        </div>

      </div>

      <div className="form-field">
        <label>Officer Remark</label>

        <textarea
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          placeholder="Enter field observations or additional remarks..."
          rows="4"
        />

        {errors.remark && (
          <span className="field-error">
            {errors.remark}
          </span>
        )}
      </div>

      <button
        className="submit-observation"
        type="submit"
      >
        <span>＋</span>
        Record Field Observation
      </button>
    </form>
  );
}

export default FieldObservationForm;