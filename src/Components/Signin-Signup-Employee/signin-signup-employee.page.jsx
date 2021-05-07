import React from "react";
import SignInEmployee from "./SignInEmployee/SignInEmployee.Component";
import SignUpEmployee from "./SignUpEmployee/SignUpEmployee.Component";

const signInAndSignUpEmployeePage = () => {
	return (
		<div>
			<SignInEmployee />
			<SignUpEmployee />
		</div>
	);
};

export default signInAndSignUpEmployeePage;
