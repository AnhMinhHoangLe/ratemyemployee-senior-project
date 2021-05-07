import { createSelector } from "reselect";

const selectrateinfo = (state) => state.rateInfo;

export const selectRateInfo = createSelector(
	[selectrateinfo],
	(rate) => rate.rateInfo
);
