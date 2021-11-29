import React, { useEffect, useState, Suspense, lazy } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import EmployeeOverview from "./EmployeeOverview/EmployeeOverview.Components";
// import EmployeeInGroup from "./EmployeeInGroup/EmployeeInGroup.Components";
// import EmployeeInfo from "./Employee-info/EmployeeInfo.Components";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import { Grid, Box } from "@mui/material";

const EmployeeOverview = lazy(() =>
  import("./EmployeeOverview/EmployeeOverview.Components")
);
const EmployeeInGroup = lazy(() =>
  import("./EmployeeInGroup/EmployeeInGroup.Components")
);
const EmployeeInfo = lazy(() =>
  import("./Employee-info/EmployeeInfo.Components")
);

const GroupPage = ({ match, selectEmployeeInfo }) => {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path={`${match.path}`} component={EmployeeOverview} />
        <Route
          exact
          path={`${match.path}/:groupID`}
          component={EmployeeInGroup}
        />
        <Route
          exact
          path={`${match.path}/:groupID/:employeeInfoID`}
          component={EmployeeInfo}
        />
        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}

        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
      </Suspense>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(GroupPage);
