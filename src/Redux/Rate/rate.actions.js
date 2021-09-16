import rateActionType from "./rate.types";
import { firestore } from "../../Firebase/firebase.utils";
import {
  convertDataRateSnapShot,
} from "../../Firebase/firebase.snapshot";
import {updateRateFunc} from "./rate.utils"

export const fetchingRateStart = (rateMap) => ({
  type: rateActionType.FETCH_RATE_START,
});

export const fetchingRateSuccess = (rateMap) => ({
  type: rateActionType.FETCH_RATE_SUCCESS,
  payload: rateMap,
});
export const fetchingRateFailure = (errorMessage) => ({
  type: rateActionType.FETCH_RATE_FAILURE,
  payload: errorMessage,
});
//updating rate star after rating
export const updateRate = (rateMap) => ({
  type: rateActionType.UPDATE_RATE_AFTER_RATING, 
  payload: rateMap
})


export const fetchingUpdateRate = (arrayIDEmployee) => {
  return (dispatch) => {
    const getRateFromEmployeeID = firestore
            .collection("rate")
            .where("id", "in", arrayIDEmployee);
            dispatch(fetchingRateStart());
    getRateFromEmployeeID.onSnapshot(async (snapshot) => {
      const dataRate = convertDataRateSnapShot(snapshot);
      dispatch(fetchingRateSuccess(dataRate));
    }
    )
    // dispatch(updateRate(updateRateFunc(rateMap, thingsToChange)))
  }
}


//we dont need it, because it will need to the list of employee => go to action of Employee (Individuals)
export const fetchingRateStartAsync = () => {};
