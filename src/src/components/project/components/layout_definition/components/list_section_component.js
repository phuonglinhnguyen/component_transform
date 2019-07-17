import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SectionComponent from './section_component';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import {isEqual} from 'lodash';
export default class MenuLayout extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  componentDidUpdate(prevProps, prevState) {
    let node;
    if (this.props.sections.selectedIndex > 0) {
      if (this.props.sections.selectedFieldIndex > 0) {
        if (this.props.sections.selectedFieldIndex !== prevProps.sections.selectedFieldIndex) 
          node = findDOMNode(this._refs[this.props.sections.selectedIndex][this.props.sections.selectedFieldIndex]);
        }
      else {
        if (this.props.sections.selectedIndex !== prevProps.sections.selectedIndex) {
          node = findDOMNode(this._refs[this.props.sections.selectedIndex].section);
        }
      }
    }
    if (node) {
      scrollIntoViewIfNeeded(node, true, {duration: 150});
    }
  }
  _addRef(node, sectionIndex, fieldIndex) {
    this._refs = this._refs || {};
    this._refs[sectionIndex] = this._refs[sectionIndex] || {};
    if (fieldIndex) {
      this._refs[sectionIndex][fieldIndex] = node;
    } else {
      this._refs[sectionIndex].section = node;
    }
  }

  render() {
    const {sections, fields, height, sectionActions, layoutType} = this.props;
    return (
      <div
        style={{
        width: '100%',
        height: height,
        position: 'relative',
      }}>
      <div
        style={{
          background:'rgba(209,211,212,0.5)',
          width: 'calc(100% - 32px)',
            height: '62px',
            position: 'relative',
            display: 'block',
            border: '2px dashed rgba(0,0,0,0.5)',
            verticalAlign: 'middle',
            marginLeft:16
        }}>
          <FloatingActionButton
            style={{
            position: 'absolute',
            top: 2,
            left: 4
          }}
            onClick={(e) => {
            e
              .target
              .blur();
            sectionActions.addSection();
          }}>
            <ContentAdd/>
          </FloatingActionButton>
          <span
            style={{
            position: 'absolute',
            top: 24,
            left: 150,
            color: 'rgba(0,0,0,0.36)'
          }}>
            <span>ADD NEW SECTION</span>
          </span>
        </div>
        <div
          style={{
          width: '100%',
          overflowY: 'auto',
          height: 'calc(100% - 82px)',
          marginTop: 16,
        }}>
          {sections
            .items
            .map((item, index) => {
              return (<SectionComponent
                ref={node => this._addRef(node, index)}
                addNodeField={(indexField, node) => this._addRef(node, index, indexField)}
                key={index}
                layoutType={layoutType}
                sections={sections}
                selected={index === sections.selectedIndex}
                selectedFieldIndex={sections.selectedFieldIndex}
                selectedOptionIndex={sections.selectedOptionIndex}
                fieldsChosen={sections.fieldsChosen}
                positionSectionLast={sections.positionSectionLast}
                positionFieldLast={sections.positionFieldLast}
                postionOptionLast={sections.postionOptionLast}
                indexSection={index}
                section={item}
                fields={fields}
                sectionActions={sectionActions}/>);
            })}
        </div>
      </div>
    );
  }
}
