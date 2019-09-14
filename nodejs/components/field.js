import React from "react";

const Field = ({ label, type, value, onChange }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal is-4 column">
      <label className="label">{label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <p className="control">
          <input
            className="input"
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        </p>
      </div>
    </div>
  </div>
);

export default Field;
