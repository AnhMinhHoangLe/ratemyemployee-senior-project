import React from 'react';
import "./EmployeePreview.Styles.css"
import {createStructuredSelector} from "reselect"
import {withRouter} from "react-router";
const PreviewCollection = ({ id, employee_list, employeeInfo,  match, history }) =>{
        return(
                <div onClick={() => {history.push(`${match.url}/${id}` )} }>
                        <div>
                                <h1> GROUP {id} </h1>
                                <ul>
                                        {
                                                //  Object.keys(employee_list).map((key) =>( 
                                                //         <div key={employee_list[key].id}>
                                                //                 {employee_list[key].displayName}
                                                //         </div>
                                                // ))
                                                employee_list
                                                .filter((item, idx) => idx < 4)
                                                .map(({id}) =>(
                                                        <li key={id}> {employeeInfo[id].displayName}  </li>
                                                ))
                                        }
                                </ul>
                        </div>
                </div>
        )
}

export default withRouter(PreviewCollection)