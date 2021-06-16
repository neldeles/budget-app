import categoryGroupService from "../services/categoryGroup";

const categoryGroupReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_CATEGORY_GROUPS": {
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeCategoryGroup = () => {
  return async (dispatch) => {
    const config = {
      headers: { token: localStorage.token },
    };
    const data = await categoryGroupService.getUnique(config);

    dispatch({
      type: "INIT_CATEGORY_GROUPS",
      data,
    });
  };
};

export default categoryGroupReducer;
