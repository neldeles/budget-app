import { createSelector } from "reselect";
import dashboardService from "../services/dashboard";
import { generateTokenConfig } from "../utilities";

import { initializeCategoryGroup } from "./categoryGroupReducer";
import { initializeBudget } from "./budgetReducer";

const moment = require("moment");

const initialState = {
  user: { name: null },
  date: null,
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
    const payload = {
      user,
      currDate: moment(),
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
