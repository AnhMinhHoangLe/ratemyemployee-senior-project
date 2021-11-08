import React, {useEffect, useState} from "react";
import EmployeeInfoForm from "../../EmployeeInfoForm/EmployeeInfoForm.Components";
import { selectToShowEmployeeInfo } from "../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { Box, Typography, Card, CardContent, Avatar} from "@mui/material"
import CustomButton from "../../CustomButton/CustomButton.component";
import EditUserProfileForm from "../EditUserProfileForm/EditUserProfileForm.Component"
import { triggerOpenEditUserProfile } from "../../../Redux/Option/option.actions";

const UserProfileInfo = ({ idUser, individuals, dispatch }) => {
  const { displayName, email, gender, address, avatar, phone_number, position, id } =
    individuals;
    return (
        <Box sx={{width:"50%", display:"flex", flexDirection:"column", justifyContent: "center", flexWrap: 'wrap', p:3}}>
        <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", flexWrap: 'wrap', border: 1, borderRadius: "10px", p: 4 }}>
                        <Typography sx={{display:"flex", justifyContent: "center"}}><Avatar alt={displayName} src={avatar} sx={{ height: "100px", width: "100px", border:3 , borderColor:"#1DA492"}} /></Typography>
                        <Typography variant="h4" sx={{ textAlign: "center" }}>{displayName}</Typography>
                        <Typography  variant="h6" sx={{ textAlign: "center" }}>{position}</Typography>
                        <Typography sx={{color:"#1DA492"}}>ID#</Typography>
                        <Typography sx={{borderBottom:1}}>{id}</Typography>
                        <Typography sx={{pt:2, color:"#1DA492"}}>Email</Typography>
                        <Typography sx={{borderBottom:1}}>{email}</Typography>
                        <Typography sx={{pt:2, color:"#1DA492"}}>Phone number</Typography>
                        <Typography sx={{borderBottom:1}}>{phone_number}</Typography>
                        <Typography sx={{ pt: 2, color: "#1DA492" }}>Gender</Typography>
                        <Typography sx={{borderBottom:1}}>{gender}</Typography>
                        <Typography sx={{pt:2, color:"#1DA492"}}>Address</Typography>
                        <Typography sx={{ borderBottom: 1 }}>{ address }</Typography>
                        <Typography sx={{ pt: 2, display: "flex", justifyContent: "flex-end" }}>
            <CustomButton sx={{ selfItems: "right", backgroundColor: "#FFFFFF", border: 1, color: "#1DA492" }} onClick={() => dispatch(triggerOpenEditUserProfile(true))}>Update Profile</CustomButton></Typography>
        </Card>
      </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  individuals: selectToShowEmployeeInfo(ownProps.idUser)(
    state
  ),
});
export default connect(mapStateToProps)(UserProfileInfo);
