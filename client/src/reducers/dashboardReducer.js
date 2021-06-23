import { createSelector } from "reselect";

// Services
import dashboardService from "../services/dashboard";
import categoryService from "../services/category";

// Utilities
import { generateTokenConfig } from "../utilities";

// Reducers
import { initializeCategoryGroup } from "./categoryGroupReducer";
import { initializeBudget } from "./budgetReducer";

const moment = require("moment");

const initialState = {
  user: { name: null },
  currDate: null,
  runningBudget: parseFloat(0),
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_DASHBOARD": {
      return action.payload;
    }
    case "UPDATE_DATE": {
      return { ...state, currDate: action.payload.date };
    }
    default:
      return state;
  }
};

export const initializeDashboard = () => {
  return async (dispatch, getState) => {
    const user = await dashboardService.getUser(generateTokenConfig());
    const currBudget = await categoryService.getCurrentBudget(
      generateTokenConfig()
    );

    const payload = {
      user,
      currDate: moment(),
      runningBudget: currBudget,
    };

    await Promise.all([
      dispatch({
        type: "INIT_DASHBOARD",
        payload,
      }),
      dispatch(initializeCategoryGroup()),
      dispatch(initializeBudget()),
    ]);

    console.log("state after initialization", getState());
  };
};

// date action creators
export const updateDashboardDate = (date) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_DATE",
      payload: {
        date: date,
      },
    });
  };
};

// Selectors
export const selectDashboardDate = createSelector(
  (state) => state.dashboard,
  (dashboard) => dashboard.currDate
);

export default dashboardReducer;
