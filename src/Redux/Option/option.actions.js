import EditOption from "./option.types";
export const OptionBetweenGroupAndTask = (option) => ({
  type: EditOption.OPTION_BETWEEN_GROUP_AND_TASK,
  payload: option,
});
export const triggerOpenAndCloseRateCard = (triggerStatus) => ({
  type: EditOption.OPEN_AND_CLOSE_RATE_CARD,
  payload: triggerStatus,
});
export const triggerSaveRateCard = (triggerSaveStatus) => ({
  type: EditOption.SAVE_RATE_CARD,
  payload: triggerSaveStatus,
});
export const avgRateUpdated = (avg_rate) => ({
  type: EditOption.AVG_RATE_UPDATED,
  payload: avg_rate,
})
export const triggerSearchComp = (trigger_search_comp) => ({
  type: EditOption.TRIGGER_SEARCH_COMP,
  payload: trigger_search_comp 
})
export const triggerSearchAddEmployeeComp = (trigger_search_add_employee) => ({
  type: EditOption.TRIGGER_SEARCH_ADD_EMPLOYEE,
  payload: trigger_search_add_employee
})
export const triggerSelectDropDownHeader = (trigger_select_drop_down_header) => ({
  type: EditOption.TRIGGER_SELECT_DROPDOWN_HEADER,
  payload: trigger_select_drop_down_header
})
export const triggerOpenEditUserProfile = (trigger_open_edit_user_profile) => ({
  type: EditOption.TRIGGER_OPEN_EDIT_USER_PROFILE,
  payload: trigger_open_edit_user_profile
})
