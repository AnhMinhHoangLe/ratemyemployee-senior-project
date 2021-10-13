import React from "react";
import "./FormInput.Styles.scss";
import TextField from '@mui/material/TextField';

const FormInput = ({handleChange, ...otherProps }) => {
  return (
    <div>
      <TextField onChange={handleChange} {...otherProps} />
    </div>
  );
};
export default FormInput;
