import React from 'react';
import "./EmployeePreview.Styles.css"
const PreviewCollection = ({ group, employee_list }) =>{
        return(
                <div>
                        <h1>Group {group} </h1>
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
export default PreviewCollection
