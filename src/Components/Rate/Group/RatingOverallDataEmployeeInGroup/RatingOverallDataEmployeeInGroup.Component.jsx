import React from "react";
import { connect } from "react-redux";
import { selectAvgRateInGroup } from "../../../../Redux/Rate/rate.selectors";
const RatingOverallDataEmployeeInGroup = ({ state, idEmployee, idGroup }) => {
  console.log(idEmployee, idGroup);
  const { avg_rating, infoRating } = state.group[idGroup];
  console.log(infoRating);
  return (
    <div>
      {
      infoRating.map(({rate, date}) =>(
        <div>{rate} , {date}</div>
      ))}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  state: selectAvgRateInGroup(ownProps.idEmployee)(state),
});
export default connect(mapStateToProps)(RatingOverallDataEmployeeInGroup);
