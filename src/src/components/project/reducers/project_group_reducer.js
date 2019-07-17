import * as types from '../constants/project_constant';



const initialState = {

  is_fetching: false,
  selected_group: null,
  groups: []
};


const project_group = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_GROUP_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.PROJECT_GROUP_RECEIVE:
      return {
        ...state,
        groups: action.groups,
     
        is_fetching: false
      };
    // case types.PROJECT_GROUP_RECEIVE:
    //   return {
    //     ...state,
    //     selected_group: action.selected_group,

    //   };
  
    default:
      return state;
  }
};

export default project_group;
