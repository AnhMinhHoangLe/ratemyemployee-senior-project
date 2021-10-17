import React, {useEffect} from "react";
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import IndividualList from "./IndividualList/IndividualList";
import IndividualInfoPage from "./IndividualInfoPage/IndividualInfoPage.Components";
import { fetchEmployeeGroupStartAsync } from "../../../Redux/Individuals/Individuals.actions";
import withSpinner from "../../with-spinner/with-spinner.compoennts";
import {selectIsFetchingEmployeeInfo} from "../../../Redux/Individuals/individuals.selectors"
const IndividualListWithSpinner = withSpinner(IndividualList)
const IndividualInfoPageWithSpinner = withSpinner(IndividualInfoPage)
const EmployeePage = ({ match, selectIsFetchingEmployeeInfo }) => {
		// useEffect(() => {
		// 	fetchEmployeeGroupStartAsync(currentUser.id);
		// })
		return (
			<div>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<IndividualListWithSpinner
							isLoading={selectIsFetchingEmployeeInfo}
							{...props} />)}
				/>
				<Route
					exact
					path={`${match.path}/:employeeInfoID`}
					render={(props) => (
						<IndividualInfoPageWithSpinner
							isLoading={selectIsFetchingEmployeeInfo}
							{...props} />)}
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
	selectIsFetchingEmployeeInfo:selectIsFetchingEmployeeInfo
});
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
