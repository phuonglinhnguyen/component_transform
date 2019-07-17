import reducer from './field_dialog_reducer';

import * as types from '../constants/field_constants';

describe('FIELD DIALOG REDUCER', () => {
  it('should return the initial state', () => {
    const initialState = {
      open_dialog: false,
      title_dialog: '',
      handleClickSubmit: null,
      label_button_dialog: ''
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('TYPE SET_DIALOG', () => {
    const input = {
      type: types.FIELD_ITEM_SET_DIALOG,
      open_dialog: true,
      title_dialog: 'SAVE',
      handleClickSubmit: null,
      label_button_dialog: 'SAVE'
    };

    const result = {
      open_dialog: true,
      title_dialog: 'SAVE',
      handleClickSubmit: null,
      label_button_dialog: 'SAVE'
    };

    expect(reducer({}, input)).toEqual(result);
  });
});
