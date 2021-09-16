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
import { calculateAvgRateCalInCurrentGroup, TotAvg } from "../Rate/Rating.Utils";
import { ratingStar, updateOverallAvgOfEmployeeRatingStar } from "../../Firebase/firebase.utils";
import { updateRate } from "../../Redux/Rate/rate.actions"
import {
  selectRateInfo,
  // selectInfoRatingOfEmployeeInGroup,
  selectInfoRateInGroup
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
  selectInfoRateInGroup,
  // selectInfoRatingOfEmployeeInGroup,
  // selectAllGroupsInfoEmp

}) => {
  const saveTrigger =  () => {
    if (newRating > 0) {
      const {avg_rating, infoRating} = selectInfoRateInGroup['group'][idGroup]
      const avgRateCalInCurrentGroup =  calculateAvgRateCalInCurrentGroup(
        newRating,
        infoRating,
        avg_rating
      );
      ratingStar(selectInfoRateInGroup, idEmployee, idGroup, avgRateCalInCurrentGroup, newRating)

      const set =  {idEmployee: idEmployee, idGroup: idGroup, newRate: newRating,  avgRateCal: avgRateCalInCurrentGroup}
      dispatch(updateRate(set))
      
      const totalOverallAvg = TotAvg(selectInfoRateInGroup)
      updateOverallAvgOfEmployeeRatingStar(idEmployee, totalOverallAvg)
      newRating = 0
      dispatch(triggerSaveRateCard(newRating));
      dispatch(triggerOpenAndCloseRateCard(false))

        } else {
      alert("Rate Star needs to bigger than 0");
    }


  };

  return (
    <div className="shadow-lg rounded-xl  flex flex-col bg-white gap-3 text-center align-center">
      <div className="self-center	p-3">
        <h1 className="font-bold">{displayName}</h1>
        <img width="100" height="100" src={avatar }
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
  selectInfoRateInGroup: selectInfoRateInGroup(ownProps.idEmployee)(state),
  // selectInfoRatingOfEmployeeInGroup: selectInfoRatingOfEmployeeInGroup(ownProps.idEmployee, ownProps.idGroup)(state), 
  rateInfo: selectRateInfo(state), 
});
//them button (save va cancel). Nut cancel can phai ket hop voi state, set state la false va  setCardActivate, nen de state vao redux
// if else cai react start, de khi popup card ko thay du lieu cua star
export default connect(mapStateToProps)(withRouter(RateCard));
