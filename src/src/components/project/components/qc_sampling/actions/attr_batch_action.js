import axios from 'axios';

import * as types from '../constants/qc_sampling_constant';

import lodash from 'lodash';

const requestBatches = () => ({
  type: types.ATTR_BATCH_REQUEST_DATAS
});

const receiveBatches = (
  datas: Array<any>,
  original_datas: Array<any>,
  search_text: string,
  information: string,
  is_load_more: boolean
) => ({
  type: types.ATTR_BATCH_RECIEVE_DATAS,
  datas: datas,
  original_datas: original_datas,
  search_text: search_text,
  information: information,
  is_load_more: is_load_more
});

export const getAttrBatches = (
  value_search: string,
  params: Object,
  url
) => async (dispatch: any, getState: any) => {
  const batches = getState().qc_sampling.filter_attribute.filter_attr_batch;
  if (batches.is_fetching) {
    return;
  }
  dispatch(requestBatches());
  const original_datas = [...batches.original_datas];

  if (original_datas.length > 0) {
    let datas = original_datas.filter(v => v.batch_name.includes(value_search));
    const total_entries = datas.length;
    if (datas.length > types.MAX_LENGTH_OF_DATAS) {
      datas = datas.slice(0, types.MAX_LENGTH_OF_DATAS);
    }
    let information = `Showing ${
      datas.length
    } of ${total_entries} entries (filtered from ${
      original_datas.length
    } total entries)`;
    let is_load_more = datas.length < total_entries;
    if (!value_search) {
      information = `Showing ${datas.length} of ${
        original_datas.length
      } entries`;
      is_load_more = datas.length < original_datas.length;
    }
    dispatch(
      receiveBatches(
        datas,
        original_datas,
        value_search,
        information,
        is_load_more
      )
    );
  } else {
    try {
      if (!url) {
        url = `/projects/${params.project_id}?done_percentage&not_zero=true`;
      }
      const result = await axios.get(url);
      let data = result.data;
      data = lodash.orderBy(
        data,
        ['percentage', 'batch_name'],
        ['desc', 'asc']
      );
      const results = [...data].slice(0, types.MAX_LENGTH_OF_DATAS);
      const information = `Showing ${results.length} of ${data.length} entries`;
      const is_load_more = results.length < data.length;
      dispatch(receiveBatches(results, data, '', information, is_load_more));
    } catch (error) {
      dispatch(receiveBatches([], []));
    }
  }
};

export const loadMoreItem = () => (dispatch, getState) => {
  const {
    original_datas,
    datas,
    search_text
  } = getState().qc_sampling.filter_attribute.filter_attr_batch;
  let results = original_datas.filter(v => v.batch_name.includes(search_text));
  const total_entries = results.length;
  results = results.slice(0, datas.length + types.MAX_LENGTH_OF_DATAS);

  let information = `Showing ${
    results.length
  } of ${total_entries} entries (filtered from ${
    original_datas.length
  } total entries)`;
  let is_load_more = results.length < total_entries;

  if (!search_text) {
    information = `Showing ${results.length} of ${
      original_datas.length
    } entries`;
    is_load_more = results.length < original_datas.length;
  }

  dispatch(
    receiveBatches(
      results,
      original_datas,
      search_text,
      information,
      is_load_more
    )
  );
};

export const actionSelectBatches = (datas_selected: Array<Object>) => ({
  type: types.ATTR_BATCH_SELECT_DATAS,
  datas_selected: datas_selected
});

export const resetInitBatch = () => ({
  type: types.ATTR_BATCH_RESET_DATAS
});
