import React from 'react';
import "./EmployeePreview.Styles.css"
import {withRouter} from "react-router";
const PreviewCollection = ({ id, employee_list, match, history }) =>{
        return(
                <div onClick={() => {history.push(`${match.url}/${id}` )} }>
                        <h1>Group {id} </h1>
                        <div>
                                {
                                        //  Object.keys(employee_list).map((key) =>( 
                                        //         <div key={employee_list[key].id}>
                                        //                 {employee_list[key].displayName}
                                        //         </div>
                                        // ))
                                        employee_list
                                         .filter((item, idx) => idx < 4)
                                         .map(({id, displayName, email, avatar}) =>(
                                                <div key={id}>
                                                        {displayName} 
                                                </div>
                                        ))
                                }
                        </div>
                </div>
        )
}
export default withRouter(PreviewCollection)