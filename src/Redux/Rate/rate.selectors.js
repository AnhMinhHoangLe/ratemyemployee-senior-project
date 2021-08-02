import { createSelector } from "reselect";

const selectrateinfo = (state) => state.rateInfo;

export const selectRateInfo = createSelector(
  [selectrateinfo],
  (rate) => rate.rateInfo
);

export const selectAvgRateInGroup = (employeeID) =>
  createSelector(
    [selectRateInfo],
    // (employeeRate) => employeeRate[employeeID][groupID]
    (employeeRate) => employeeRate[employeeID]
  );

export const selectWholeDataRate = (employeeID) =>
  createSelector([selectRateInfo], (employeeRate) => employeeRate[employeeID]);
