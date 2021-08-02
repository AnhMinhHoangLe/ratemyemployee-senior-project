import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RatingStar from "../Rate/RatingStar/RatingStar.Components";
import CustomButton from "../CustomButton/CustomButton.component";
import "./RateCard.styles.scss";
import { triggerOpenAndCloseRateCard } from "../../Redux/Option/option.actions";
import { selectTriggerOpenAndCloseRateCard } from "../../Redux/Option/option.selectors";
import { triggerSaveRateCard } from "../../Redux/Option/option.actions";
import { selectTriggerSaveRateCard } from "../../Redux/Option/option.selectors";
import { calculateAvg } from "../Rate/Rating.Utils";
import { ratingStar } from "../../Firebase/firebase.utils";
import { updateRate } from "../../Redux/Rate/rate.actions"
import {
  selectRateInfo,
  selectAvgRateInGroup,
} from "../../Redux/Rate/rate.selectors";
const RateCard = ({
  avatar,
  displayName,
  rateInfo, 
  idGroup,
  idEmployee,
  selectTriggerOpenAndCloseRateCard,
  dispatch,
  newRating,
  avgRateInGroup,

}) => {
  const saveTrigger = () => {
    if (newRating > 0) {
      const avgRateCal = calculateAvg(
        newRating,
        avgRateInGroup.group[idGroup].infoRating,
        avgRateInGroup.group[idGroup].avg_rating
      );
      const set = {idEmployee: idEmployee, idGroup: idGroup, newRate: newRating,  avgRateCal: avgRateCal}
      ratingStar(avgRateInGroup, idEmployee, idGroup, avgRateCal, newRating)
      dispatch(updateRate(set))
      newRating = 0
      dispatch(triggerSaveRateCard(newRating));
        } else {
      alert("Rate Star needs to bigger than 0");
      dispatch(triggerOpenAndCloseRateCard(false))
    }

  };

  // ratingStar(state, idEmployee, idGroup, avgRateCal, newRating);

  return (
    <div className="shadow-lg rounded-xl  flex flex-col bg-white gap-3 text-center align-center">
      <div className="self-center	p-3">
        <h1 className="font-bold">{displayName}</h1>
        <img src={avatar ? avatar : 'https://firebasestorage.googleapis.com/v0/b/rate-my-employee-d7636.appspot.com/o/images%2Ftree-736885__340.jpg?alt=media&token=4aea820d-9eba-4c4f-b9fd-e85915dd0463'}
 />
      </div>
      <div className="self-center	">
        <RatingStar idGroup={idGroup} idEmployee={idEmployee} />
      </div>
      <div className="self-center p-3 flex gap-5">
        <CustomButton
          className="bg-gray-400 text-black py-2 px-4 rounded-full	outline-none"
          onClick={() => dispatch(triggerOpenAndCloseRateCard(false))}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={() => {
            saveTrigger();
          }}
          className="text-black py-2 px-4 rounded-full custom-button"
        >
          Save
        </CustomButton>

      </div>
    </div>
  );
};
// check value bigger than 0, after that click save to convert the status true and false,
const mapStateToProps = (state, ownProps) => ({
  selectTriggerOpenAndCloseRateCard: selectTriggerOpenAndCloseRateCard(state),
  newRating: selectTriggerSaveRateCard(state),
  avgRateInGroup: selectAvgRateInGroup(ownProps.idEmployee)(state),
  rateInfo: selectRateInfo(state)
});
//them button (save va cancel). Nut cancel can phai ket hop voi state, set state la false va  setCardActivate, nen de state vao redux
// if else cai react start, de khi popup card ko thay du lieu cua star
export default connect(mapStateToProps)(withRouter(RateCard));
