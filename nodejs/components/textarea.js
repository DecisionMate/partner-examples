import React from "react";

const TextArea = ({ label, type, value, onChange }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal is-4 column">
      <label className="label">{label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <p className="control">
          <textarea
            class="textarea"
            placeholder="e.g. Hello world"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        </p>
      </div>
    </div>
  </div>
);

export default TextArea;
