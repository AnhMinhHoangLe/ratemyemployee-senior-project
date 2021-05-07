import EditOption from "./option.types";
const INITIAL_STATE = {
	option: true, // this option is for the employee choosing between group or individual list, false is for group and true is for individual
};

const optionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EditOption.OPTION_BETWEEN_GROUP_AND_TASK:
			return {
				...state,
				// option: !state.option,
				option: action.payload,
			};
		default:
			return state;
	}
};
export default optionReducer;
