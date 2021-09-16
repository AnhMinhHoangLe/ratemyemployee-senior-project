import React from "react";
const RatingHistoryIndividualOverview = ({ key, rate, date }) => {
  return (
    <div>
      <td>{key}</td>
      <td>{rate}</td>
      <td>{date}</td>
    </div>
  );
};

export default RatingHistoryIndividualOverview;
