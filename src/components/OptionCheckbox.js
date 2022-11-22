import React from "react";

function OptionCheckbox() {
  return (
    <label>
      <input type="checkbox" name="option" />
      {opt.name}
    </label>
  );
}

export default OptionCheckbox;
