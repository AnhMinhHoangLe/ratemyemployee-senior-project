import React from 'react';
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview.Components"
import EmployeeInGroup from "./EmployeeInGroup/EmployeeInGroup.Components"
import EmployeeInfo from "./Employee-info/EmployeeInfo.Components"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {selectEmployee} from "../../../Redux/Employee/employee.selectors"
import {Route} from "react-router-dom"
const EmployeePage = ({employee, match}) => 
        // constructor(props) {
        //         super(props);
        //         this.state = {
        //                 individuals: DATA_EMPLOYEE
        //         }
        // }
        {
                console.log(match)
                return(
                        
                        <div>
                                <Route exact  component={EmployeeOverview}  path={`${match.path}`} />   {/* Find the path in App.js */}
                                <Route exact component={EmployeeInGroup}   path={`${match.path}/:employeeId`} />   {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                                <Route  component={EmployeeInfo}   path={`${match.path}/:employeeId/:employeeInfoID`} />   {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                                
                        </div>
                )
        }

const mapStateToProps = createStructuredSelector(
        {
                employee: selectEmployee
        }
)
export default connect(mapStateToProps)(EmployeePage)
