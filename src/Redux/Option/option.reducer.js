import EditOption from "./option.types";
const INITIAL_STATE = {
  option: true, // this option is for the employee choosing between group or individual list, false is for group and true is for individual
  triggerRateCard: false, // this option is to open and close rate card
  triggerSave: 0,
  avg_rate_updated: 0,
  trigger_search_comp: false, 
};

const optionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EditOption.OPTION_BETWEEN_GROUP_AND_TASK:
      return {
        ...state,
        // option: !state.option,
        option: action.payload,
      };
    case EditOption.OPEN_AND_CLOSE_RATE_CARD:
      return {
        ...state,
        triggerRateCard: action.payload,
      };
    case EditOption.SAVE_RATE_CARD:
      return {
        ...state,
        triggerSave: action.payload,
      };
    case EditOption.AVG_RATE_UPDATED:
      return {
        ...state,
        avg_rate_updated: action.payload,

      }
    case EditOption.TRIGGER_SEARCH_COMP:
      return {
        ...state,
        trigger_search_comp: action.payload, 
      }
    case EditOption.TRIGGER_SEARCH_ADD_EMPLOYEE:
      return {
        ...state,
        trigger_search_add_employee: action.payload
      }
    default:
      return state;
  }
};
export default optionReducer;
