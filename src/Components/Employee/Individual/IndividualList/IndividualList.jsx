import React from "react";
import { selectListEmployee } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import AddNewIndividualEmployee from "../../../Add/AddEmployee/AddIndividualEmployee/AddIndividualEmployee.Components"
import EmployeeCard from "../../EmployeeCard/EmployeeCard.Component";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import AddNewEmployeeInGroupByInput from "../../../Add/AddEmployee/AddEmployeeIntoGroup/AddNewEmployeeInGroupByInput.Components"
import { Box, Typography,Card, Grid, Paper} from "@mui/material"

const IndividualList = ({individuals, match, history, currentUser}) => {
  // const deleteEmployee = (currentUser, currentGroupID, id) =>{
  //   deleteIndividualEmployee(currentUser, currentGroupID, id)
  //   console.log("hello")
  // }
    return (
      <Box sx={{display: 'flex', flexDirection:"row", justifyContent:"space-evenly", flexWrap: 'wrap', p:3}} >
          <Box sx={{display:"flex", flexDirection:"column",  flexWrap: 'wrap', gap:3}}>
              <Typography>Employees</Typography>
              <Box sx={{display:"flex", justifyContent:"space-evenly",  flexWrap: 'wrap', gap:2, mr:2}}>
              {
              individuals ? (
                individuals.map(({ displayName, avatar, position, id, currentGroupID, admin  }, index) => (
                        <EmployeeCard key={index} avatar={avatar} displayName={displayName} position={position} admin={admin} currentGroupID={currentGroupID} idx={id}/>
                ))
              ) : (
                  <Box></Box>
                )
              }
            </Box>
          </Box>
          
          <Box>
            <AddNewIndividualEmployee />
          </Box>

      </Box>
    );
  }


const mapStateToProps = createStructuredSelector({
  individuals: selectListEmployee,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(IndividualList);
