import React, { Component } from 'react';
import Drawer from '../components/view_images';
import AutoResize from '../../../../common/layout/auto_size_decorator';
import LayoutSeparate from '../../../../common/layout/layout_separate';
import MenuController from './menu_controller';
import { getShapeOfSections } from '../actions/common_action';
import { isEqual } from 'lodash';
import Paper from 'material-ui/Paper';
const DrawerAutoResize = AutoResize(Drawer);
const MenuControllerAutoResize = AutoResize(MenuController);
class LayoutItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (!isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
    )

  }
  render() {
    const {
      theme,
      layout,
      info,
      fields,
      images,
      sections,
      notifyActions,
      layoutActions,
      sectionActions,
      imageActions,
    } = this.props;
    let _shapes = getShapeOfSections(sections.items, fields);
    let selectedShapeIndex = -1;
    if (sections.selectedFieldIndex > -1) {
      if (sections.selectedOptionIndex > -1) {
        selectedShapeIndex = _shapes.findIndex(shape => (
          sections.selectedFieldIndex === shape.fieldIndex
          && sections.selectedIndex === shape.sectionIndex
          && sections.selectedOptionIndex === shape.optionIndex
        )
        )
      } else {
        selectedShapeIndex = _shapes.findIndex(shape => (
          sections.selectedFieldIndex === shape.fieldIndex
          && sections.selectedIndex === shape.sectionIndex
        )
        )
      }

    } else {
      selectedShapeIndex = _shapes.findIndex(shape => (sections.selectedIndex === shape.sectionIndex && !shape.isField))
    }
    return (
      <LayoutSeparate
        viewType={1}
        first={
          <Paper style={{width:'calc(100% - 16px)',height:'calc(100% - 26px)', margin:'16px 0 0 16px'}} zDepth={1} >
          <DrawerAutoResize
            muiTheme={theme}
            images={images.items}
            imageSelectIndex={images.selectedIndex}
            onImageLoad={imageActions.addImage}
            onSelectImage={imageActions.selectImage}
            onDeleteImage={imageActions.deleteImage}
            shapes={_shapes}
            shapeSelectIndex={selectedShapeIndex}
            onSelectShape={(index, shape) => {
              if (shape) {
                if (shape.isField) {
                  if (sections.selectedIndex !== shape.sectionIndex
                    || sections.selectedFieldIndex !== shape.fieldIndex
                    || sections.selectedOptionIndex > -1) {
                    // sectionActions.chooseSection(-1)
                    sectionActions.chooseField(shape.sectionIndex, shape.fieldIndex);
                  }
                } else if (shape.isOption) {
                  if (sections.selectedIndex !== shape.sectionIndex
                    || sections.selectedFieldIndex !== shape.fieldIndex
                    || sections.selectedOptionIndex !== shape.optionIndex) {
                    // sectionActions.chooseSection(-1)
                    sectionActions.chooseOption(shape.sectionIndex, shape.fieldIndex, shape.optionIndex);
                  }
                } else {
                  if (sections.selectedIndex !== shape.sectionIndex
                    || sections.selectedFieldIndex > -1) {
                    // sectionActions.chooseSection(-1)
                    sectionActions.chooseSection(shape.sectionIndex)
                  }
                }
              } else {
                if (sections.selectedIndex !== -1) {
                  sectionActions.chooseSection(-1)
                }
              }
            }}
            onDeleteShape={() => undefined}
            updateSizeShape={(index, shape) => {
              if (shape) {
                if (shape.isField) {
                  sectionActions.changePositionField(shape.sectionIndex, shape.fieldIndex, { x: shape.x, y: shape.y, w: shape.w, h: shape.h });
                } else if (shape.isOption) {
                  sectionActions.changePositionOption(shape.sectionIndex, shape.fieldIndex, shape.optionIndex, { x: shape.x, y: shape.y, w: shape.w, h: shape.h });
                } else {
                  sectionActions.changePositionSection(shape.sectionIndex, { x: shape.x, y: shape.y, w: shape.w, h: shape.h })
                }
              } else {
                sectionActions.chooseSection(-1)
              }
            }}
          />
          </Paper>
        }
        second={<MenuControllerAutoResize
          layout={layout}
          info={info}
          fields={fields}
          sections={sections}
          notifyActions={notifyActions}
          layoutActions={layoutActions}
          sectionActions={sectionActions}
        />}
      />
    );
  }
}
export default LayoutItem;
