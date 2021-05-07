import EditOption from "./option.types";
export const OptionBetweenGroupAndTask = (option) => ({
	type: EditOption.OPTION_BETWEEN_GROUP_AND_TASK,
	payload: option,
});
