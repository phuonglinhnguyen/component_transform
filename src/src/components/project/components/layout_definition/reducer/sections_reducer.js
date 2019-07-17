import clone from 'clone';
import { SectionsTypes, RESET_ALL } from '../types';
const getFieldChosen = (sections) => {
  let rs = {};
  sections.forEach((section) => {
    section.fields && section.fields.forEach((field => rs[field.field_id] = !0))
  });
  return rs;
}
const initialState = {
  isTestingOMR: !1,
  testOMRFailed: !1,
  omrTestResult: null,
  isFetching: !1,
  openSetting: !1,
  settingSectionIndex: -1,
  didInvalidate: 0,
  items: [],
  fieldsChosen: {},
  selectedIndex: -1,
  delectedSections: [],
  selectedFieldIndex: -1,
  selectedOptionIndex: -1,
  positionSectionLast: { x: 100, y: 100, w: 500, h: 250 },
  positionFieldLast: { x: 100, y: 100, w: 500, h: 250 },
  postionOptionLast: { x: 100, y: 100, w: 500, h: 250 },
}

export default function (state = clone(initialState), action) {
  switch (action.type) {
    case SectionsTypes.FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case SectionsTypes.RECEIVE:
      return {
        ...state,
        items: action.items,
        initial: action.items,
        fieldsChosen: getFieldChosen(action.items),
        layoutId: action.layoutId,
        didInvalidate: 0,
        isFetching: false,
      };
    case SectionsTypes.DID_INVALIDATION:
      let _i = state.didInvalidate + 1;
      return {
        ...state,
        didInvalidate: _i
      };
    case SectionsTypes.ADD:
      {
        let _items = clone(state.items);
        _items.push({
          index: _items.length,
          name: '',
          layout_id: '',
          active: !0,
          fields: [],
          position: {},
          position_percent: {},
          settings: {
            is_multiple: false,
          },
          created_date: Date.now(),
        })
        return {
          ...state,
          items: _items,
          selectedIndex: state.selectedIndex + 1
        }
      }
    case SectionsTypes.CHOOSE:
      {
        return {
          ...state,
          selectedFieldIndex: -1,
          selectedIndex: typeof action.sectionIndex === 'number' ?
            action.sectionIndex
            : -1,
        }
      }

    case SectionsTypes.CHOOSE_FIELD:
      {
        return {
          ...state,
          selectedIndex: action.sectionIndex,
          selectedFieldIndex: action.fieldIndex,
          selectedOptionIndex: -1,
        }
      }
    case SectionsTypes.CHOOSE_OPTION:
      {
        return {
          ...state,
          selectedIndex: action.sectionIndex,
          selectedFieldIndex: action.fieldIndex,
          selectedOptionIndex: action.optionIndex
        }
      }
    case SectionsTypes.CHANGE_NAME:
      {
        let _items = clone(state.items);
        _items[action.sectionIndex].name = action.name;
        return { ...state, items: _items }
      }
    case SectionsTypes.CHANGE_POSITION:
      {
        let _items = clone(state.items);
        _items[action.sectionIndex].position = action.position;
        let _positionLast = clone(state.positionSectionLast);
        if (action.position) {
          _positionLast = {
            ...action.position,
            x: action.position.x + 20,
            y: action.position.y + 20
          };
        }
        return { ...state, items: _items, positionSectionLast: _positionLast }
      }



    case SectionsTypes.OPEN_SETTING:
      {
        return {
          ...state,
          settingSectionIndex: action.sectionIndex,
          openSetting: !0
        }
      }
    case SectionsTypes.CLOSE_SETTING:
      {
        return {
          ...state,
          settingSectionIndex: -1,
          openSetting: !1,
          isTestingOMR: !1,
          testOMRFailed: !1,
          omrTestResult: null
        }
      }

    case SectionsTypes.CHANGE_SETTING:
      {
        let _items = clone(state.items);
        let _item = _items[action.sectionIndex];
        if (action.config.double_typing) {
          _item.fields && _item.fields.forEach(field => {
            if (action
              .config
              .double_typing
              .fields.indexOf(field.field_id) > -1) {
              field.double_typing = true;
            } else {
              delete field.double_typing
            }
          })
          action.config.double_typing = true;
        } else {
          _item.fields && _item.fields.forEach(field => {
            field.double_typing = false;
          })
        }
        if(action.config.validation){
          _item.validation = action.config.validation;
          delete action.config.validation;
        }
        if (action.config.visible) {
          _item.fields && _item.fields.forEach(field => {
            if (action
              .config
              .visible
              .fields.indexOf(field.field_id) > -1) {
              field.visible = true;
            } else {
              field.visible = false;
            }
          })
          delete action.config.visible;
        } else {
          _item.fields && _item.fields.forEach(field => {
            field.visible = false;
          })
        }
        if (action.config.disable) {
          _item.fields && _item.fields.forEach(field => {
            if (action
              .config
              .disable
              .fields.indexOf(field.field_id) > -1) {
              field.disable = true;
            } else {
              field.disable = false;
            }
          })
          delete action.config.disable;
        } else {
          _item.fields && _item.fields.forEach(field => {
            field.disable = false;
          })
        }

        if (action.config.disable_auto_fill_ocr) {
          _item.fields && _item.fields.forEach(field => {
            if (action
              .config
              .disable_auto_fill_ocr
              .fields.indexOf(field.field_id) > -1) {
              field.disable_auto_fill_ocr = true;
            } else {
              field.disable_auto_fill_ocr = false;
            }
          })
          delete action.config.disable_auto_fill_ocr;
        } else {
          _item.fields && _item.fields.forEach(field => {
            field.disable_auto_fill_ocr = false;
          })
        }


        if (action.config.switch_disable) {
          _item.fields && _item.fields.forEach(field => {
            if (action
              .config
              .switch_disable
              .fields.indexOf(field.field_id) > -1) {
              field.switch_disable = true;
            } else {
              field.switch_disable = false;
            }
          })
          delete action.config.switch_disable;
        } else {
          _item.fields && _item.fields.forEach(field => {
            field.switch_disable = false;
          })
        }
        _item.active = action.config.active
        delete action.config.active;
        _item.settings = action.config;
        return {
          ...state,
          items: _items,
          isTestingOMR: !1,
          testOMRFailed: !1,
          omrTestResult: null
        }
      }

    case SectionsTypes.DELETE_SECTION:
      {
        let _items = clone(state.items);
        let _delectedSections = clone(state.delectedSections);
        let _fieldsChosen = clone(state.fieldsChosen);
        let _item = _items[action.sectionIndex];
        _item.fields && _item.fields.length > 0 && _item.fields.forEach(
          field => { _fieldsChosen[field.field_id] = !1; }
        );
        let sectiondeleted = _items.splice(action.sectionIndex, 1);
        if (sectiondeleted[0].id) {
          _delectedSections.push(sectiondeleted[0].id);
        }
        let _length = _items.length;
        return {
          ...state, items: _items,
          fieldsChosen: _fieldsChosen,
          delectedSections: _delectedSections,
          selectedIndex:
            action.sectionIndex > _length - 1 ?
              _length - 1
              : action.sectionIndex,
        }
      }
    case SectionsTypes.ADD_FIELD:
      {
        let _items = clone(state.items);
        let _item = _items[action.sectionIndex];
        _item.fields = _item.fields || [];
        _item.fields.push({
          field_id: '',
          visible: !0,
          disable: !1,
          double_typing: !1,
          argument_details: [],
          position: {},
          position_percent: {},
          created_date: Date.now()
        })
        return {
          ...state,
          items: _items,
          selectedFieldIndex: state.selectedFieldIndex + 1
        }
      }

    case SectionsTypes.DELETE_POSITION_OPTION:
      {
        let _items = clone(state.items);
        let _argument_details = _items[action.sectionIndex]
          .fields[action.fieldIndex]
          .argument_details;
        _argument_details[action.optionIndex].position = undefined;
        let _selectedOptionIndex = -1
        if (_argument_details[action.optionIndex + 1]
          && _argument_details[action.optionIndex + 1].position) {
          _selectedOptionIndex = action.optionIndex + 1
        } else if (_argument_details[action.optionIndex - 1]
          && _argument_details[action.optionIndex - 1].position) {
          _selectedOptionIndex = action.optionIndex - 1;
        } else {
          _selectedOptionIndex = _argument_details.findIndex(
            (option) => !!option.position
          );
        }
        return {
          ...state,
          items: _items,
          selectedOptionIndex: _selectedOptionIndex,
        }
      }


    case SectionsTypes.DELETE_FIELD:
      {
        let _items = clone(state.items);
        let _fieldsChosen = clone(state.fieldsChosen);
        let _item = _items[action.sectionIndex];
        _item.fields = _item.fields || [];
        let fieldDeleted = _item.fields.splice(action.fieldIndex, 1);
        fieldDeleted.length > 0 && (_fieldsChosen[fieldDeleted[0].field_id] = !1)
        let _length = _item.fields.length;
        return {
          ...state, items: _items,
          fieldsChosen: _fieldsChosen,
          selectedFieldIndex:
            action.fieldIndex > _length - 1 ?
              _length - 1
              : action.fieldIndex,
        }
      }
    case SectionsTypes.SORT_FIELDS:
      {
        let _items = clone(state.items);
        let _item = _items[action.sectionIndex];
        _item.fields = action.fields;
        return { ...state, items: _items }
      }

    case SectionsTypes.SORT_SECTION:
      {
        return { ...state, items: action.items }
      }

    case SectionsTypes.CHANGE_FIELD:
      {
        let _items = clone(state.items);
        let _fieldsChosen = clone(state.fieldsChosen);
        let _field = _items[action.sectionIndex].fields[action.fieldIndex];
        _field.field_id = action.fieldId;

        if (action.argument_details) {
          _field.argument_details = action.argument_details.map(
            val => ({ value: val })
          )
        } else if (_field.argument_details) {
          _field.argument_details = undefined;
        }
        if (action.previousId) {
          _fieldsChosen[action.previousId] = undefined;
        }
        _fieldsChosen[action.fieldId] = !0;

        return { ...state, items: _items, fieldsChosen: _fieldsChosen }
      }
    case SectionsTypes.CHANGE_POSITION_FIELD:
      {
        let _items = clone(state.items);
        _items[action.sectionIndex]
          .fields[action.fieldIndex].position = action.position;
        let _positionLast = clone(state.positionFieldLast);
        if (action.position) {
          _positionLast = {
            ...action.position,
            x: action.position.x + 20,
            y: action.position.y + 20
          };
        }
        return { ...state, items: _items, positionFieldLast: _positionLast };
      }

      case SectionsTypes.CHANGE_SETTING_FIELD:
      {
        let _items = clone(state.items);
        if(_items[action.sectionIndex].fields[action.fieldIndex]){
          _items[action.sectionIndex].fields[action.fieldIndex] ={
            ..._items[action.sectionIndex].fields[action.fieldIndex],
            ...action.settings
          }
        }

        return { ...state, items: _items};
      }

      
    case SectionsTypes.CHANGE_POSITION_OPTION:
      {
        let _items = clone(state.items);
        _items[action.sectionIndex]
          .fields[action.fieldIndex]
          .argument_details[action.optionIndex].position = action.position;
        let _positionLast = clone(state.postionOptionLast);
        if (action.position) {
          _positionLast = {
            ...action.position,
            x: action.position.x + 20,
            y: action.position.y + 20
          };
        }
        return {
          ...state,
          items: _items,
          postionOptionLast: _positionLast
        };
      }
    case SectionsTypes.UPDATE_ID_FOR_ADD:
      {
        let _items = clone(state.items);
        return {
          ...state,
          items: _items.map(
            item => ({
              ...item,
              id: item.id || action.updateId[item.name]
            })
          )
        };
      }


    case SectionsTypes.RUNING_TEST: {
      return { ...state, isTestingOMR: !0, testOMRFailed: !1 };
    }
    case SectionsTypes.RUN_TEST_FAILED: {
      return { ...state, isTestingOMR: !1, testOMRFailed: !0 };
    }
    case SectionsTypes.RECEIVE_RUN_TEST: {
      return {
        ...state, isTestingOMR: !1, testOMRFailed: !1,
        omrTestResult: action.fieldResult,
      };
    }
    case SectionsTypes.RESET_RUN_TEST_OMR: {
      return {
        ...state, isTestingOMR: !1, testOMRFailed: !1,
        omrTestResult: null,
      };
    }



    case SectionsTypes.RESET:
    case RESET_ALL:
      return clone(initialState);
    default:
      return state;
  }
}
