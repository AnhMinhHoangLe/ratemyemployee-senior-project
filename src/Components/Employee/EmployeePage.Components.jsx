import React from 'react';
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import EmployeeOverview from "./Individuals/EmployeeOverview/EmployeeOverview.Components"
import EmployeeInGroup from "./Individuals/EmployeeInGroup/EmployeeInGroup.Components"
import EmployeeInfo from "./Individuals/Employee-info/EmployeeInfo.Components"
import IndividualList from "./Individual/IndividualList/IndividualList"
import IndividualInfoPage from "./Individual/IndividualInfoPage/IndividualInfoPage.Components"
import {Route, Redirect} from "react-router-dom"

import {selectOptionBetweenGroupAndIndividual} from "../../Redux/optionBetweenGroupandIndividual/optionGroupandIndividual.selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"

const GroupPage = ({ match, option}) => 
  
        {
                // console.log(match)
                return(
                        
                        <div>
                { option ? (
                        <div>
                                <Route exact  component={EmployeeOverview}  path={`${match.path}`} />   {/* Find the path in App.js */}
                                <Route exact component={EmployeeInGroup}   path={`${match.path}/:employeeId`} />   {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                                <Route  component={EmployeeInfo}   path={`${match.path}/:employeeId/:employeeInfoID`} />   {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                        </div>
                ) : (
                        <div> 
                                <Route exact  component={IndividualList}  path={`${match.path}`} />   {/* Find the path in App.js */}
                                <Route  component={IndividualInfoPage}   path={`${match.path}/:employeeInfoID`} />   {/* Find the path in App.js. should print out console.log(match.params.employeeId) to know deeply the result */}
                        </div>
                        )
        }
        </div>

                )
}

const mapStateToProps = createStructuredSelector(
        {
                option: selectOptionBetweenGroupAndIndividual
        }
)
export default connect(mapStateToProps)(GroupPage)
