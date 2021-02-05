import React, {Component} from 'react';
import "./EmployeeOverview.Styles.css"
import { connect } from 'react-redux';
// import DATA_EMPLOYEE from "../../DATA_EMPLOYEE"
import EmployeePreview from "../EmployeePreview/EmployeePreview.Components"
import {createStructuredSelector} from "reselect"
import {selectEmployeeForPreview} from "../../../../Redux/Employee/employee.selectors"
import "./EmployeeOverview.Styles.css"
import {selectEmployeeInfo} from "../../../../Redux/Individuals/individuals.selectors"
import OptionBetweenGroupAndIndividual from "../../OptionBetweenGroupAndIndividual/OptionBetweenGroupAndIndividual.Component"

// import employeeCollections from "../../../Redux/Employee/employee.actions"
const  EmployeeOverview = ({employee, employeeInfo}) =>{
                return(
                                <div>
                                        <OptionBetweenGroupAndIndividual  />

                                        {
                                        // employee.map(({id, ...otherProps}) => ( 
                                        //         <EmployeePreview   key={id} id={id} {...otherProps} />
                                        //         )
                                        // )
                                       employee.map(({id, employee_list,  ...otherProps}) => ( 
                                                        <EmployeePreview   key={id} id={id} employee_list={employee_list} employeeInfo={employeeInfo} {...otherProps} />
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
        employee: selectEmployeeForPreview, 
        employeeInfo: selectEmployeeInfo

        
}
)


export default connect(mapStateToProps)(EmployeeOverview)