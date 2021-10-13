import React from "react";
import SignIn from "./SignInComponent/SignIn.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { Link } from "react-router-dom";
import "./SignInPage.styles.scss";
import { ReactComponent as Logo } from "../../../Assests/logo/logo.svg";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SignInPage = () => {
  return (
    <Grid container className="SignInPage-Component" columns={2}>
        <Grid item xs={1} sm={1} md={1} className="SignInForm-Section" >
          <Box sx={{ p: 3 }} ><Logo /></Box>
          <Box sx={{mt : 5}}><SignIn /></Box>
        </Grid>
        <Grid xs={1} sm={1} md={1} container alignItems="center" >
              <Grid item xs sx={{p:4}} align="center">
                  <Box align="right" sx={{mt:-10, pb: 10, color: "#fafafa"}}>
                              <Typography variant="h4" sx={{pb: 4}}>Hello, Friend!</Typography>
                              <Typography>
                                      Register your account and start the journey with us!
                              </Typography>
                  </Box>
                  <Link to="/su" style={{color: "#fafafa"}}>
                              <CustomButton sx={{backgroundColor: "#FFFFFF66", borderColor: "#fafafa", border:1, "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" }}}>
                                            Sign Up
                              </CustomButton>
                  </Link>
          </Grid>
    </Grid>
      
      
    </Grid>
  );
};
export default SignInPage;
