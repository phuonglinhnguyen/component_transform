import axios from 'axios';

import * as types from '../constants/qc_sampling_constant';

const requestFields = () => ({
  type: types.ATTR_FIELD_REQUEST_DATAS
});

const receiveFields = (
  original_datas: Array<any>,
  datas: Array<any>,
  value_search: string,
  information: string
) => ({
  type: types.ATTR_FIELD_RECIEVE_DATAS,
  original_datas: original_datas,
  datas: datas,
  search_text: value_search || '',
  information: information
});

export const getAttrFields = (
  value_search: string,
  params: Object,
  get_by: boolean
) => async (dispatch: any, getState: any) => {
  const fields = getState().qc_sampling.filter_attribute.filter_attr_field;
  if (fields.is_fetching) {
    return;
  }

  dispatch(requestFields());
  const original_datas = [...fields.original_datas];
  if (original_datas.length > 0 && !get_by) {
    let results = original_datas.filter(v => v.name.includes(value_search));
    let information = `Showing ${results.length} of ${
      results.length
    } entries (filtered from ${original_datas.length} total entries)`;
    if (!value_search) {
      information = `Showing ${results.length} of ${
        original_datas.length
      } entries`;
    }
    dispatch(receiveFields(original_datas, results, value_search, information));
  } else {
    let url = `/projects/${params.project_id}/field-value-definitions`;
    if (Array.isArray(params.layout_ids) && params.layout_ids.length > 0) {
      const layout_ids = params.layout_ids.toString();
      url = `${url}?layout_ids=${layout_ids}&includes=name`;
    } else {
      url = `${url}?layout_ids=all&includes=name`;
    }
    try {
      const result = await axios(url, {
        method: 'GET'
      });
      const data = result.data;
      let information = `Showing ${data.length} of ${data.length} entries`;
      dispatch(receiveFields(data, data, '', information));
    } catch (error) {
      dispatch(receiveFields([], []));
    }
  }
};

export const actionSelectFields = (datas_selected: Array<Object>) => ({
  type: types.ATTR_FIELD_SELECT_DATAS,
  datas_selected: datas_selected
});

export const resetInitField = () => ({
  type: types.ATTR_FIELD_RESET_DATAS
});
