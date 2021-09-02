import React, {useEffect} from "react";
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import IndividualList from "./IndividualList/IndividualList";
import IndividualInfoPage from "./IndividualInfoPage/IndividualInfoPage.Components";
import { fetchEmployeeGroupStartAsync } from "../../../Redux/Individuals/Individuals.actions";
const EmployeePage = ({ match, fetchEmployeeGroupStartAsync, currentUser }) => {
		useEffect(() => {
			fetchEmployeeGroupStartAsync(currentUser.id);
		})
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

const mapDispatchToProps = (dispatch) => ({
		fetchEmployeeGroupStartAsync: (currentUserID) =>
		  dispatch(fetchEmployeeGroupStartAsync(currentUserID)),
	  });
const mapStateToProps = createStructuredSelector({
		currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
