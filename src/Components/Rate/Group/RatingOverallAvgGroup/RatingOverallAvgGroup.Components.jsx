import React from "react";
import { connect } from "react-redux";
import { selectInfoRateInGroup } from "../../../../Redux/Rate/rate.selectors";
const RatingOverallAvgGroup = ({ state, idEmployee, idGroup }) => {
  console.log(idEmployee, idGroup);
  const { avg_rating, infoRating } = state.group[idGroup];
  return (
    <div>
      <h1>{avg_rating}</h1>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  state: selectInfoRateInGroup(ownProps.idEmployee)(state),
});
export default connect(mapStateToProps)(RatingOverallAvgGroup);
