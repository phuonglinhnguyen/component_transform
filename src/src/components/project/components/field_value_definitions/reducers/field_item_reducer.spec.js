import reducer from './field_item_reducer';

import * as types from '../constants/field_constants';

const initial_field = {
  id: '0',
  name: '',
  field_display: '',
  default_value: '',
  control_type: '',
  tooltip: '',
  is_list: false,
  pattern: '',
  lookup_source: {
    language: '',
    table: '',
    filter: '',
    select_columns: []
  },
  validation: '',
  lookup_broadcast: [],
  value_broadcast: ''
};

const initialState = {
  is_error: false,
  is_fetching: false,

  field: { ...initial_field }
};

describe('FIELD ITEM REDUCER', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('TYPE FIELD_ITEM_REQUEST_DATA', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_ITEM_REQUEST_DATA
        }
      )
    ).toEqual({
      is_fetching: true
    });
  });

  it('TYPE FIELD_ITEM_RECEIVE_DATA', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_ITEM_RECEIVE_DATA,
          field: {
            data_type: 'textfield',
            field_display: 'Birth',
            field_name: 'birth',
            id: '1',
            visible: true
          },
          is_error: false
        }
      )
    ).toEqual({
      field: {
        data_type: 'textfield',
        field_display: 'Birth',
        field_name: 'birth',
        id: '1',
        visible: true
      },
      is_error: false,
      is_fetching: false
    });
  });

  it('TYPE FIELD_ITEM_MODIFY_DATA', () => {
    expect(
      reducer(
        {
          field: {
            data_type: 'textfield',
            field_display: 'Birth',
            field_name: 'birth',
            id: '1',
            visible: true
          }
        },
        {
          type: types.FIELD_ITEM_MODIFY_DATA,
          field: {
            data_type: 'textarea'
          }
        }
      )
    ).toEqual({
      field: {
        data_type: 'textarea'
      }
    });
  });

  it('TYPE FIELD_ITEM_INSERT_DATA', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_ITEM_INSERT_DATA,
          field: {
            data_type: 'textfield',
            field_display: 'Birth',
            field_name: 'birth',
            id: '1',
            visible: true
          }
        }
      )
    ).toEqual({
      field: {
        data_type: 'textfield',
        field_display: 'Birth',
        field_name: 'birth',
        id: '1',
        visible: true
      }
    });
  });

  it('TYPE FIELD_ITEM_RESET_DATA', () => {
    expect(reducer({}, { type: types.FIELD_ITEM_RESET_DATA })).toEqual(
      initialState
    );
  });
});
