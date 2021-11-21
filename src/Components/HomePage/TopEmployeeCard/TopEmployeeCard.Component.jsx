import React from "react";
import { connect } from "react-redux";
import { Card, Box, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {
  selectInfoRateInGroup,
} from "../../../Redux/Rate/rate.selectors";
const TopEmployeeCard = ({avatar, displayName, position,idx,  selectInfoRateInGroup }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent:"center",  alignItems: "center", alignContent:"center", p: 3, gap: 2, width: "280px"}}>
              <Typography sx={{border: 3, borderColor: "#2AC28C", borderRadius:"100%", width: "80px", height: "80px"}}>
                <Avatar sx={{ width: "80px", height: "80px" }} src={avatar} alt={displayName} />
              </Typography>
              <Typography variant="h5" fontSize="20px">{displayName}</Typography>
              <Typography fontSize="16px" sx={{color:"#969892" }}>{position}</Typography>
              <Typography sx={{ display:"flex", alignItems:"center"}}>
                <StarIcon sx={{ color:"#FFBB56"}}/>
                          <Typography sx={{ fontSize: "30px", color:"#1DA492" }}> {selectInfoRateInGroup['avg_rating']}</Typography>
              </Typography>
      </Box>
  );
};
const mapStateToProps =  (state, ownProps) =>({
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idx)(state),
});
export default connect(mapStateToProps)(TopEmployeeCard);


