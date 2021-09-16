import React from "react";
import SignUp from "./SignUpComponent/SignUp.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { Link, useHistory } from "react-router-dom";
const SignUpPage = () => {
  return (
    <div>
      <SignUp />
      <CustomButton>
        <Link to="/si"> Sign In</Link>
      </CustomButton>
    </div>
  );
};
export default SignUpPage;
