import budgetService from "../services/budget";

const budgetReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BUDGET": {
      const data = action.data;
      const initState = data.map((datum) => {
        const output = {
          id: datum["category_id"],
          category: datum["category"],
          categoryGroupName: datum["category_group"],
          budgeted: datum["budgeted_amount"],
          // TODO: change activity and available to functions
          activity: 0,
          availalble: 0,
        };
        return output;
      });
      return initState;
    }
    default:
      return state;
  }
};

export const initializeBudget = () => {
  return async (dispatch) => {
    const config = {
      headers: { token: localStorage.token },
    };
    const data = await budgetService.getAll(config);
    dispatch({
      type: "INIT_BUDGET",
      data,
    });
  };
};

export default budgetReducer;
