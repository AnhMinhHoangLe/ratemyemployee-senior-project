import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Box, Typography, Avatar } from '@mui/material';
import {
  selectRateInfo,
  selectInfoRateInGroup,
} from "../../../Redux/Rate/rate.selectors";
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { triggerOpenAndCloseRateCard } from "../../../Redux/Option/option.actions";
import { deleteEmployeeInGroup } from "../../../Firebase/firebase.utils"
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import {saveIdEmployeePickToRateCard} from "../../../Redux/Individuals/Individuals.actions"
const EmployeeCardInGroup = ({ dispatch, avatar, displayName, position, idGroup, idEmployee, selectInfoRateInGroup, match, history,currentUser, saveIdEmployeePickToRateCard, triggerOpenAndCloseRateCard}) => {
    const delEmpInGroup = (idEmployee, idGroup) => {
        deleteEmployeeInGroup(currentUser, idEmployee, idGroup)
      }
    const onClickRateCardInfo = (e) => {
        saveIdEmployeePickToRateCard(idEmployee)
        triggerOpenAndCloseRateCard(true);
  };
  return (
    <Card sx={{display: 'flex', flexDirection:"column", textAlign:"center", p:3, gap:2, width:"280px", height:"280px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:"space-around"}}>
          <Typography sx={{border: 3, borderColor: "#2AC28C", borderRadius:"100%", p:"1px"}}>
            <Avatar sx={{ width: "80px", height: "80px" }} src={avatar} alt={displayName} />
          </Typography>
          <Box
            sx={{ display: 'flex', border: 1, borderColor: "#E0E0E0", width: 80, height: 80, borderRadius: "10px", alignItems: 'center', justifyContent: "center" }}
            onClick={(e) => onClickRateCardInfo(e)}
          >
            <Typography sx={{ fontSize: "30px" }}>{selectInfoRateInGroup['group'][idGroup]['avg_rating']}</Typography>
            <StarIcon sx={{ color: "#FFBB56", fontSize: "20px", position: "relative", bottom:"2px" }}/>
          </Box>
      </Box>
      <Typography variant="h5" fontSize="20px">{displayName}</Typography>
      <Typography fontSize="16px">{position}</Typography>
          <Typography sx={{ color: "#2AC28C" }} onClick={() => { history.push(`${match.url}/${idEmployee}`); }}>More detail ></Typography>
          <DeleteOutlineIcon sx={{ color: "#869892", fontSize: "20px", position:'relative', bottom:"35px", left:"257px"}} onClick={() => delEmpInGroup(idGroup,idEmployee)} />
    </Card>
  );
};
const mapStateToProps = (state, ownProps) => ({
    currentUser: selectCurrentUser(state),
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idEmployee)(state),
});
const mapDispatchToProps = (dispatch) => ({
    saveIdEmployeePickToRateCard: (idEmployee) => dispatch(saveIdEmployeePickToRateCard(idEmployee)), 
    triggerOpenAndCloseRateCard:(trigger) => dispatch(triggerOpenAndCloseRateCard(trigger))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmployeeCardInGroup));