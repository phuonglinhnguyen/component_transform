import axios from 'axios';

import { getAttrFields, resetInitField } from './attr_field_action';

import * as types from '../constants/qc_sampling_constant';

const requestLayouts = () => ({
  type: types.ATTR_LAYOUT_REQUEST_DATAS
});

const receiveLayouts = (
  original_datas: Array<any>,
  datas: Array<any>,
  value_search: string,
  information: string
) => ({
  type: types.ATTR_LAYOUT_RECIEVE_DATAS,
  original_datas: original_datas,
  datas: datas,
  search_text: value_search || '',
  information: information
});

export const getAttrLayouts = (value_search: string, params: Object) => async (
  dispatch: any,
  getState: any
) => {
  const layouts = getState().qc_sampling.filter_attribute.filter_attr_layout;
  if (layouts.is_fetching) {
    return;
  }
  dispatch(requestLayouts());
  const original_datas = [...layouts.original_datas];
  if (original_datas.length > 0) {
    const results = original_datas.filter(v => v.name.includes(value_search));
    let information = `Showing ${results.length} of ${
      results.length
    } entries (filtered from ${original_datas.length} total entries)`;
    if (!value_search) {
      information = `Showing ${results.length} of ${
        original_datas.length
      } entries`;
    }
    dispatch(
      receiveLayouts(original_datas, results, value_search, information)
    );
  } else {
    try {
      const result = await axios(
        `/projects/${params.project_id}/layout-definitions?includes=name`,
        {
          method: 'GET'
        }
      );
      const data = result.data;
      let information = `Showing ${data.length} of ${data.length} entries`;
      dispatch(receiveLayouts(data, data, '', information));
      const layout_ids = [];
      data.forEach(function(d) {
        layout_ids.push(d.id);
      });
      params.layout_ids = layout_ids;
      dispatch(getAttrFields('', params, true));
    } catch (error) {
      dispatch(receiveLayouts([], []));
    }
  }
};

const updateSelectedLayouts = (datas_selected: Array<Object>) => ({
  type: types.ATTR_LAYOUT_SELECT_DATAS,
  datas_selected: datas_selected
});

export const actionSelectLayouts = (datas_selected: Array<Object>) => (
  dispatch: any,
  getState: any
) => {
  const original_datas = getState().qc_sampling.filter_attribute
    .filter_attr_layout.original_datas;

  dispatch(updateSelectedLayouts(datas_selected));
  dispatch(resetInitField());
  const layout_ids = [];
  datas_selected =
    datas_selected.length === 0 ? original_datas : datas_selected;
  datas_selected.forEach(function(data) {
    layout_ids.push(data.id);
  });
  const project_id = getState().project.project_item.project.id;
  dispatch(
    getAttrFields(
      '',
      {
        project_id: project_id,
        layout_ids: layout_ids
      },
      true
    )
  );
};

export const resetInitLayout = () => ({
  type: types.ATTR_LAYOUT_RESET_DATAS
});
