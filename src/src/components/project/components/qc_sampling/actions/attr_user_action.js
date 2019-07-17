import axios from 'axios';

import * as types from '../constants/qc_sampling_constant';

const requestUsers = () => ({
  type: types.ATTR_USER_REQUEST_DATAS
});

const receiveUsers = (
  original_datas: Array<any>,
  datas: Array<any>,
  value_search: string,
  information: string
) => ({
  type: types.ATTR_USER_RECIEVE_DATAS,
  original_datas: original_datas,
  datas: datas,
  search_text: value_search || '',
  information: information
});

export const getAttrUsers = (value_search: string, params: Object) => async (
  dispatch: any,
  getState: any
) => {
  const users = getState().qc_sampling.filter_attribute.filter_attr_user;
  if (users.is_fetching) {
    return;
  }

  dispatch(requestUsers());
  const original_datas = [...users.original_datas];
  if (original_datas.length > 0) {
    let datas = original_datas.filter(v => v.username.includes(value_search));
    let information = `Showing ${datas.length} of ${
      datas.length
    } entries (filtered from ${original_datas.length} total entries)`;
    if (!value_search) {
      information = `Showing ${datas.length} of ${
        original_datas.length
      } entries`;
    }
    dispatch(receiveUsers(original_datas, datas, value_search, information));
  } else {
    try {
      const result = await axios(`/projects/${params.project_id}/keyers`, {
        method: 'POST',
        data: { batches: ['all'] }
      });
      const data = result.data;
      let information = `Showing ${data.length} of ${data.length} entries`;
      let users_response = [];
      for (let key_user in data) {
        if (data.hasOwnProperty(key_user)) {
          let element = data[key_user];
          users_response = [...users_response, { username: element }];
        }
      }
      dispatch(receiveUsers(users_response, users_response, '', information));
    } catch (error) {
      dispatch(receiveUsers([], [], '', `No users found`));
    }
  }
};

export const actionSelectUsers = (datas_selected: Array<Object>) => ({
  type: types.ATTR_USER_SELECT_DATAS,
  datas_selected: datas_selected
});

export const resetInitUser = () => ({
  type: types.ATTR_USER_RESET_DATAS
});
