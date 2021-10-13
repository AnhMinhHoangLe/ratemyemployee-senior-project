import { React, Component } from "react";
import FormInput from "../../../FormInput/FormInput.Component";
import CustomButton from "../../../CustomButton/CustomButton.component";
import CustomGoogleButton from "../../../CustomButton/CustomGoolgeButton.Components";

import { auth, signInWithGoogle } from "../../../../Firebase/firebase.utils";
import "./SignIn.Styles.scss";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  //submit
  handleSubmit = (event) => {
    event.preventDefault(); //stops the default action of an element from happening.
    const { email, password } = this.state;
    try {
      auth.signInWithEmailAndPassword(email, password); // Create a form that allows existing users to sign in using their email address and password
      this.setState({
        email: "",
        password: "",
      }); //after login, you need to reset the state. Unless the value still stays still
    } catch (error) {
      console.error(error);
    }
  };

  //set the value for state
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      console.log([name], value)
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Grid
      container
      direction="column"
      alignItems="center"
      rowSpacing={4}
      >
        <Grid item xs={6} md={8}>
          <Typography  variant="h4" sx={{color:'#1DA492'}}>Sign in to EMA</Typography>
        </Grid>

        <Grid item xs={6} md={8}>
          <CustomGoogleButton
                onClick={signInWithGoogle}
                />
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography>or use email account</Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <form onSubmit={this.handleSubmit}>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 5}}>
                <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormInput
                      defaultValue={email}
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      type="email"
                      name="email"
                      handleChange={this.handleChange}
                      required
                />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 5 }}>
                      <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormInput
                        defaultValue={password}
                        id="input-with-sx"
                        label="Password"
                        variant="standard"
                        type="password"
                        name="password"
                        handleChange={this.handleChange}
                        required
                      />
                </Box>
            
                <Box sx={{pt:3}}>
                <CustomButton type="submit">
                      Sign In
                </CustomButton>
                </Box>
              </Box>
              </form>
        </Grid>
      </Grid>
    );
  }
}
export default SignIn;
