import React, {Component} from 'react';
import "./EmployeeOverview.Styles.css"
import { connect } from 'react-redux';
// import DATA_EMPLOYEE from "../../DATA_EMPLOYEE"
import EmployeePreview from "../EmployeePreview/EmployeePreview.Components"
import {createStructuredSelector} from "reselect"
import {selectEmployeeForPreview} from "../../../../Redux/Employee/employee.selectors"
import "./EmployeeOverview.Styles.css"
// import employeeCollections from "../../../Redux/Employee/employee.actions"
const  EmployeeOverview = ({employee}) =>{
                return(
                                <div>
                                        {
                                        employee.map(({id, ...otherProps}) => ( 
                                                <EmployeePreview   key={id} id={id} {...otherProps} />
                                                )
                                        )
                                }
                                </div>
                        )  
        }

// const mapStateToProps = ({employee}) =>({
//                 employee: employee
// })
const mapStateToProps = createStructuredSelector(
{
        employee: selectEmployeeForPreview
}
)


export default connect(mapStateToProps)(EmployeeOverview)