import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import budgetReducer from "./reducers/budgetReducer";
import categoryGroupReducer from "./reducers/categoryGroupReducer";

const reducer = combineReducers({
  budget: budgetReducer,
  categoryGroup: categoryGroupReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
