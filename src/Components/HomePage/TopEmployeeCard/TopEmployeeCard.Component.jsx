import React from "react";
import { connect } from "react-redux";
import { Card, Box, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {
  selectInfoRateInGroup,
} from "../../../Redux/Rate/rate.selectors";
const TopEmployeeCard = ({avatar, displayName, position,idx,  selectInfoRateInGroup }) => {
  return (
        <Card sx={{display: 'flex', flexDirection:"column", textAlign:"center", p:3, gap:2, width:"280px", height:"280px"}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:"space-around"}}>
              <Typography sx={{border: 3, borderColor: "#2AC28C", borderRadius:"100%", p:"1px"}}>
                <Avatar sx={{ width: "80px", height: "80px" }} src={avatar} alt={displayName} />
              </Typography>
              <Box
                sx={{ display: 'flex', border: 1, borderColor: "#E0E0E0", width: 80, height: 80, borderRadius: "10px", alignItems: 'center', justifyContent: "center" }}
              >
                <Typography sx={{ fontSize: "30px" }}> {selectInfoRateInGroup['avg_rating']}</Typography>
                <StarIcon sx={{ color: "#FFBB56", fontSize: "20px", position: "relative", bottom:"2px" }}/>
              </Box>
          </Box>
          <Typography variant="h5" fontSize="20px">{displayName}</Typography>
          <Typography fontSize="16px">{position}</Typography>
      </Card>
  );
};
const mapStateToProps =  (state, ownProps) =>({
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idx)(state),
});
export default connect(mapStateToProps)(TopEmployeeCard);


