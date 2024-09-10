import React from "react";

export default function InputFiel({ handleChange, value, title, name }) {
  return (
    <label className="sidebar-label-container">
      <input
        type="radio"
        onChange={handleChange}
        value={value}
        title={title}
        name={name}
      />
      <span className="ml-3 checkmark">{title}</span>
    </label>
  );
}
