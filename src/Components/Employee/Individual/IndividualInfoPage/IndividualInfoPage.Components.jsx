import React, { useState, useEffect } from "react";
import { selectToShowEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import EmployeeInfoForm from "../../../EmployeeInfoForm/EmployeeInfoForm.Components";
import "./IndividualInfoPage.styles.scss";
import RatingHistoryIndividual from "../../../Rate/Individual/RatingHistoryIndividual/RatingHistoryIndividual.Components";
import { selectWholeDataRate } from "../../../../Redux/Rate/rate.selectors";
import { TotAvg } from "../../../Rate/Rating.Utils";
import RatingOverallHistoryIndividual from "../../../Rate/Individual/RatingOverallHistoryIndividual/RatingOverallHistoryIndividual.Component";
const IndividualInfoPage = ({ individuals, match, rateHistory }) => {
  const {
    displayName,
    email,

    // gender,
    avatar,
    position,
    phone_number,
    // address,
  } = individuals;
  const [overallAvgRate, setOverallAvgRate] = useState(null);
  useEffect(() => {
    const avgRate = TotAvg(rateHistory);
    setOverallAvgRate(avgRate);
  });
  return (
    <div className="grid grid-rows-2 grid-col-2 gap-4 individualInfo-component">
      <span className="col-span-1 border-8">
        <EmployeeInfoForm
          displayName={displayName}
          email={email}
          // gender={gender}
          // address={address}
          avatar={avatar}
          position={position}
          phone_number={phone_number}
        />
      </span>
      <span className="col-span-1 border-8">
        <RatingOverallHistoryIndividual overallAvgRate={overallAvgRate} />
      </span>
      <span className="col-span-2 border-8">
        <RatingHistoryIndividual employeeInfoID={match.params.employeeInfoID} />
      </span>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(
    state
  ),
  rateHistory: selectWholeDataRate(ownProps.match.params.employeeInfoID)(state),
});
export default connect(mapStateToProps)(IndividualInfoPage);
