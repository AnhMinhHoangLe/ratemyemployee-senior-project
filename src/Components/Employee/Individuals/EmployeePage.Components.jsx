import React from "react";
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import { Route } from "react-router-dom";
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview.Components";
import EmployeeInGroup from "./EmployeeInGroup/EmployeeInGroup.Components";
import EmployeeInfo from "./Employee-info/EmployeeInfo.Components";

const GroupPage = ({ match }) => {
	return (
		// {choice ? (
		<div>
			<Route exact component={EmployeeOverview} path={`${match.path}`} />
			{/* Find the path in App.js */}
			<Route
				exact
				component={EmployeeInGroup}
				path={`${match.path}/:employeeId`}
			/>
			{/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
			<Route
				component={EmployeeInfo}
				path={`${match.path}/:employeeId/:employeeInfoID`}
			/>
			{/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
		</div>
	);
};

export default GroupPage;
