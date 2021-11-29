import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Box, Typography, Avatar } from "@mui/material";
import { selectInfoRateInGroup } from "../../../Redux/Rate/rate.selectors";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { triggerOpenAndCloseRateCard } from "../../../Redux/Option/option.actions";
import { deleteEmployeeInGroup } from "../../../Firebase/firebase.utils";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import { selectEmployeeInfo } from "../../../Redux/Individuals/individuals.selectors";

import { saveIdEmployeePickToRateCard } from "../../../Redux/Individuals/Individuals.actions";
const EmployeeCardInGroup = ({
  dispatch,
  employeeInfo,
  idGroup,
  idEmployee,
  selectInfoRateInGroup,
  match,
  history,
  currentUser,
  saveIdEmployeePickToRateCard,
  triggerOpenAndCloseRateCard,
}) => {
  const delEmpInGroup = (event) => {
    deleteEmployeeInGroup(currentUser, idGroup, idEmployee);
  };
  const onClickRateCardInfo = (e) => {
    saveIdEmployeePickToRateCard(idEmployee);
    triggerOpenAndCloseRateCard(true);
  };
  //in cai employee list ra trc coi phan update cua no co update ko, sau do check den phan employee info
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        p: 3,
        gap: 2,
        width: "280px",
        height: "280px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            border: 3,
            borderColor: "#2AC28C",
            borderRadius: "100%",
            p: "1px",
          }}
        >
          <Avatar
            sx={{ width: "80px", height: "80px" }}
            src={employeeInfo[idEmployee].avatar}
            alt={employeeInfo[idEmployee].displayName}
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            border: 1,
            borderColor: "#E0E0E0",
            width: 80,
            height: 80,
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => onClickRateCardInfo(e)}
        >
          <Typography sx={{ fontSize: "30px" }}>
            {selectInfoRateInGroup["group"][idGroup]["avg_rating"]}
          </Typography>
          <StarIcon
            sx={{
              color: "#FFBB56",
              fontSize: "20px",
              position: "relative",
              bottom: "2px",
            }}
          />
        </Box>
      </Box>
      <Typography variant="h5" fontSize="20px">
        {employeeInfo[idEmployee].displayName}
      </Typography>
      <Typography fontSize="16px">
        {employeeInfo[idEmployee].position}
      </Typography>
      <Typography
        sx={{ color: "#2AC28C" }}
        onClick={() => {
          history.push(`${match.url}/${idEmployee}`);
        }}
      >
        More detail >
      </Typography>
      <DeleteOutlineIcon
        sx={{
          color: "#869892",
          fontSize: "20px",
          position: "relative",
          bottom: "35px",
          left: "257px",
        }}
        onClick={(event) => delEmpInGroup(event)}
      />
    </Card>
  );
};
const mapStateToProps = (state, ownProps) => ({
  currentUser: selectCurrentUser(state),
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idEmployee)(state),
  employeeInfo: selectEmployeeInfo(state),
});
const mapDispatchToProps = (dispatch) => ({
  saveIdEmployeePickToRateCard: (idEmployee) =>
    dispatch(saveIdEmployeePickToRateCard(idEmployee)),
  triggerOpenAndCloseRateCard: (trigger) =>
    dispatch(triggerOpenAndCloseRateCard(trigger)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeCardInGroup));
