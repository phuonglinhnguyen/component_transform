import { NAMESPACE_MODULE } from '../constant';
import _layoutTypes from './layout_types';
import _LayoutsTypes from './layouts_types';
import _sectionsTypes from './sections_types';
import _fieldsTypes from './fields_types';
import _imagesTypes from './images_types';

export const RESET_ALL = `${NAMESPACE_MODULE}_RESET_ALL`;

export const LayoutTypes = _layoutTypes;
export const LayoutsTypes = _LayoutsTypes;
export const SectionsTypes = _sectionsTypes;
export const FieldsTypes = _fieldsTypes;
export const ImagesTypes = _imagesTypes;



export default {
  RESET_ALL,
  LayoutTypes,
  LayoutsTypes,
  SectionsTypes,
  FieldsTypes,
  ImagesTypes,
};
