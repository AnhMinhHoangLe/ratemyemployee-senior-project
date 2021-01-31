import React from 'react';
import "./EmployeeInfo.Styles.css"
import {showEmployeeInfo} from "../../../../Redux/Individuals/individuals.selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"
const EmployeeInfo =  ({employeeInfo}) => {
        const {group,first_name, last_name, email, gender, address, avatar, phone_number} = employeeInfo

        return(
                <div>
                        <h1>{first_name} {last_name}</h1>
                        <p>Group: {group}</p>
                        <p>Email: {email}</p>
                        <p>Gender: {gender}</p>
                        <p>Address: {address}</p>
                        <img src={avatar} />
                        <p>Phone Number: {phone_number}</p>
                </div>
        )
}

const mapStateToProps = (state, ownProps) =>(
        {
              employeeInfo: showEmployeeInfo(ownProps.match.params.employeeInfoID)(state)
        }
)
export default connect(mapStateToProps)(EmployeeInfo) 