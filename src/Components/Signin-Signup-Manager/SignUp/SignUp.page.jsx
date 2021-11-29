import React from "react";
import SignUp from "./SignUpComponent/SignUp.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { Link } from "react-router-dom";
import "./SignUp.styles.scss";
import { ReactComponent as Logo } from "../../../Assests/logo/logo-white.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const SignUpPage = () => {
  return (
    <Grid
      container
      className="SignUpPage-Component"
      columns={2}
      sx={{ opacity: 1 }}
    >
      <Grid
        xs={1}
        sm={1}
        md={1}
        container
        direction="column"
        rowSpacing={9}
        sx={{ p: 3 }}
      >
        <Grid item xs={1 / 2} sm={1 / 2} md={1 / 2} sx={{ p: 3 }}>
          <Logo />
        </Grid>
        <Grid item sx={{ color: "#fafafa" }}>
          <Typography variant="h4" sx={{ pb: 4 }}>
            Welcome back!
          </Typography>
          <Typography>
            To connect with us, please login with your personal info!
          </Typography>
        </Grid>
        <Grid item align="center" xs={1 / 2}>
          <Link to="/" style={{ color: "#fafafa" }}>
            <CustomButton
              sx={{
                backgroundColor: "#FFFFFF66",
                borderColor: "#fafafa",
                border: 1,
                "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
              }}
            >
              Sign In
            </CustomButton>
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} md={1} className="SignUpForm-Section">
        <Box sx={{ mt: 5 }}>
          <SignUp />
        </Box>
      </Grid>
    </Grid>
  );
};
export default SignUpPage;
