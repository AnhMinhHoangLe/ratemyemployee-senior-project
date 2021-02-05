import {React, Component} from 'react';
import FormInput from '../../FormInput/FormInput.Component';
import CustomButton from '../../CustomButton/CustomButton.component';
import { auth, signInWithGoogle } from '../../../Firebase/firebase.utils'
import "./SignIn.Styles.css"
class SignIn extends Component {
        constructor(props) {
                super(props);
                this.state={
                        email: '',
                        password: ''
                };
        }
        //submit
        handleSubmit =  event =>{
                event.preventDefault();//stops the default action of an element from happening. 
                const {email, password} = this.state
                try{
                        auth.signInWithEmailAndPassword(email, password) // Create a form that allows existing users to sign in using their email address and password
                        this.setState({
                                email: '',
                                password: ''
                        })//after login, you need to reset the state. Unless the value still stays still
                }
                catch(error){
                         console.error(error)
                }
        }

        //set the value for state
        handleChange = (event) =>{
                const {value, name} =  event.target;
                this.setState({
                        [name] : value 
                })
                } 
        render() {
                const {email, password} = this.state
                 return(
                        <div>
                                <h2>I already have an account</h2>
                                <span>Sign in with your email and password</span>
                                <form onSubmit={this.handleSubmit}>
                                        <FormInput  label="Email" type="email" name="email" handleChange={this.handleChange}  value={email} required />
                                        <FormInput  label="Password" type="password" name='password' handleChange={this.handleChange} value={password} required />
                                        <CustomButton type="submit">Sign In</CustomButton>
                                        <CustomButton onClick={signInWithGoogle} >Sign In With Google</CustomButton>
                                </form>   
                        </div>
                )
        }

}
export default SignIn