import React, { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview.Components";
import EmployeeInGroup from "./EmployeeInGroup/EmployeeInGroup.Components";
import EmployeeInfo from "./Employee-info/EmployeeInfo.Components";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import { fetchEmployeeGroupStartAsync } from "../../../Redux/Individuals/Individuals.actions";
import {Grid, Box} from '@mui/material';

const GroupPage = ({match, currentUser, fetchEmployeeGroupStartAsync}) => {
  // useEffect(() => {
  //   fetchEmployeeGroupStartAsync(currentUser.id);
  // },[])
    return (
      <Box>
        <Route exact component={EmployeeOverview} path={`${match.path}`} />
        {/* Find the path in App.js */}
        <Route
          exact
          component={EmployeeInGroup}
          path={`${match.path}/:groupID`}
        />
        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
        <Route
          component={EmployeeInfo}
          path={`${match.path}/:groupID/:employeeInfoID`}
        />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
