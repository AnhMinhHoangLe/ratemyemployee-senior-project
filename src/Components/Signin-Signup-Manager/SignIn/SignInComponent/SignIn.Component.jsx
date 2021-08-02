import { React, Component } from "react";
import FormInput from "../../../FormInput/FormInput.Component";
import CustomButton from "../../../CustomButton/CustomButton.component";
import { auth, signInWithGoogle } from "../../../../Firebase/firebase.utils";
import "./SignIn.Styles.scss";
import { ReactComponent as Google } from "../../../../Assests/SignIn_Register/google-button/google.svg";
import { ReactComponent as Password } from "../../../../Assests/SignIn_Register/Email-Password/password.svg";
import { ReactComponent as Email } from "../../../../Assests/SignIn_Register/Email-Password/email.svg";

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
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="flex flex-col items-center sign-in-component">
        <h1 className="pb-10">Sign in to EMA</h1>
        <CustomButton
          onClick={signInWithGoogle}
          className="rounded-full focus:outline-none focus:border-transparent"
        >
          <Google className="w-8 h-8 google-svg" />
        </CustomButton>
        <form onSubmit={this.handleSubmit}>
          <div className="relative right-6 p-2 w-60">
            <p>Email</p>
            <FormInput
              type="email"
              name="email"
              handleChange={this.handleChange}
              value={email}
              required
              className="border-2 h-10 w-72 pr-3 pl-10 rounded-full outline-none"
            />
            <Email className="relative left-3 bottom-7 w-4 h-4" />
          </div>
          <div className="relative right-6 p-2 w-60">
            <p>Password</p>
            <FormInput
              type="password"
              name="password"
              handleChange={this.handleChange}
              value={password}
              required
              className="border-2 h-10 w-72 pr-3 pl-10 rounded-full outline-none"
            />
            <Password className="relative left-3 bottom-7 w-4 h-4" />
          </div>

          <CustomButton
            className="rounded-full xl:h-10 w-36 h-8 text-center relative  mt-2 sm:left-12 custom-button "
            type="submit"
          >
            Sign In
          </CustomButton>
        </form>
      </div>
    );
  }
}
export default SignIn;
