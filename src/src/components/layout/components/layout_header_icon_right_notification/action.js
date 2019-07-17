import axios from "axios";
import _ from "lodash";

import {
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SET_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_LIST,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_ITEM,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_FILTER_BY_NAME,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_INPUT_CHANGE,
  LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_ITEM
} from "./constants";

export const getNewsfeed = () => async (dispatch, getState) => {
  const datas = await axios
    .get(`announcements/newsfeed`)
    .then(res => {
      return _.orderBy(res.data, ["created_date"], ["desc"]);
    })
    .catch(err => {
      console.log(err);
      return [];
    });

  let total_unread = 0;
  datas.forEach(function(data) {
    if (!data.seen) {
      total_unread += 1;
    }
  });

  return dispatch({
    type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SET_LIST,
    datas,
    total_unread
  });
};

export const addNewsfeed = object => async (dispatch, getState) => {
  const datas = [...getState().layout_header_notification.datas];
  let total_unread = getState().layout_header_notification.total_unread;

  datas.unshift(object);
  return dispatch({
    type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SET_LIST,
    datas,
    total_unread: total_unread + 1
  });
};

export const showList = event => async (dispatch, getState) => {
  if (getState().layout_header_notification.show_list) {
    return dispatch({
      type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_LIST
    });
  } else {
    return dispatch({
      type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_LIST,
      anchorEl: event.currentTarget
    });
  }
};

export const hideList = () => ({
  type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_LIST
});

export const showItem = data => async (dispatch, getState) => {
  let total_unread = getState().layout_header_notification.total_unread;

  if (!data.seen) {
    axios
      .patch(`announcements/seen/${data._id}`)
      .then(res => {
      })
      .catch(err => {
        console.log(err);
      });

    total_unread = total_unread - 1;
    if (total_unread < 0) {
      total_unread = 0;
    }

    data.seen = true;
  }

  return dispatch({
    type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_SHOW_ITEM,
    data,
    total_unread
  });
};

export const hideItem = () => ({
  type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_HIDE_ITEM
});

export const inputSearchChange = text_search => ({
  type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_INPUT_CHANGE,
  text_search
});

export const filterByName = name => async (dispatch, getState) => {
  const datas = getState().layout_header_notification.datas;

  let results = null;
  if (name) {
    results = datas.filter(d => {
      try {
        return (
          (d.project_name && d.project_name.toLowerCase().includes(name)) ||
          d.title.toLowerCase().includes(name) ||
          d.channel.toLowerCase().includes(name)
        );
      } catch (error) {
        return false;
      }
    });
  }

  return dispatch({
    type: LAYOUT_HEADER_ICON_RIGHT_NOTIFICATION_FILTER_BY_NAME,
    results
  });
};
