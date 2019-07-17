/**
 * @author nhhien@suho
 * @email nhhien@digi-texx.vn
 * @create date 2017-06-28 03:41:18
 * @modify date 2017-06-28 03:41:18
 * @desc libaries support
*/

//eslint-disable-line no-unused-vars
//eslint-disable-line no-unused-expressions
//eslint-disable-line no-sequences
import Shape from '../../../../common/canvas/modules/shape';
export const getShapeOfSections = (sections, fields) => {
  let _shapes = [];
  sections.forEach((section, sectionIndex) => {
    if (section.position) {
      let nameSection = `Section: ${section.name || `(${sectionIndex})`}`;
      let _shape = new Shape(section.position.x, section.position.y, section.position.w, section.position.h, nameSection);
      _shape.sectionIndex = sectionIndex;
      _shapes.push(_shape);
    }
    if (section.fields && section.fields.length > 0) {
      section.fields.forEach((field, fieldIndex) => {
        if (field.position) {
          let fieldName = '';
          try {
            fieldName = fields.isFetching ? ' Fetching...' : field.field_id && fields.map && fields.map[field.field_id].name ? fields.map[field.field_id].name : `(${field.field_id || fieldIndex})`
          } catch (error) {
            fieldName=`${field.field_id} have removed`
          }
          fieldName = `Field: ${fieldName}`;
          let _shape = new Shape(field.position.x, field.position.y, field.position.w, field.position.h, fieldName);
          _shape.sectionIndex = sectionIndex;
          _shape.fieldIndex = fieldIndex;
          _shape.isField = !0;
          _shapes.push(_shape);
          
        }
        if (field.argument_details) {
          field.argument_details.forEach((option, optionInddex) => {
            if (option.position) {
              let optionName = fields.isFetching ? ' Fetching...' : option.value;
              optionName = `${field.field_id && fields.map && fields.map[field.field_id].name && fields.map[field.field_id].name ? fields.map[field.field_id].name + '_' : ''}${optionName}`;
              let _shape = new Shape(option.position.x, option.position.y, option.position.w, option.position.h, optionName);
              _shape.sectionIndex = sectionIndex;
              _shape.fieldIndex = fieldIndex;
              _shape.optionIndex = optionInddex;
              _shape.isOption = !0;
              _shapes.push(_shape);
            }
          });
        }
      })
    }
  })
  return _shapes;
}
export const equalField = (field1, field2) => {
  return (
    (field1.field_id && field1.field_id === field2.field_id) ||
    (field1.time && field1.time === field2.time)
  );
};
export const matchName = name => item => name === item.name;
export const getNewName = (name, items) => {
  let index = 1;
  let rs;
  while (index < 20000) {
    rs = `${name}-${index}`;
    let hasItem = items.filter(matchName(rs));
    if (hasItem.length > 0) {
      index++;
    } else {
      return rs;
    }
  }
};
export const parseListToObject = (key: string, items = []) => {
  let rs = {};
  if (items) {
    items.forEach(item => {
      rs[item[key]] = item;
    });
  }
  return rs;
};

export const parseFieldsOfSection = (fields, sections) => {
  let rs = [];
  if (fields && fields.length > 0 && (sections && sections.length > 0)) {
    let fieldObject = parseListToObject('id', fields);
    sections.forEach(section => {
      if (section.fields && section.fields.length > 0) {
        section.fields.forEach(fieldPosition => {
          let field = fieldObject[fieldPosition.field_id];
          if (field) {
            rs.push({
              ...field,
              id: fieldPosition.id,
              name: field.name,
              position: fieldPosition.position,
              section: section
            });
          }
        });
      }
    });
  }
  return rs;
};

export const getListFieldFormMap = (fields = [], map = {}) => {
  let rs = [];
  fields.forEach(field => {
    if (!field.field_id && field.name) {
      rs.push({
        name: field.name,
        time: field.time,
        id: field.time,
        section: field.section,
        type: 'field',
        position: field.position
      });
    }
    if (map[field.field_id]) {
      let _field = map[field.field_id];
      rs.push({
        id: field.time,
        field_id: _field.id,
        time: field.time,
        section: field.section,
        type: 'field',
        name: _field.name,
        position: field.position
      });
    }
  });
  return rs;
};
export const debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  var debounced = function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};
/**
     * Simple is object check.
     * @param item
     * @returns {boolean}
     */
export const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
     * Deep merge two objects.
     * @param target
     * @param source
     */
export const mergeDeep = (target, source) => {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }
  return target;
};
export const mergeDeepPure = (object1, object2) => {
  if (isObject(object1) && isObject(object1)) {
    let o1 = Object.assign({}, object1);
    let o2 = Object.assign({}, object2);
    return mergeDeep(o1, o2);
  } else {
    return object1;
  }
};
export const parseShapeToPositionString = shape =>
  `${parseInt(shape.x, 0)},${parseInt(shape.y, 0)},${parseInt(
    shape.w,
    0
  )},${parseInt(shape.h, 0)}`;
export const parsePositionArrayToString = position => {
  if (!position) return;
  return `${parseInt(position[0], 0)},${parseInt(position[1], 0)},${parseInt(position[2], 0)},${parseInt(position[3], 0)}`;
}
export const matchId = id => component => id === component.id;
export const notMatchId = id => component => id !== component.id;
export const inIds = ids => component => ids.includes(component.id);
export const outIds = ids => component => !ids.includes(component.id);
export const validateSections = (sections) => {
  return sections.findIndex(item => !item.name || item.name.length === 0);
}
export const validateSectionsComflict = (sections) => {
  let rs = !1;
  let namesChecked = {};
  for (var index = 0; index < sections.length; index++) {
    let sectionName = sections[index].name.trim();
    if (namesChecked[sectionName]) {
      rs = !0;
      break;
    } else {
      namesChecked[sectionName] = !0;
    }
  }
  return rs;
}

export const getImage = (data={}) =>
 new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener('load', function () {
      resolve({err:null,image})
  }, false);
  image.addEventListener('error', function (err) {
    resolve({err:null,image:{width:1,height:1}})
  }, false);
  image.src = data.data;
})


   
