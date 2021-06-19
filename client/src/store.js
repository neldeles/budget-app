import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import budgetReducer from "./reducers/budgetReducer";
import categoryGroupReducer from "./reducers/categoryGroupReducer";
import dashboardReducer from "./reducers/dashboardReducer";

const reducer = combineReducers({
  budget: budgetReducer,
  categoryGroup: categoryGroupReducer,
  dashboard: dashboardReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
