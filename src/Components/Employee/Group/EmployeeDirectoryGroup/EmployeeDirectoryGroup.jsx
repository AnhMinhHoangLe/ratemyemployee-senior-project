import React from 'react';
import { Route } from 'react-router-dom';
import EmployeeGroup from "../EmployeeGroup/EmployeeGroup.Components"
import {connect} from "react-redux"

const EmployeeDirectoryGroup =({ employee }) => {
        return(
                <div>
                        {
                                 employee.map(({id, ...otherProps}) =>
                                        <EmployeeGroup key={id} id={id} {...otherProps} />
                                        
                                )
                        }
                </div>
        )
}
const mapStateToProps = ({employee}) =>({
                employee: employee
})
export default connect(mapStateToProps)(EmployeeDirectoryGroup)
//!Note : neu muon xai state cua redux, phai khai bao mapStateToProps o moi page, chu ko insert vao tag component dc 