import reducer from './field_list_reducer';

import * as types from '../constants/field_constants';

const initialState = {
  fields: [],
  is_fetching: false
};

describe('FIELD LIST REDUCER', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('TYPE FIELD_LIST_REQUEST', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_LIST_REQUEST
        }
      )
    ).toEqual({
      is_fetching: true,
      fields: []
    });
  });

  it('TYPE FIELD_LIST_SET_DATAS', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_LIST_SET_DATAS,
          fields: [
            {
              id: '1',
              field_name: 'birth',
              field_display: 'Birth',
              data_type: 'textfield',
              visible: true
            }
          ]
        }
      )
    ).toEqual({
      fields: [
        {
          id: '1',
          field_name: 'birth',
          field_display: 'Birth',
          data_type: 'textfield',
          visible: true
        }
      ],
      is_fetching: false
    });
  });

  it('TYPE FIELD_LIST_RESET_DATA', () => {
    expect(
      reducer(
        {},
        {
          type: types.FIELD_LIST_RESET_DATA
        }
      )
    ).toEqual(initialState);
  });
});
