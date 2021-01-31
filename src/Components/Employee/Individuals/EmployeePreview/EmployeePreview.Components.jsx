import React from 'react';
import "./EmployeePreview.Styles.css"
import {withRouter} from "react-router";
const PreviewCollection = ({ id, employee_list, match, history }) =>{
        return(
                <div onClick={() => {history.push(`${match.url}/${id}` )} }>
                        <h1>Group {id} </h1>
                        <div>
                                {
                                         employee_list
                                         .filter((item, idx) => idx < 4)
                                         .map(({id, first_name, last_name, email, avatar}) =>(
                                                <div key={id}>
                                                        {first_name} {last_name} 
                                                </div>
                                        ))
                                }
                        </div>
                </div>
        )
}
export default withRouter(PreviewCollection)