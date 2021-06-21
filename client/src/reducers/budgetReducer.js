import budgetService from "../services/budget";
import categoryService from "../services/category";

import { generateTokenConfig } from "../utilities";

// transform budget payload
const transformBudget = (obj) => {
  return {
    id: obj["id"],
    category: obj["name"],
    categoryGroupId: obj["category_group_id"],
    categoryGroupName: obj["category_group_name"],
    budgeted: obj["budgeted_amount"],
    // TODO: change activity and available to functions
    activity: 0,
    available: 0,
  };
};

const budgetReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BUDGET": {
      const data = action.payload;
      const initState = data.map((datum) => {
        const output = transformBudget(datum);
        return output;
      });
      return initState;
    }
    case "ADD_CATEGORY_NAME": {
      const output = transformBudget(action.payload);
      return state.concat(output);
    }
    default:
      return state;
  }
};

export const initializeBudget = () => {
  return async (dispatch) => {
    const payload = await budgetService.getAll(generateTokenConfig());
    dispatch({
      type: "INIT_BUDGET",
      payload,
    });
  };
};

export const addBudgetCategory = (categoryData) => {
  // categoryData example
  // {
  //   "name": "Cellphone",
  //   "category_group_id": 7,
  //   "date": "2021-06-01"
  // }
  return async (dispatch) => {
    const payload = await categoryService.create(
      categoryData,
      generateTokenConfig()
    );

    dispatch({
      type: "ADD_CATEGORY_NAME",
      payload,
    });
  };
};

export default budgetReducer;
