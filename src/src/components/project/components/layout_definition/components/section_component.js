import React, { Component } from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { Card, CardText } from 'material-ui/Card';
import SectionHeader from './section_header';
import MenuField from './menu_field_component';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { isEqual } from 'lodash';

export default class Section extends Component {
  state = {
    expanded: true
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (!isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
    );
  }
  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };
  getFieldName(fields = []) {
    let rs = [];
    fields.forEach(field => {
      rs.push(field.name);
    });
  }
  setSectionContent = (node) => {
    this._content = node;
  }
  getFieldsMini = () => {
    const { section, fields } = this.props;
    if (section.fields && fields.map) {
      return section.fields.map((item) =>
        item.field_id && fields.map[item.field_id] &&
          fields.map[item.field_id].name ? fields.map[item.field_id].name : 'Not yet'
      ).join(', ')
    }
  }

  render() {
    const {
      fields,
      section,
      sections,
      fieldsChosen,
      indexSection,
      selectedFieldIndex,
      selectedOptionIndex,
      selected,
      style,
      addNodeField,
      sectionActions,
      postionOptionLast,
      positionFieldLast,
      positionSectionLast,
      layoutType
    } = this.props;
    let _fieldsChosen = {};
    if (layoutType === 'mixed') {
      section.field && section.fields.forEach(item => {
        _fieldsChosen[item.field_id] = true;
      })
    } else {
      _fieldsChosen = fieldsChosen;
    }
    return (
      <Card
        zDepth={selected ? 3 : 1}
        ref={this.setSectionContent}
        style={{ ...style, margin: '0 14px 25px 16px' }}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >


        <SectionHeader
          section={section}
          sections={sections}
          selected={selected}
          expanded={this.state.expanded}
          onExpanding={this.handleExpandChange}
          onSelect={(isChoose) => sectionActions.chooseSection(isChoose ? indexSection : -1)}
          onChangePosition={() => sectionActions.changePositionSection(indexSection, section.position ? undefined : positionSectionLast)}
          onChangeSectionName={name => sectionActions.changeNameSection(indexSection, name)}
          onOpenSetting={() => sectionActions.openSetting(indexSection)}
          onClose={() => sectionActions.deleteSection(indexSection)}
        />
        {!this.state.expanded ? <Divider /> : null}
        {!this.state.expanded ? <Subheader>Fields ({section.fields && section.fields.length ? section.fields.length : 0})</Subheader> : null}
        {this.state.expanded
          ?
          <RaisedButton
            style={{ marginLeft: 16 }}
            primary={true}
            label={
              <Translate value="projects.layout_definitions.button.add_field" />
            }
            icon={<ContentAdd />}
            onClick={() => {
              sectionActions.addField(indexSection);
            }}
          />
          :
          <CardText>
            {this.getFieldsMini()}
          </CardText>}
        <CardText expandable={true}>
          <MenuField
            Translate={Translate}
            I18n={I18n}
            items={section.fields}
            fields={fields}
            sections={sections}
            fieldsChosen={_fieldsChosen}
            addNodeField={addNodeField}
            onChangeItem={(indexField, fieldId, previousId, argument_details) => sectionActions.changeField(indexSection, indexField, fieldId, previousId, argument_details)}
            selectedIndex={selected ? selectedFieldIndex : -1}
            selectedOptionIndex={selectedOptionIndex}
            onSelectItem={index => sectionActions.chooseField(indexSection, index)}
            onSelectOption={(fieldIndex, optionIndex) => sectionActions.chooseOption(indexSection, fieldIndex, optionIndex)}
            onSortEnd={items => sectionActions.sortFields(indexSection, items)}
            selectedItem={section}
            changePosition={fieldIndex => {
              sectionActions.changePositionField(indexSection, fieldIndex, section.fields[fieldIndex].position ? undefined : positionFieldLast)
            }}
            changePositionOption={(fieldIndex, optionIndex, hasPosition) => {
              sectionActions.changePositionOption(indexSection, fieldIndex, optionIndex, hasPosition ? undefined : postionOptionLast)
            }}
            changeSettingField={(fieldIndex, setttings) => {
              sectionActions.changeSettingField(indexSection, fieldIndex,setttings)
            }
            }
          />
        </CardText>

      </Card>
    );
  }
}


