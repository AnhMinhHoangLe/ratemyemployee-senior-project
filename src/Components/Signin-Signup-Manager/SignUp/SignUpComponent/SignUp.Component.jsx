import React, {Component} from 'react';
import FormInput from '../../../FormInput/FormInput.Component'
import CustomButton from '../../../CustomButton/CustomButton.component';
import CustomGoogleButton from "../../../CustomButton/CustomGoolgeButton.Components";
import {auth, createUserProfileDocument, signInWithGoogle} from '../../../../Firebase/firebase.utils'
import "./SignUp.Styles.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Typography from '@mui/material/Typography';

class SignUp extends Component {
        constructor(props) {
                super(props);
                this.state={
                        displayName:'',
                        email: '',
                        password: '',
                        confirmPassword: ''
                };
        }

        //submit
        handleSubmit = async event =>{
                event.preventDefault();//stops the default action of an element from happening. 
                const {displayName, email, password, confirmPassword} = this.state
                if(password !== confirmPassword){
                        alert("Passwords do not match!")
                        return
                }
                try{
                        const {user} = await auth.createUserWithEmailAndPassword(email, password)
                        await createUserProfileDocument(user, {displayName})
                        this.setState({
                                displayName: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                        })
                }
                catch(error){
                        console.error(error)
                }

                this.setState({
                        displayName:'',
                        email: '',
                        password: '',
                        confirmPassword: ''
                })
                
        }
        //set the value for state
        handleChange = (event) =>{
                const {value, name} =  event.target;
                this.setState({
                        [name] : value
                })
                } 
        render(){
                const {displayName, email, password, confirmPassword} = this.state
        return(
                <Grid container direction="column" alignItems="center" rowSpacing={5}>
                        <Grid item xs={6} md={8}>
                                <Typography variant="h4" sx={{color:'#1DA492'}}>Create Account</Typography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                                <CustomGoogleButton onClick={signInWithGoogle} />
                        </Grid>
                        <Grid item xs={6} md={8}>
                                <Typography>or use your email for registration:</Typography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                                <form onSubmit={this.handleSubmit}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 3 }}>
                                                <PersonOutlineOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormInput
                                                        defaultValue={displayName}
                                                        id="input-with-sx"
                                                        label="Display Name"
                                                        variant="standard"
                                                        type="email"
                                                        name="email"
                                                        handleChange={this.handleChange}
                                                        required
                                                />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 3 }}>
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
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 3 }}>
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
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 3 }}>
                                                <LockOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                <FormInput
                                                        defaultValue={confirmPassword}
                                                        id="input-with-sx"
                                                        label="Confirm Password"
                                                        variant="standard"
                                                        name="confirmPassword"
                                                        handleChange={this.handleChange}
                                                        required
                                                />
                                        </Box>
                                        <Box sx={{ pt: 3 }}>
                                                <CustomButton type="submit">Sign Up</CustomButton>
                                        </Box>

                                </form>
                        </Grid>
                </Grid> 
        )
        
        }
        
}
export default SignUp