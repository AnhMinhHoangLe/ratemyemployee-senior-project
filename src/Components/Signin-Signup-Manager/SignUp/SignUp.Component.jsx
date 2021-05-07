import React, {Component} from 'react';
import FormInput from '../../FormInput/FormInput.Component'
import CustomButton from '../../CustomButton/CustomButton.component';
import {auth, createUserProfileDocument} from '../../../Firebase/firebase.utils'
import "./SignUp.Styles.css"
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
                 <div>
                        <h2 className='title'>I do not have a account</h2>
                        <span>Sign up with your email and password</span>
                        <form onSubmit={this.handleSubmit}>
                                <FormInput  label="Display Name" type="text" name='displayName' handleChange={this.handleChange} value={displayName} required />
                                <FormInput  label="Email" type="email" name="email" handleChange={this.handleChange}  value={email} required/>
                                <FormInput  label="Password" type="password" name='password' handleChange={this.handleChange} value={password} required/>
                                <FormInput  label="Confirm Password" type="password" name='confirmPassword' handleChange={this.handleChange} value={confirmPassword}  required/>
                                <CustomButton type="submit">Sign Up</CustomButton>
                        </form>
                </div> 
        )
        
        }
        
}
export default SignUp