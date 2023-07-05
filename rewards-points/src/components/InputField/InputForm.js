import React, { useState } from "react";

const InputForm = ({ handleInputSubmit }) => {
  const [monthValue, setMonthValue] = useState("");

  const handleChange = (e) => {
    setMonthValue(e.target.value);
  };
  return (
    <div className="form-input">
      <form onSubmit={(e) => handleInputSubmit(e, monthValue, setMonthValue)}>
        <label className="login-label">Enter month to check Points:</label>
        <input
          type="text"
          className="login-input"
          placeholder="Oct/Nov/Dec"
          value={monthValue}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default InputForm;
