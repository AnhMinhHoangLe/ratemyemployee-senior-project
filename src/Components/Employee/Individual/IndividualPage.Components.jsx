import React from "react";
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { firestore } from "../../../Firebase/firebase.utils";
import { convertDataEmployeeSnapShot } from "../../../Firebase/firebase.snapshot";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import { updateEmployee } from "../../../Redux/Individuals/Individuals.actions";
import IndividualList from "./IndividualList/IndividualList";
import IndividualInfoPage from "./IndividualInfoPage/IndividualInfoPage.Components";
class EmployeePage extends React.Component {
	render() {
		const { match } = this.props;
		return (
			<div>
				<Route exact component={IndividualList} path={`${match.path}`} />
				{/* Find the path in App.js */}
				<Route
					component={IndividualInfoPage}
					path={`${match.path}/:employeeInfoID`}
				/>
			</div>
		);
	}
}

export default EmployeePage;
