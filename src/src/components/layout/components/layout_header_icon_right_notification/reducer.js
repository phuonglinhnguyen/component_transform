import {
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SET_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_ITEM,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_FILTER_BY_NAME,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_INPUT_CHANGE,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_ITEM
} from "./constants";

const initial_state = {
  is_created: false,
  text_search: "",
  data: null,
  datas: [],
  total_unread: 0,
  show_list: false,
  show_item: false
};

export default (state = { ...initial_state }, action) => {
  switch (action.type) {
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SET_LIST: {
      return {
        ...state,
        is_created: true,
        datas: action.datas,
        total_unread: action.total_unread
      };
    }
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_LIST: {
      return {
        ...state,
        show_list: true,
        anchorElMain: action.anchorEl
      };
    }
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_LIST: {
      return {
        ...state,
        show_list: false
      };
    }
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_ITEM: {
      return {
        ...state,
        show_item: true,
        data: action.data,
        total_unread: action.total_unread
      };
    }
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_INPUT_CHANGE:
      return {
        ...state,
        text_search: action.text_search
      };
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_FILTER_BY_NAME: {
      return {
        ...state,
        results: action.results
      };
    }
    case LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_ITEM: {
      return {
        ...state,
        show_item: false
      };
    }
    default:
      return state;
  }
};
