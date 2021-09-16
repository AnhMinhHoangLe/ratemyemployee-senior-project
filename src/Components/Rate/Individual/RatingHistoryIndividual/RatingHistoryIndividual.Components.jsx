import React from "react";
import { connect } from "react-redux";
import { selectWholeDataRate } from "../../../../Redux/Rate/rate.selectors";
import RatingHistoryIndividualOverview from "../RatingHistoryIndividualOverview/RatingHistoryIndividualOverview.Components";
const RatingHistoryIndividual = ({ rateHistory, employeeInfoID }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(rateHistory["group"]).map((key) =>
              rateHistory["group"][key]["infoRating"].map(({ rate, date }) => (
                <RatingHistoryIndividualOverview
                  key={key}
                  rate={rate}
                  date={date}
                />
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  rateHistory: selectWholeDataRate(ownProps.employeeInfoID)(state),
});
export default connect(mapStateToProps)(RatingHistoryIndividual);
