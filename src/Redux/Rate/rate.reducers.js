import rateActionType from "./rate.types";

const INITIAL_STATE = {
	rateInfo: null,
};

const rateInfoReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case rateActionType.UPDATE_RATE:
			return {
				...state,
				rateInfo: action.payload,
			};
		default:
			return state;
	}
};
export default rateInfoReducer;
