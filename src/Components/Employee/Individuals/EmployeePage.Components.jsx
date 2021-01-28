import React, {Component} from 'react';
import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import EmployeePreview from "./EmployeePreview/EmployeePreview.Components"
import {connect} from "react-redux"
const EmployeePage = ({employee}) => 
        // constructor(props) {
        //         super(props);
        //         this.state = {
        //                 individuals: DATA_EMPLOYEE
        //         }
        // }
        {
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
       


const mapStateToProps = ({employee}) =>({
                employee: employee
})
export default connect(mapStateToProps)(EmployeePage)
