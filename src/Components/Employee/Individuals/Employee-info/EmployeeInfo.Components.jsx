import React from 'react';
import "./EmployeeInfo.Styles.css"
// import {showEmployeeInfo} from "../../../../Redux/Individuals/individuals.selectors"
import {selectEmployeeIngroup} from "../../../../Redux/Employee/employee.selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"
const EmployeeInfo =  ({employeeInfo, match}) => {
        const {employee_list, id} = employeeInfo

        return(
                <div>
                        {
                                employee_list.filter(key => key.id === match.params.employeeInfoID)
                                        .map(({id, displayName, email, gender, address, avatar, phone_number} )=> (
                                                        <div key={id} >
                                                                <h1>{displayName}</h1>
                                                                <p>Email: {email}</p>
                                                                <p>Gender: {gender}</p>
                                                                <p>Address: {address}</p>
                                                                <img src={avatar} />
                                                                <p>Phone Number: {phone_number}</p>
                                                        </div>
                                                ))
                        }
                </div>
        )
}

const mapStateToProps = (state, ownProps) => (
        {
              employeeInfo: selectEmployeeIngroup(ownProps.match.params.employeeId)(state)
        //       employeeInfoID
        }
)
export default connect(mapStateToProps)(EmployeeInfo) 