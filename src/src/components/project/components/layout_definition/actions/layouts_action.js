import { NAME_STORE, MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constant';
import { LayoutsTypes } from '../types';
import XClient from '../../../../common/api';
import { NotifyActions } from '../../../../common/notification';
import { Stringifier } from 'postcss';
export const resetLayouts = () => ({ type: LayoutsTypes.RESET });
export const fetching = () => ({ type: LayoutsTypes.FETCHING });

export const selectLayout = layoutId => ({ type: LayoutsTypes.SELECT, layoutId: layoutId });
export const invalidateLayouts = () => ({ type: LayoutsTypes.DID_INVALIDATION });
export const receiveLayouts = (payload) => ({ type: LayoutsTypes.RECEIVE, payload });

const countSection = async (projectId,layoutId) => {
  try {
    let sections = await XClient
      .section
      .list_of_layout(projectId,layoutId);
    let fieldsCount = 0;
    sections
      .payload
      .forEach(_section => {
        if (_section.fields) {
          fieldsCount += _section.fields.length;
        }
      });
    return { sections: sections.payload.length, fields: fieldsCount };
  } catch (e) {
    return { sections: 0, fields: 0 };
  }
}
const cloningLayout = (layout) => ({ type: LayoutsTypes.CLONING, layout })
const cloneLayoutFailed = (layout) => (dispatch) => {
  dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_clone_layout', {
    i18: !0
  }));
  dispatch({ type: LayoutsTypes.CLONE_FAILED, layout })
}
const cloneLayoutSuccess = (layout, layoutClone) => (dispatch) => {
  dispatch(NotifyActions.success('', 'projects.layout_definitions.message.success.clone_layout', {
    i18: !0
  }));
  dispatch({ type: LayoutsTypes.CLONE_SUCCESS, layout, layoutClone })
}
export const cloneLayout = (projectId,layout, layoutId) => async (dispatch, getState) => {
  dispatch(cloningLayout(layout));
  let _res = await XClient.layout.clone_layout(projectId,layout.id);
  if (_res.error) {
    dispatch(cloneLayoutFailed(layout));
  } else {
    dispatch(cloneLayoutSuccess(_res.payload, layout));
  }
};

export const fetchLayouts = (projectId, didInvalidate) => async (dispatch, getState) => {
  let _res = await XClient
    .layout
    .list_of_project(projectId);
  if (_res.error && _res.status !== 404) {
    if (didInvalidate === MAX_TRY_RELOAD - 1) {
      dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_get_list_layout', {
        i18: !0
      }));
    }
    dispatch(invalidateLayouts());
  } else {
    let awitLoad = []
    for (let index = 0; index < _res.payload.length; index++) {
      let element = _res.payload[index];
      awitLoad.push(countSection(projectId,element.id));
    }
    for (let indexAwait = 0; indexAwait < _res.payload.length; indexAwait++) {
      let count = await awitLoad[indexAwait];
      _res.payload[indexAwait] = Object.assign({}, _res.payload[indexAwait], count);
    }
    dispatch(receiveLayouts(_res.payload));
  }
};
const shouldFetch = layouts => {
  return (!layouts.isFetching && (layouts.didInvalidate < MAX_TRY_RELOAD) && !layouts.items)
};
export const fetchIfNeeded = info => (dispatch, getState) => {
  const { layouts } = getState()[NAME_STORE];
  const { projectId } = info;
  if (shouldFetch(layouts)) {
    dispatch(fetching());
    let _fetchLayouts = fetchLayouts(projectId, layouts.didInvalidate);
    if (layouts.didInvalidate > 0) {
      setTimeout(() => {
        dispatch(_fetchLayouts)
      }, TIME_TRY_RELOAD[layouts.didInvalidate] || TIME_TRY_LOAD);
    } else {
      dispatch(_fetchLayouts)
    }
  }
};
const deletingLayout = (layout) => ({ type: LayoutsTypes.DELETING, layout })

const deleteLayoutFailed = (layout) => (dispatch) => {
  dispatch(NotifyActions.error('', 'projects.layout_definitions.message.error.cant_delete_layout', {
    i18: !0
  }));
  dispatch({ type: LayoutsTypes.DELETE_FAILED, layout })
}
const deleteLayoutSuccess = (layout) => (dispatch) => {
  dispatch(NotifyActions.success('', 'projects.layout_definitions.message.success.deleted_layout', {
    i18: !0
  }));
  dispatch({ type: LayoutsTypes.DELETE_SUCCESS, layout })
}
export const deleteLayout = (projectId,layout) => async (dispatch, getState) => {
  dispatch(deletingLayout(layout));
  let _res = await XClient
    .layout
    .delete(projectId,layout.id);
  if (_res.error) {
    dispatch(deleteLayoutFailed(layout));
  } else {
    dispatch(deleteLayoutSuccess(layout));
  }
};

export default {
  cloneLayout,
  fetchIfNeeded,
  resetLayouts,
  selectLayout,
  deleteLayout
}