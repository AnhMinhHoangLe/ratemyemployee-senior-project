import React from "react";
import "./CustomButton.Styles.scss";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { teal, grey} from '@mui/material/colors';

const CustomButton = ({ children, ...otherProps }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    textDecoration: grey[50],  
    fontSize: 16,
    borderRadius: 50,
    width: 200, 
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));
  return (
    <ColorButton variant="contained"
      {...otherProps}>
      {children}
    </ColorButton>
  )
};
export default CustomButton;
