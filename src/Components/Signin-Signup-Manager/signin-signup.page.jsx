import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import SignInPage from "./SignIn/SignIn.page";
import SignUpPage from "./SignUp/SignUp.page";
import CustomButton from "../CustomButton/CustomButton.component";
const SignInAndSignUpPage = ({ match }) => {
  const [checkAccountExistence, setCheckAccountExistence] = useState(true);
  return (
    <div>
      {checkAccountExistence ? (
        <div>
          <Route  component={SignInPage} path={`${match.path}/si`} />
          <CustomButton
            onClick={() => {
              setCheckAccountExistence(false);
            }}
          >
            Sign Up
          </CustomButton>
        </div>
      ) : (
        <div>
          <Route path="/su" component={SignUpPage} />
          <CustomButton
            onClick={() => {
              setCheckAccountExistence(true);
            }}
          >
            Sign In
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default SignInAndSignUpPage;
