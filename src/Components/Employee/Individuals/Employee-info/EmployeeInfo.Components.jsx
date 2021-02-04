import React from 'react';
import "./EmployeeInfo.Styles.css"
import EmployeeInfoForm from "../../EmployeeInfoForm/EmployeeInfoForm.Components"
import {selectToShowEmployeeInfo} from "../../../../Redux/Individuals/individuals.selectors"
import {selectEmployeeIngroup} from "../../../../Redux/Employee/employee.selectors"
import {connect} from "react-redux"
const EmployeeInfo =  ({individuals, employee,  match}) => {
        const {displayName, email, gender, address, avatar, phone_number } = individuals
        const {employee_list} = employee
        const {rate, position} =   employee_list.find(key => key.id === match.params.employeeInfoID)  
        return(
                <div>
                        {
                                                        <div>
                                                                <EmployeeInfoForm displayName = {displayName}  email={email} gender={gender}  address={address} avatar={avatar} phone_number={phone_number}/>
                                                                <p>Rate: {rate} </p>
                                                                <p>Position: {position}</p> 
                                                        </div>
                        }
                </div>
        )
}

const mapStateToProps = (state, ownProps) => (
        {
               individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(state), 
                employee: selectEmployeeIngroup(ownProps.match.params.employeeId)(state)

        //       employeeInfoID
        }
)
export default connect(mapStateToProps)(EmployeeInfo) 