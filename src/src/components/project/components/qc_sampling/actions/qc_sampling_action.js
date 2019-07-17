//@flow
import axios from 'axios';

import * as types from '../constants/qc_sampling_constant';
import lodash from 'lodash';

import { getAttrBatches, resetInitBatch } from './attr_batch_action';
import { getAttrUsers, resetInitUser } from './attr_user_action';
import { resetInitField } from './attr_field_action';
import { getAttrLayouts, resetInitLayout } from './attr_layout_action';

const requestGetAttributes = () => ({
  type: types.ATTR_CONDITION_SEND_REQUEST
});

const recieveAttributes = aql_table => ({
  type: types.ATTR_CONDITION_RECIEVE_RESULT,
  aql_table: aql_table
});

const resetInitQCSamling = () => ({
  type: types.QC_SAMPLING_RESET_STATE
});

const getAQLTable = () => (dispatch, getState) => {
  if (getState().qc_sampling.qc_sampling.is_fetching) {
    return;
  }
  dispatch(requestGetAttributes());
  return axios.get(`/aql-acceptable-quality`);
};

export const getFilterAttributes = projectId => async (
  dispatch: any,
  getState: any
) => {
  const condition = {
    project_id: projectId
  };
  dispatch(getAttrBatches('', condition));
  dispatch(getAttrLayouts('', condition));
  dispatch(getAttrUsers('', condition));

  try {
    const aql_table = await dispatch(getAQLTable());
    return dispatch(recieveAttributes(aql_table.data));
  } catch(err) {
    console.log(err);
  }
;

  const updateAQLConditions = aql_conditions => ({
    type: types.QC_SAMPLING_UPDATE_SAMPLING_CONDITIONS,
    aql_conditions: aql_conditions
  });

  const updateBigMenus = (big_menus: Object) => ({
    type: types.QC_SAMPLING_UPDATE_BIG_MENUS,
    open_big_menu: big_menus
  });

  const updateConditions = (
    aql_conditions: Object,
    inspection: Object,
    filter_attribute: Object
  ) => {
    let condition_preview = [...aql_conditions.condition_preview];
    const {
      filter_attr_batch,
      filter_attr_layout,
      filter_attr_user
    } = filter_attribute;

    const batch_selected =
      filter_attr_batch.datas_selected.length === 0
        ? [...filter_attr_batch.original_datas]
        : [...filter_attr_batch.datas_selected];
    if (batch_selected.length === 0) {
      return aql_conditions;
    }
    if (aql_conditions.apply_aql_user) {
      const user_selected =
        filter_attr_user.datas_selected.length === 0
          ? [...filter_attr_user.datas]
          : [...filter_attr_user.datas_selected];

      for (let key in batch_selected) {
        if (batch_selected.hasOwnProperty(key)) {
          let batch = batch_selected[key];
          const index_batch = lodash.findIndex(condition_preview, {
            batch_id: batch.batch_id,
            keyer: null
          });
          if (index_batch > -1) {
            condition_preview.splice(index_batch, 1);
          }
          for (let u in user_selected) {
            if (user_selected.hasOwnProperty(u)) {
              let user = user_selected[u];
              const index_batch_user = lodash.findIndex(condition_preview, {
                batch_id: batch.batch_id,
                keyer: user.username
              });
              const result = {
                batch_id: batch.batch_id,
                batch_name: batch.batch_name,
                error_threshold: parseFloat(aql_conditions.error_threshold),
                inspection: inspection.label,
                keyer: user.username,
                layouts: null
              };

              if (index_batch_user === -1) {
                condition_preview.push(result);
              } else {
                condition_preview[index_batch_user] = result;
              }
            }
          }
        }
      }
    } else {
      const layout_selected =
        filter_attr_layout.datas_selected.length === 0
          ? [...filter_attr_layout.datas]
          : [...filter_attr_layout.datas_selected];

      for (let key in batch_selected) {
        if (batch_selected.hasOwnProperty(key)) {
          const batch = batch_selected[key];
          condition_preview = condition_preview.filter(
            _c => _c.batch_id !== batch.batch_id
          );
          const layouts = [];
          for (let l in layout_selected) {
            if (layout_selected.hasOwnProperty(l)) {
              const layout = layout_selected[l];
              layouts.push(layout.name);
            }
          }
          const result = {
            batch_id: batch.batch_id,
            batch_name: batch.batch_name,
            error_threshold: parseFloat(aql_conditions.error_threshold),
            inspection: inspection.label,
            keyer: null,
            layouts: layouts
          };

          condition_preview.push(result);
        }
      }
    }
    aql_conditions.condition_preview = condition_preview;
    return aql_conditions;
  };

  export const modifyAQL = (values: any, name: string) => async (
    dispatch: any,
    getState: any
  ) => {
    let aql_conditions = {
      ...getState().qc_sampling.qc_sampling.aql_conditions
    };
    if (name === types.QC_CONDITION_KEY_INSPECTION_LEVEL) {
      aql_conditions = await updateConditions(
        aql_conditions,
        values,
        getState().qc_sampling.filter_attribute
      );
    } else {
      aql_conditions[name] = values;
    }
    dispatch(updateAQLConditions(aql_conditions));
  };

  export const handleOpenCloseBigMenus = (name: string, value: any) => (
    dispatch: any,
    getState: any
  ) => {
    let open_big_menu = {
      ...getState().qc_sampling.qc_sampling.open_big_menu
    };
    open_big_menu[name] = value;
    dispatch(updateBigMenus(open_big_menu));
  };

  export const resetQCSamplingState = () => (dispatch: any, getState: any) => {
    dispatch(resetInitBatch());
    dispatch(resetInitField());
    dispatch(resetInitLayout());
    dispatch(resetInitQCSamling());
    dispatch(resetInitUser());
  };
