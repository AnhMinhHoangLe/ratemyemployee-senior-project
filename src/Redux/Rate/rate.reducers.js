import rateActionType from "./rate.types";
import {updateRateFunc} from "./rate.utils"

const INITIAL_STATE = {
  rateInfo: null,
  isFetching: false,
  error_message: null,
  // newRateInput: 0,

};

const rateInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case rateActionType.FETCH_RATE_START:
      return {
        ...state,
        isFetching: true,
      };
    case rateActionType.FETCH_RATE_SUCCESS:
      return {
        ...state,
        rateInfo: action.payload,
        isFetching: false,

      };
    case rateActionType.FETCH_RATE_FAILURE:
      return {
        ...state,
        error_message: action.payload,
        isFetching: false,
      };
    case rateActionType.UPDATE_RATE_AFTER_RATING:
      return {
        ...state,
        // rateInfo: updateRateFunc(idEmployee, idGroup, newRate, date, newAvg)
       rateInfo:  updateRateFunc(state.rateInfo, action.payload)
      }

    default:
      return state;
  }
};
export default rateInfoReducer;
