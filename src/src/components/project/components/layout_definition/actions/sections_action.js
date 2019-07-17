import { SectionsTypes } from '../types';
import { NAME_STORE, MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD, ACTION_CREATE } from '../constant';
import XClient from '../../../../common/api';
import { NotifyActions } from '../../../../common/notification';
import { sortBy } from 'lodash'
const receiveSections = (layoutId, items) => ({ type: SectionsTypes.RECEIVE, items, layoutId });
const fetchingSections = () => ({ type: SectionsTypes.FETCHING });
const invalidateSections = () => ({ type: SectionsTypes.DID_INVALIDATION }); //eslint-disable-line  no-unused-vars
const fetchSections = (projectId, layoutId, didInvalidate) => async (dispatch) => {
  let _res = await XClient.section.list_of_layout(projectId, layoutId);
  if (_res.error && _res.status !== 404) {
    dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_get_list_section', { i18: !0 }));
    dispatch(receiveSections(layoutId, []));
  } else {
    let sections = _res.payload
    let sorted = sortBy(sections, ['index']);
    dispatch(receiveSections(layoutId, sorted));
  }
};
const shouldFetch = (sections, layoutId) => {
  return (!sections.isFetching && (sections.didInvalidate < MAX_TRY_RELOAD) && (!sections.initial || sections.layoutId !== layoutId))
};

export const fetchIfNeeded = info => async (dispatch, getState) => {
  const { layoutId, projectId } = info;
  if (layoutId && layoutId !== ACTION_CREATE) {
    const { sections } = getState()[NAME_STORE];
    if (shouldFetch(sections, layoutId)) {
      dispatch(fetchingSections());
      let _fetchSections = fetchSections(projectId, layoutId, sections.didInvalidate);
      if (sections.didInvalidate > 0) {
        setTimeout(() => {
          dispatch(_fetchSections)
        }, TIME_TRY_RELOAD[sections.didInvalidate] || TIME_TRY_LOAD);
      } else {
        dispatch(_fetchSections)
      }
    }
  }
};
export const resetSections = () => ({ type: SectionsTypes.RESET });

export const addSection = () => ({ type: SectionsTypes.ADD })
export const chooseSection = (sectionIndex) => ({ type: SectionsTypes.CHOOSE, sectionIndex });
export const changeNameSection = (sectionIndex, name) => ({ type: SectionsTypes.CHANGE_NAME, sectionIndex, name });
export const deleteSection = (sectionIndex) => ({ type: SectionsTypes.DELETE_SECTION, sectionIndex });
export const changePositionSection = (sectionIndex, position) => ({ type: SectionsTypes.CHANGE_POSITION, sectionIndex, position });

export const addField = (sectionIndex) => ({ type: SectionsTypes.ADD_FIELD, sectionIndex });
export const changeField = (sectionIndex, fieldIndex, fieldId, previousId, argument_details) => ({ type: SectionsTypes.CHANGE_FIELD, sectionIndex, fieldIndex, fieldId, previousId, argument_details });
export const deleteField = (sectionIndex, fieldIndex) => ({ type: SectionsTypes.DELETE_FIELD, sectionIndex, fieldIndex });
export const chooseField = (sectionIndex, fieldIndex) => ({ type: SectionsTypes.CHOOSE_FIELD, sectionIndex, fieldIndex });
export const sortFields = (sectionIndex, fields) => ({ type: SectionsTypes.SORT_FIELDS, sectionIndex, fields });
export const changePositionField = (sectionIndex, fieldIndex, position) => ({ type: SectionsTypes.CHANGE_POSITION_FIELD, sectionIndex, fieldIndex, position });

export const changeSettingField = (sectionIndex, fieldIndex, settings) => ({ type: SectionsTypes.CHANGE_SETTING_FIELD, sectionIndex, fieldIndex, settings });

export const deletePositionOption = (sectionIndex, fieldIndex, optionIndex) => ({ type: SectionsTypes.DELETE_POSITION_OPTION, sectionIndex, fieldIndex, optionIndex });
export const chooseOption = (sectionIndex, fieldIndex, optionIndex) => ({ type: SectionsTypes.CHOOSE_OPTION, sectionIndex, fieldIndex, optionIndex });
export const changePositionOption = (sectionIndex, fieldIndex, optionIndex, position) => ({ type: SectionsTypes.CHANGE_POSITION_OPTION, sectionIndex, fieldIndex, optionIndex, position });

export const updateIdSections = (updateId) => ({ type: SectionsTypes.UPDATE_ID_FOR_ADD, updateId })

export const openSetting = (sectionIndex) => ({ type: SectionsTypes.OPEN_SETTING, sectionIndex });
export const closeSetting = () => ({ type: SectionsTypes.CLOSE_SETTING });
export const changeSetting = (sectionIndex, config) => ({ type: SectionsTypes.CHANGE_SETTING, sectionIndex, config });
export const sortSections = (items) => ({ type: SectionsTypes.SORT_SECTION, items });



const getConfig = (omr, section, images) => {
  let _rectangles = [];
  section.fields.forEach(field => {
    if (field.argument_details) {
      field.argument_details.forEach(option => {
        if (option.position) {
          _rectangles.push({
            isField: !1,
            field_id: field.field_id,
            value: option.value,
            rectangle: option.position,
            "total_rows": 1,
            "total_cells": 1,
            "width_edge": 0,
          })
        }
      })
    } else {
      if (field.position) {
        _rectangles.push({
          isField: !0,
          field_id: field.field_id,
          double_typing: field.double_typing,
          rectangle: field.position,
          "total_rows": 1,
          "total_cells": 1,
          "width_edge": 0,
        })
      }

    }
  }
  );
  let image = images.items[images.selectedIndex];
  let data = {
    image: image ? image.data : '',
    rectangles: _rectangles,
    pixel_threshold: omr.pixel_threshold,
    color_threshold: omr.color_threshold.rgb
  }
  return data;
}

const getResultTestOMR = (datas) => {
  let fieldResult = {};
  datas.forEach(rec => {
    let fieldId = rec.rectangle_info.field_id;
    let res = !!rec.results[0][0];
    let val = rec.rectangle_info.value;
    if (res) {
      if (val) {
        if (fieldResult[fieldId]) {
          fieldResult[fieldId] += `|${val}`
        } else {
          fieldResult[fieldId] = val;
        }
      } else {
        fieldResult[fieldId] = 1;
      }
    } else if (!val) {
      fieldResult[fieldId] = 0;
    }
  })
  return fieldResult;
}
const runingTest = () => ({ type: SectionsTypes.RUNING_TEST });
const runTestFailed = () => ({ type: SectionsTypes.RUN_TEST_FAILED });
const receiveRunTest = (fieldResult) => ({ type: SectionsTypes.RECEIVE_RUN_TEST, fieldResult });
const resetResutlOMR = () => ({ type: SectionsTypes.RESET_RUN_TEST_OMR });

export const runTestOMR = (omr, section) => async (dispatch, getState) => {
  dispatch(runingTest());
  let { images } = getState()[NAME_STORE];
  let data = getConfig(omr, section, images);
  let result = await XClient.omr.test(data);
  if (result.error) {
    dispatch(runTestFailed());
    dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.run_test_failed', { i18: !0 }));
  } else {
    let fieldResult = getResultTestOMR(result.payload)
    dispatch(receiveRunTest(fieldResult));
  }
}



export default {
  resetResutlOMR,
  runTestOMR,
  closeSetting,
  openSetting,
  changeSetting,
  resetSections,
  fetchIfNeeded,
  addSection,
  chooseSection,
  changeNameSection,
  changePositionSection,
  deletePositionOption,
  deleteSection,
  addField,
  deleteField,
  changePositionField,
  changePositionOption,
  sortFields,
  changeField,
  chooseField,
  chooseOption,
  updateIdSections,
  sortSections,  
  changeSettingField,
}
