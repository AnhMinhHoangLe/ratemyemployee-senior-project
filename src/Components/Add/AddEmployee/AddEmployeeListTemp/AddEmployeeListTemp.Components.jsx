import './AddEmployeeListTemp.styles.scss'
import React, { useState } from "react";
import { connect } from "react-redux";
import { selectEmployeeTempList } from "../../../../Redux/SearchToAddEmployee/search.selectors"
import {addEmployeeToList, removeEmployeeToList, clearAllEmployeeInList} from "../../../../Redux/SearchToAddEmployee/search.actions"
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import EmployeeCard from "../../../Employee/EmployeeCard/EmployeeCard.Component"
import CustomButton from '../../../CustomButton/CustomButton.component';
import { addEmployeeToGroup } from "../../../../Firebase/firebase.utils";
import EmployeeCardTemp from "./EmployeeCardTemp/EmployeeCardTemp.Components"
import { Card, Box, Typography, Avatar } from '@mui/material';

const AddEmployeeListTemp = ({ idGroup, currentUser, employeeListTemp, removeEmployee, clearAllEmployeeInList }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        await addEmployeeToGroup(
            currentUser,
            "group",
            idGroup, 
            employeeListTemp
        )
        await clearAllEmployeeInList(employeeListTemp)
    }
    return (
        <Box >
            {
                employeeListTemp.length !== 0 ? 
                    (
                        <Box sx={{pb:5}}>
                            <Typography component="div" sx={{ borderBottom: 1, lineHeight: 0.1, textAlign:"center"}}>
                                <Typography sx={{position:"absolute", top:"165px", left:"30%", backgroundColor:"#E8EEED", width:"10%"}}>New Employee(s)</Typography>
                            </Typography>
                            <Typography component="div" sx={{ pb:5 }}></Typography>
                            <Box sx={{ display:"flex", flexDirection:"column", gap:2, width:"100%", textAlign:"center"}}>
                                    <Box sx={{display:"flex", justifyContent:"space-evenly", gap:2,  width:"100%", flexWrap: 'wrap'}}>
                                        {employeeListTemp.map(({ id, displayName, avatar, position }, index) => (
                                                        <EmployeeCardTemp key={index} displayName={displayName} avatar={avatar} position={position} index={index} />
                                            ))
                                        }
                                    </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%", justifyContent: "center", pb: 4 }}>
                                        <CustomButton onClick={() => clearAllEmployeeInList(employeeListTemp)} sx={{backgroundColor:"#E0E0E0", color:"#313836"}}>Cancel</CustomButton>
                                        <CustomButton onClick={(event) => handleSubmit(event)}>Add Employee</CustomButton>
                                </Box>
                                
                            </Box>
                            <Typography component="div" sx={{borderBottom: 1, lineHeight: 0.1, textAlign:"center" }}>
                                <Typography sx={{position:"relative", bottom:"-10px", left:"45%", backgroundColor:"#E8EEED", width:"20%"}}>Current Employee(s)</Typography>
                            </Typography>
                        </Box>
                    ) : (
                        <div></div>
                    )
            }
            
        </Box>
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


