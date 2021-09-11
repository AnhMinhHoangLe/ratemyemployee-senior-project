import './AddEmployeeListTemp.styles.scss'
import React, { useState } from "react";
import { connect } from "react-redux";
import { selectEmployeeTempList } from "../../../../Redux/SearchToAddEmployee/search.selectors"
import {addEmployeeToList, removeEmployeeToList, clearAllEmployeeInList} from "../../../../Redux/SearchToAddEmployee/search.actions"
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";

import EmployeeCard from "../../../Employee/EmployeeCard/EmployeeCard.Component"
import CustomButton from '../../../CustomButton/CustomButton.component';
import { addEmployeeToGroup } from "../../../../Firebase/firebase.utils";

const AddEmployeeListTemp = ({ idGroup, currentUser, employeeListTemp, removeEmployee, clearAllEmployeeInList }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        addEmployeeToGroup(
            currentUser,
            "group",
            idGroup, 
            employeeListTemp
        )
        clearAllEmployeeInList(employeeListTemp)
    }
    console.log("employeeListTemp", employeeListTemp, idGroup)

    return (
        <div >
            {
                employeeListTemp.length !== 0 ? 
                    (
                        <div className="flex flex-col justify-center gap-8">
                            
                                <span className="flex gap-8 justify-center">
                                    {employeeListTemp.map(({ id, displayName, avatar, position }, index) => (
                                            <div className="shadow-lg rounded-xl p-8 flex flex-col bg-green-500 gap-3 " key={index}>
                                                    <EmployeeCard displayName={displayName} avatar={avatar} position={position} />
                                                    <CustomButton onClick={() => (removeEmployee(employeeListTemp[index]))}>x</CustomButton>
                                            </div>
                                        ))
                                    }
                                </span>

                                <span className="flex gap-2">
                                    <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                                    <CustomButton onClick={() => clearAllEmployeeInList(employeeListTemp)}>Clear</CustomButton>
                                </span>


                            <span>
                                <br/>
                                <hr />
                                <br/>
                            </span>
                        </div>
                    ) : (
                        <div></div>
                )
            }
              
        </div>
    )
}
// //ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state) => ({
    employeeListTemp: selectEmployeeTempList(state),
    currentUser: selectCurrentUser(state),
  });
  const mapDispatchToProps = (dispatch) => ({
      addEmployee: (employeeListInGroupTemp) => dispatch(addEmployeeToList(employeeListInGroupTemp)),
      removeEmployee: (employeeListInGroupTemp) => dispatch(removeEmployeeToList(employeeListInGroupTemp)),
      clearAllEmployeeInList:(employeeListInGroupTemp) => dispatch(clearAllEmployeeInList(employeeListInGroupTemp))
})
  export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeListTemp);


