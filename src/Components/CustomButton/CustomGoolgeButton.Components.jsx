import React from "react";
import "./CustomButton.Styles.scss";
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const CustomGoogleButton = ({ children, ...otherProps }) => {
  
  return (
      <IconButton {...otherProps} sx={{border: 1, borderColor: "#313836", '&:hover': { backgroundColor: grey[300] }}} >
            <GoogleIcon sx={{ color: '#313836'}}/>
    </IconButton>
  )
};
export default CustomGoogleButton;
