import React, { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview.Components";
import EmployeeInGroup from "./EmployeeInGroup/EmployeeInGroup.Components";
import EmployeeInfo from "./Employee-info/EmployeeInfo.Components";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import { fetchEmployeeGroupStartAsync } from "../../../Redux/Individuals/Individuals.actions";
import { Grid, Box } from '@mui/material';
import withSpinner from "../../with-spinner/with-spinner.compoennts";
import {selectIsEmployeeFetching} from "../../../Redux/Employee/employee.selectors";
import {selectIsFetchingEmployeeInfo} from "../../../Redux/Individuals/individuals.selectors"

const EmployeeOverviewWithSpinner = withSpinner(EmployeeOverview)
const EmployeeInGroupWithSpinner = withSpinner(EmployeeInGroup)
const EmployeeInfoWithSpinner = withSpinner(EmployeeInfo)

const GroupPage = ({match, currentUser, selectIsFetchingEmployeeInfo, selectIsEmployeeFetching }) => {
  useEffect(() => {
    fetchEmployeeGroupStartAsync(currentUser.id);
  },[])
    return (
      <Box>
        <Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<EmployeeOverviewWithSpinner
							isLoading={selectIsEmployeeFetching}
							{...props} />)}
				/>
        {/* Find the path in App.js */}
        <Route
					exact
          path={`${match.path}/:groupID`}
					render={(props) => (
						<EmployeeInGroupWithSpinner
							isLoading={selectIsFetchingEmployeeInfo}
							{...props} />)}
				/>
       <Route
					exact
          path={`${match.path}/:groupID/:employeeInfoID`}
					render={(props) => (
						<EmployeeInfoWithSpinner
							isLoading={selectIsFetchingEmployeeInfo}
							{...props} />)}
				/>
        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
        
        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
      </Box>
    );
  
}

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeGroupStartAsync: (currentUserID) =>
    dispatch(fetchEmployeeGroupStartAsync(currentUserID)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectIsEmployeeFetching: selectIsEmployeeFetching,
  selectIsFetchingEmployeeInfo:selectIsFetchingEmployeeInfo
});
export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
