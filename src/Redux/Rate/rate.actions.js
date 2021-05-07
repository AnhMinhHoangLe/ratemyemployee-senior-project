import rateActionType from "./rate.types";
export const updateRate = (rateMap) => ({
	type: rateActionType.UPDATE_RATE,
	payload: rateMap,
});
