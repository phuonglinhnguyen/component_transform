import {
  NAME_STORE,
  ACTION_CREATE,
  TIME_TRY_LOAD,
  MAX_TRY_RELOAD,
  TIME_TRY_RELOAD,
} from '../constant';
import { getImage } from './common_action'
import {
  LayoutTypes,
} from '../types';

import {
  resetALL,
} from './index';

import XClient from '../../../../common/api';
import { NotifyActions } from '../../../../common/notification';
import {
  addImage,
} from './image_action_creator';

import sectionActions from './sections_action';
import { gotoList } from './redirect_action';
export const resetLayout = () => ({ type: LayoutTypes.RESET });
export const fetching = () => ({ type: LayoutTypes.FETCHING });
export const saving = () => ({ type: LayoutTypes.SAVING });
export const didInvalidation = () => ({ type: LayoutTypes.DID_INVALIDATE });

const shouldFetch = (layout, layoutId) => {
  return (!layout.isFetching
    && (layout.didInvalidate < MAX_TRY_RELOAD)
    && layout.item.id !== layoutId)
};

const fetchLayout = (projectId, layoutId, didInvalidate) => async (dispatch, getState) => {
  let _res = await XClient.layout.get(projectId,layoutId);
  if (_res.error && _res.status !== 404) {
    if (didInvalidate === MAX_TRY_RELOAD - 1) {
      dispatch(NotifyActions.error('',
        'projects.layout_definitions.message.error.cant_get_layout',
        { i18: !0 }));
      setTimeout(() => { dispatch(gotoList()); }, 570)
    }
    dispatch(didInvalidation());
  } else {
    dispatch(addImage(_res.payload.sample_image))
    dispatch({ type: LayoutTypes.RECEIVE, item: _res.payload });
  }
};
export const fetchIfNeeded = info => (dispatch, getState) => {
  const { layoutId,projectId } = info;
  const { layout } = getState()[NAME_STORE];
  if (layoutId !== ACTION_CREATE)
    if (shouldFetch(layout, layoutId)) {
      dispatch(fetching());
      let _fetchLayout = fetchLayout(projectId,layoutId, layout.didInvalidate);
      if (layout.didInvalidate > 0) {
        setTimeout(() => {
          dispatch(_fetchLayout)
        }, TIME_TRY_RELOAD[layout.didInvalidate] || TIME_TRY_LOAD);
      } else {
        dispatch(_fetchLayout)
      }
    }
};


const changeName = (name) => ({ type: LayoutTypes.CHANGE_NAME, name })
const changeProp = (name, value) => ({ type: LayoutTypes.CHANGE_PROP, name, value })



const changeHotkey = (hot_key) => (
  {
    type: LayoutTypes.CHANGE_HOT_KEY,
    hot_key
  })
const changeNonCapture = (nonCapture) => (
  { type: LayoutTypes.CHANGE_NON_CAPUTE, nonCapture }
)

const requiredName = (isRequired) => (
  { type: LayoutTypes.REQUIRED_NAME, isRequired }
)
const deleteSections = async (projectId,sectionIds) => {
  let awaitDeleting = [];
  for (let index = 0; index < sectionIds.length; index++) {
    awaitDeleting.push(XClient.section.delete(projectId,sectionIds[index]));
  }
  for (let index = 0; index < sectionIds.length; index++) {
    await awaitDeleting[index];
  }
  return !0;
}
const getPostionPercent = (position, originalWidth, originalHeight) => {
  return {
    x: (position.x / originalWidth) * 100,
    y: (position.y / originalHeight) * 100,
    w: (position.w / originalWidth) * 100,
    h: (position.h / originalHeight) * 100
  }
}
const saveSections = async (projectId, sections, layoutId, originalWidth, originalHeight) => {
  let sectionAwaits = [];
  for (let index = 0; index < sections.length; index++) {
    let element = sections[index];
    let _section = {
      name: element.name,
      index,
      layout_id: layoutId,
      active: element.active,
      validation: element.validation,
      position: element.position,
      settings: element.settings,
      position_percent: element.position
        && getPostionPercent(element.position, originalWidth, originalHeight),
      fields: element.fields && element.fields.map(field => {
        return {
          field_id: field.field_id,
          visible: field.visible,
          disable: field.disable,
          copy_field: field.copy_field,
          dynamic_by_field:field.dynamic_by_field,
          shortcut_copy_field:field.shortcut_copy_field,
          shortcut_copy:field.shortcut_copy,
          shortcut_focus:field.shortcut_focus,
          shortcut_focus_field:field.shortcut_focus_field,
          switch_disable: field.switch_disable,
          double_typing: field.double_typing,
          disable_auto_fill_ocr: field.disable_auto_fill_ocr,
          argument_details: field.argument_details,
          special_land: element.settings?element.settings.special_land:'',
          position: field.position,
          position_percent: field.position
            && getPostionPercent(field.position, originalWidth, originalHeight),
        };
      })
    }
    let _sectionAwait;
    if (element.id) {
      _sectionAwait = XClient.section.update(projectId,element.id, _section);
    } else {
      _sectionAwait = XClient.section.add(projectId,_section);
    }
    sectionAwaits.push(_sectionAwait);
  }
  let rs = {
    failed: [],
    updateId: {},
  }
  for (let index = 0; index < sections.length; index++) {
    let _res = await sectionAwaits[index];
    if (_res.error) {
      rs.failed.push(sections[index].name);
    } else {
      if (!sections[index].id) {
        rs.updateId[sections[index].name] = _res.payload.id;
      }
    }
  }
  return rs;
}

const saveLayoutFailed = (error) => ({ type: LayoutTypes.SAVE_LAYOUT_FAILED, error });

const saveLayout = (info) => async (dispatch, getState) => {
  const { projectId, layoutId } = info;
  const { images, sections, layout } = getState()[NAME_STORE];
  let _layout = {
    name: layout.item.name,
    hot_key: layout.item.hot_key,
    type:layout.item.type,
    project_id: projectId,
    sample_image: images.items[images.selectedIndex]
  }
  let image = await getImage(_layout.sample_image)
  let originalWidth = image.image.width;
  let originalHeight = image.image.height;
  dispatch(saving());
  if (layoutId === ACTION_CREATE) {
    let _resLayout = await XClient.layout.add(projectId,_layout);
    if (_resLayout.error) {
      dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_save_layout', { i18: !0 }));
      if (_resLayout.status === 409) {
        dispatch(saveLayoutFailed('error.conflict'))
      }
    } else {
      await saveSections(projectId,sections.items, _resLayout.payload[0].id, originalWidth, originalHeight);
      dispatch(NotifyActions.success('', 'projects.layout_definitions.message.success.save_success', { i18: !0 }));
      setTimeout(() => {
        dispatch(resetALL())
      }, 500);
    }
  } else {
    let _resultLayoutAwait = XClient.layout.update(projectId,layoutId, _layout);
    let _resultSectionAwait = saveSections(projectId,sections.items, layoutId, originalWidth, originalHeight);
    sections.delectedSections && sections.delectedSections.length && deleteSections(projectId,sections.delectedSections)
    let _resultLayout = await _resultLayoutAwait;
    let _resultSection = await _resultSectionAwait;
    if (!_resultLayout.error && _resultSection.failed.length === 0) {
      dispatch(NotifyActions.success('', 'projects.layout_definitions.message.success.update_success', { i18: !0 }));
      dispatch({ type: LayoutTypes.SAVE_LAYOUT_SUCCESS })
    } else {
      if (_resultLayout.error) {
        if (_resultLayout.status === 409) {
          dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.conflict_layout', { i18: !0 }));
          dispatch(saveLayoutFailed('error.conflict'))
        } else if (_resultLayout.status === 500) {
          dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.network_error', { i18: !0 }));
          dispatch(saveLayoutFailed())
        } else {
          dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_update_layout', { i18: !0 }));
          dispatch(saveLayoutFailed())
        }
      } else {
        dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_update_sections', { i18: !0 }));
        dispatch(saveLayoutFailed())
      }
    }
    dispatch(sectionActions.updateIdSections(_resultSection.updateId))

  }
}


export default {
  fetchIfNeeded,
  changeProp,
  resetLayout,
  changeName,
  changeHotkey,
  requiredName,
  saveLayout,
  changeNonCapture,
}