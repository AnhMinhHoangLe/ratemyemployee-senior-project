import React from "react";
import SignIn from "./SignInComponent/SignIn.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { Link } from "react-router-dom";
import "./SignInPage.styles.scss";
const SignInPage = () => {
  return (
    <div className="grid grid-cols-2 SignInPage-Component h-screen ">
      <div className="flex flex-col justify-center items-center SignInForm-Section">
        <SignIn />
      </div>
      <div className="switch-register-component flex flex-col justify-center items-center ">
        <span className="mb-20 text-right text-white">
          <h1 className="font-semibold text-4xl	mb-2">Hello, Friend</h1>
          <p className="font-medium text-xl">
            Register your account and start the journey with us!
          </p>
        </span>
        <span>
          <CustomButton>
            <Link to="/su"> Sign Up</Link>
          </CustomButton>
        </span>
      </div>
    </div>
  );
};
export default SignInPage;
