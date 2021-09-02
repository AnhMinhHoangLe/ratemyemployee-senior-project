import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ratingStar } from "../../../Firebase/firebase.utils";
import {
  selectRateInfo,
  selectInfoRateInGroup,
} from "../../../Redux/Rate/rate.selectors";
import { selectTriggerOpenAndCloseRateCard } from "../../../Redux/Option/option.selectors";
import { triggerSaveRateCard } from "../../../Redux/Option/option.actions";

const RatingStar = ({
  idGroup,
  idEmployee,
  selectInfoRateInGroup,
  triggerOpenAndCloseRateCard,
  dispatch,
  selectRateInfo
}) => {
  // need to create a function to calculate avg at specific
  //group by using selectAvgRateInGroup, add data employee to db
  const ratingChanged = (newRating, idEmployee, idGroup) => {
    dispatch(triggerSaveRateCard(newRating));
  };
  return (
    <div>

      {triggerOpenAndCloseRateCard ? (
        <ReactStars
          count={5}
          onChange={(newRating) =>
            ratingChanged(newRating, idEmployee, idGroup)
          }
          size={24}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FFDB5D"
          edit={true}
        />
      ) : (
          
        <ReactStars
          count={5}
          value={selectInfoRateInGroup['group'][idGroup]['avg_rating']}
          // onChange={(newRating) => ratingChanged(newRating, idEmployee, idGroup)}
          size={24}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FFDB5D"
          edit={false}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idEmployee)(state),
  triggerOpenAndCloseRateCard: selectTriggerOpenAndCloseRateCard(state),
  selectRateInfo:selectRateInfo(state)
});

export default connect(mapStateToProps)(RatingStar);
