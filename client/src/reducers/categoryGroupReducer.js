import { createSelector } from "reselect";

import categoryGroupService from "../services/categoryGroup";
import { generateTokenConfig } from "../utilities";

const categoryGroupReducer = (state = [], action) => {
  // initial state is an array of objects, with object having keys: id, name
  switch (action.type) {
    case "INIT_CATEGORY_GROUPS": {
      return action.data;
    }
    case "NEW_CATEGORY_GROUP": {
      const data = action.data;
      return state.concat({ id: data["id"], name: data["name"] });
    }
    default:
      return state;
  }
};

export const createCategoryGroup = (content) => {
  return async (dispatch) => {
    const data = await categoryGroupService.create(
      content,
      generateTokenConfig()
    );
    dispatch({
      type: "NEW_CATEGORY_GROUP",
      data,
    });
  };
};

export const initializeCategoryGroup = () => {
  return async (dispatch) => {
    const data = await categoryGroupService.getUnique(generateTokenConfig());

    dispatch({
      type: "INIT_CATEGORY_GROUPS",
      data,
    });
  };
};

// Selectors
export const selectCategoryGroupName = createSelector(
  (state) => state.categoryGroup,
  (categoryGroups) => categoryGroups.map((categoryGroup) => categoryGroup.name)
);

export default categoryGroupReducer;
