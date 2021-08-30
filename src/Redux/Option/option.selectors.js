import { createSelector } from "reselect";

const selectOption = (state) => state.option;
export const selectOptionBetweenGroupAndTask = createSelector(
  [selectOption],
  (selectOption) => selectOption.option
);
export const selectTriggerOpenAndCloseRateCard = createSelector(
  [selectOption],
  (selectOption) => selectOption.triggerRateCard
);
export const selectTriggerSaveRateCard = createSelector(
  [selectOption],
  (selectOption) => selectOption.triggerSave
);
export const selectAvgRateUpdated = createSelector(
  [selectOption],
  (selectOption) => selectOption.avg_rate_updated
)
export const selectTriggerSearch = createSelector(
  [selectOption],
  (selectOption) => selectOption.trigger_search_comp
)
export const selectTriggerSearchAddEmployee = createSelector(
  [selectOption],
  (selectOption) => selectOption.trigger_search_add_employee
)