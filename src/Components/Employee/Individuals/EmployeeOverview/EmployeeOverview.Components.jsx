import React, {Component} from 'react';
import { connect } from 'react-redux';
import DATA_EMPLOYEE from "../../DATA_EMPLOYEE"

// import {selectEmployeeGroup} from "../../../Redux/Employee/employee.selectors"
// import {createStructuredSelector} from "reselect"
// import EmployeePreview from './EmployeePreview/EmployeePreview.Components'
// import employeeCollections from "../../../Redux/Employee/employee.actions"
class  EmployeeOverview extends Component{
        constructor(){
                super()
                this.state = {
                        employee : DATA_EMPLOYEE
                }
        }
        render() {
                const {employee} = this.state
                return(
                                <div>
                                        {
                                                employee.map(({id}) =>
                                                        <div>{id}</div>
                                                 )
                                        }
                                </div>
                        )
        }

                
        }

// const mapStateToProps = (state) => ({
//   employee : employee
// });

export default EmployeeOverview