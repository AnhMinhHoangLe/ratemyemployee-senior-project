import React from "react";
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import { Route } from "react-router-dom";
import { selectOptionBetweenGroupAndIndividual } from "../../Redux/optionBetweenGroupandIndividual/optionGroupandIndividual.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    firestore,
    convertDataGroupSnapShot,
    convertDataEmployeeSnapShot,
} from "../../Firebase/firebase.utils";
import { selectCurrentUser } from "../../Redux/User/user.selectors";
import { updateGroup } from "../../Redux/Employee/employee.actions";
import { updateEmployee } from "../../Redux/Individuals/Individuals.actions";

import EmployeeOverview from "./Individuals/EmployeeOverview/EmployeeOverview.Components";
import EmployeeInGroup from "./Individuals/EmployeeInGroup/EmployeeInGroup.Components";
import EmployeeInfo from "./Individuals/Employee-info/EmployeeInfo.Components";

import IndividualList from "./Individual/IndividualList/IndividualList";
import IndividualInfoPage from "./Individual/IndividualInfoPage/IndividualInfoPage.Components";

class GroupPage extends React.Component {
    unsubscribeEmployeeFromSnapshot = null;
    unsubscribeGroupFromSnapshot = null;

    componentDidMount() {
        const { currentUser, updateEmployee, updateGroup } = this.props;
        const employeeRef = firestore
            .doc(`users/${currentUser.id}`)
            .collection("employee");

        this.unsubscribeEmployeeFromSnapshot = employeeRef.onSnapshot(
            async (snapshot) => {
                const employeeMap = convertDataEmployeeSnapShot(snapshot);
                updateEmployee(employeeMap);
            }
        );

        const groupRef = firestore
            .doc(`users/${currentUser.id}`)
            .collection("group"); // to make the link for lead to the database

        //on Snapshot is like a summary of data
        this.unsubscribeGroupFromSnapshot = groupRef.onSnapshot(
            //listening for any changes in this collection.
            async (snapshot) => {
                const groupMap = convertDataGroupSnapShot(snapshot);
                console.log("groupMap", groupMap);
                updateGroup(groupMap);
            }
        );
    }
    render() {
        const { choice, match } = this.props;

        return (
            <div>
                {choice ? (
                    <div>
                        <Route
                            exact
                            component={EmployeeOverview}
                            path={`${match.path}`}
                        />{" "}
                        {/* Find the path in App.js */}
                        <Route
                            exact
                            component={EmployeeInGroup}
                            path={`${match.path}/:employeeId`}
                        />{" "}
                        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                        <Route
                            component={EmployeeInfo}
                            path={`${match.path}/:employeeId/:employeeInfoID`}
                        />{" "}
                        {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                    </div>
                ) : (
                    <div>
                        <Route
                            exact
                            component={IndividualList}
                            path={`${match.path}`}
                        />{" "}
                        {/* Find the path in App.js */}
                        <Route
                            component={IndividualInfoPage}
                            path={`${match.path}/:employeeInfoID`}
                        />
                    </div>
                )}
            </div>
        );
    }
}

//!NOTE: tomorrow move the mapDispatchToProps to each section group and individual page and try again to fox bug
const mapDispatchToProps = (dispatch) => ({
    updateEmployee: (employeeMap) => dispatch(updateEmployee(employeeMap)),
    updateGroup: (groupMap) => dispatch(updateGroup(groupMap)),
});
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    choice: selectOptionBetweenGroupAndIndividual,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
