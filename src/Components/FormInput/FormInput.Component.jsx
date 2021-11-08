import React from "react";
import TextField from '@mui/material/TextField';

const FormInput = ({handleChange, ...otherProps }) => {
  return (
    <div>
      <TextField onChange={handleChange} {...otherProps} sx={{ borderRadius:"10px", width:"100%"}}/>
    </div>
  );
};
export default FormInput;
