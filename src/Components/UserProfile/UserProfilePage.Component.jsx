import React, {useEffect, useState} from "react";
import EmployeeInfoForm from "../EmployeeInfoForm/EmployeeInfoForm.Components";
import { triggerOpenEditUserProfile } from "../../Redux/Option/option.actions";
import { selectOpenUpdateUserProfile } from "../../Redux/Option/option.selectors";

import { connect } from "react-redux";
import { Box, Typography} from "@mui/material"
import { selectCurrentUser } from "../../Redux/User/user.selectors";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo.Component"
import EditUserProfileForm from "./EditUserProfileForm/EditUserProfileForm.Component"
import { selectToShowEmployeeInfo } from "../../Redux/Individuals/individuals.selectors";

const UserProfilePage = ({ match, selectCurrentUser, selectOpenUpdateUserProfile }) => {
  return (
    <Typography component="div">
          <Box sx={{ mt: "5%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <UserProfileInfo idUser={selectCurrentUser.id} />
          </Box>
          {!selectOpenUpdateUserProfile ? ("") :(
        <Box sx={{mt:4,  display: "flex", justifyContent: "center", alignItems: "center", position: "relative", bottom: "590px" }}>
          <EditUserProfileForm idUser={selectCurrentUser.id} />
        </Box>
          )
      }
    </Typography> 
  );
};

const mapStateToProps = (state, ownProps) => ({
  selectCurrentUser: selectCurrentUser(state),
  selectOpenUpdateUserProfile: selectOpenUpdateUserProfile(state),
});

export default connect(mapStateToProps)(UserProfilePage);
