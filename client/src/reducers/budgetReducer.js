import budgetService from "../services/budget";
import categoryService from "../services/category";

import { generateTokenConfig } from "../utilities";

const budgetReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BUDGET": {
      const data = action.payload;
      const initState = data.map((datum) => {
        const output = {
          id: datum["category_id"],
          category: datum["category"],
          categoryGroupName: datum["category_group"],
          budgeted: datum["budgeted_amount"],
          // TODO: change activity and available to functions
          activity: 0,
          available: 0,
        };
        return output;
      });
      return initState;
    }
    case "ADD_CATEGORY_NAME": {
      return state;
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
