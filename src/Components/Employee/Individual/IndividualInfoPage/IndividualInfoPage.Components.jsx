import React, { useState, useEffect } from "react";
import { selectToShowEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import EmployeeInfoForm from "../../../EmployeeInfoForm/EmployeeInfoForm.Components";
import "./IndividualInfoPage.styles.scss";
// import RatingHistoryIndividual from "../../../Rate/Individual/RatingHistoryIndividual/RatingHistoryIndividual.Components";
import { selectWholeDataRate } from "../../../../Redux/Rate/rate.selectors";
import { TotAvg } from "../../../Rate/Rating.Utils";
import RatingOverallHistoryIndividual from "../../../Rate/Individual/RatingOverallHistoryIndividual/RatingOverallHistoryIndividual.Component";
import { Box, Typography, Grid} from "@mui/material"
import RatingOverallDataEmployeeInGroup from "../../../Rate/Group/RatingOverallDataEmployeeInGroup/RatingOverallDataEmployeeInGroup.Component"

const IndividualInfoPage = ({ individuals, match, rateHistory }) => {
  const { displayName, email, gender, address, avatar, phone_number, currentGroupID, position, id } =
    individuals;
  const [overallAvgRate, setOverallAvgRate] = useState(null);
  useEffect(() => {
    const avgRate = TotAvg(rateHistory);
    setOverallAvgRate(avgRate);
  });
  return (
    <Grid container spacing={2} sx={{ p:3 }}>
      <Grid item xs={8} md={8}  sx={{ p:3 }}>
        <EmployeeInfoForm
          displayName={displayName}
          email={email}
          // gender={gender}
          // address={address}
          idEmployee ={id}
          avatar={avatar}
          phone_number={phone_number}
          position={position}
          currentGroupID={currentGroupID}
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", p: 3, gap: 3 }}>
          <Typography variant="h5">Rating History</Typography>

          <RatingOverallDataEmployeeInGroup
                            idEmployee={match.params.employeeInfoID}
          />
        </Box>
      </Grid>

      <Grid item xs={4} md={4}>
      <RatingOverallHistoryIndividual overallAvgRate={overallAvgRate} />

      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(
    state
  ),
  rateHistory: selectWholeDataRate(ownProps.match.params.employeeInfoID)(state),
});
export default connect(mapStateToProps)(IndividualInfoPage);
