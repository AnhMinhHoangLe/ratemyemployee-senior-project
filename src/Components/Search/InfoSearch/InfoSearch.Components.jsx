import React from 'react';
import {selectToShowEmployeeInfo} from "../../../Redux/Individuals/individuals.selectors"
import {connect} from "react-redux"
import  EmployeeInfoForm from "../../EmployeeInfoForm/EmployeeInfoForm.Components"
const InfoSearch = ({match, individuals}) =>{
        const {displayName, email, gender, address, avatar, phone_number } = individuals
        return(
                <div>
                        <EmployeeInfoForm displayName = {displayName}  email={email} gender={gender}  address={address} avatar={avatar} phone_number={phone_number} />
                </div>
        )
}
const mapStateToProps = (state, ownProps) =>(
        {
                individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeID)(state), 
        }
)
export default connect(mapStateToProps)(InfoSearch)