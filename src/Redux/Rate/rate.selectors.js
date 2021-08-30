import { createSelector } from "reselect";

const selectrateinfo = (state) => state.rateInfo;

export const selectRateInfo = createSelector(
  [selectrateinfo],
  (rate) => rate.rateInfo
);

export const selectInfoRateInGroup = (employeeID) =>
  createSelector(
    [selectRateInfo],
    (avg_rating) => avg_rating[employeeID]
  );

  // export const selectInfoRatingOfEmployeeInGroup = (employeeID, groupID) =>
  // createSelector(
  //   [selectRateInfo],
  //   // (employeeRate) => employeeRate[employeeID][groupID]
  //   (employeeRate) => employeeRate[employeeID]['group'][groupID]['infoRating']
  // );


export const selectWholeDataRate = (employeeID) =>
  createSelector([selectRateInfo], (employeeRate) => employeeRate[employeeID]);
