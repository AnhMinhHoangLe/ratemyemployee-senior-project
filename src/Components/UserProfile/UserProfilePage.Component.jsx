import React, {useEffect, useState} from "react";
import EmployeeInfoForm from "../EmployeeInfoForm/EmployeeInfoForm.Components";
import { selectToShowEmployeeInfo } from "../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { Box } from "@mui/material"
import { selectCurrentUser } from "../../Redux/User/user.selectors";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo.Component"
const UserProfilePage = ({ match, selectCurrentUser }) => {
  return (
    <Box sx={{mt:"5%", display:"flex", justifyContent: "center", alignItems: "center",}}>
          <UserProfileInfo idUser={selectCurrentUser.id}/>
    </Box>
     
  );
};

const mapStateToProps = (state, ownProps) => ({
  selectCurrentUser:selectCurrentUser(state), 
});
export default connect(mapStateToProps)(UserProfilePage);
