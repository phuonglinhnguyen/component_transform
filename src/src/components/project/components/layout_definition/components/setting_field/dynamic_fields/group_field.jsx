import React, { useState ,useEffect} from 'react'
import {
   withStyles,
} from '@material-ui/core/styles'
import { SelectField, MenuItem } from 'material-ui';
import TextField from 'material-ui/TextField'
import AceEditor from 'react-ace';
import { COMPONENT_CHECKBOX, COMPONENT_COMBOBOX, COMPONENT_RADIO } from '../../../../../../../constants/previous';
import Add from 'material-ui/svg-icons/content/add';
import { RaisedButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

import { EFFECT_KEY, EFFECT_TITLE } from './constant'

const styles = {
};

const ListField = (props) => {
   const { fields, onRemoveField,
      value,
      onSelect
   } = props;
   return [
      <Subheader>Fields of Group</Subheader>,
      <div
         style={{ width: '100%', maxHeight: '250px', overflowY: 'auto' }}
      >
         <List>
            {fields.map((item, id) => (
               <ListItem
                  onClick={_ => onSelect(id)}
                  style={value === id && { backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                  rightIconButton={<IconButton onClick={_ => onRemoveField(id)} ><Delete /></IconButton>}
                  primaryText={`${item.section}-${item.field}-${EFFECT_TITLE[item.rule]}`}
                  secondaryText={item.value}
               />
            ))}
         </List>
      </div>
   ]
}



const RuleValue = ({ active, rule, field, value, onChange }) => {
   if (field && [COMPONENT_CHECKBOX, COMPONENT_COMBOBOX, COMPONENT_RADIO].includes(field.control_type)) {
      return (
         <SelectField
            style={{ left: 8 }}
            multiple={true}
            hintText="Select value"
            value={value}
            onChange={(event, i, value) => onChange(value)}
         >
            {
               field.argument_details.map(item => {
                  return (<MenuItem
                     key={item}
                     checked={value && value.includes(item)}
                     insetChildren={true}
                     value={item}
                     primaryText={item}
                  />)
               })
            }
         </SelectField>
      )
   }
   switch (rule) {
      case "must_equal":
      case "contain":
         return (
            <TextField
               onChange={event => onChange(event.target.value)}
               style={{ top: 0, left: 8 }}
               name='value'
               value={value}
               floatingLabelText="Value"
               hintText="e.g: Field value1;Field value2"
               floatingLabelFixed={true}
            />
         )
      case "regex":
         return (
            <TextField
               onChange={event => onChange(event.target.value)}
               style={{ top: 0, left: 8 }}
               name='value'
               value={value}
               floatingLabelText="Regex"
               hintText="e.g: /^/g"
               floatingLabelFixed={true}
            />
         )
      case "func":
         return (<AceEditor
            mode="javascript"
            theme="solarized_dark"
            name={"script"}
            fontSize={14}
            height="150px"
            width="100%"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={value || ''}
            editorProps={{ $blockScrolling: 'Infinity' }}
            onChange={newValue =>
               onChange(newValue)
            }
            enableBasicAutocompletion={true}
            enableSnippets={true}
         />)
         break;

      default:
         return (
            <TextField
               onChange={event => onChange(event.target.value)}
               style={{ top: 0, left: 8 }}
               disabled={!active}
               name='value'
               value={value}
               floatingLabelText="Value"
               hintText="e.g: Field value1;Field value2"
               floatingLabelFixed={true}
            />
         )
         break;
   }

}



const Groupfield = (props) => {
   const {
      sections,
      fieldMap = {},
      fieldList,
      field,
      fields = [],
      classes,
      onChangeAttrField,
      onSelectField,
      onRemoveField,
      onAddField,
      onEditField,
      open,
      fieldId,
   } = props;
   let fieldSelections = [];
   if (field.section) {
      fieldSelections = sections.filter(item => item.name === field.section)[0].fields.map((item) => {
         let _field = fieldMap[item.field_id]
         return (
            <MenuItem
               key={_field.name}
               insetChildren={true}
               value={_field.name}
               primaryText={_field.name}
            />
         )
      });
   }
   let fieldItem;
   if (field && field.field) {
      fieldItem = fieldList.filter(item => item.name === field.field)[0]
   }
   return (
      <div>
         <SelectField
            multiple={false}
            hintText="Lookup Section"
            floatingLabelText="Lookup Section"
            value={field.section}
            onChange={(event, index, value) => { onChangeAttrField( 'section', value) }}
         >
            {sections.map(item => <MenuItem key={item.name} value={item.name} primaryText={item.name} />)}

         </SelectField>
         <SelectField
            style={{ left: 8 }}
            multiple={false}
            hintText="Lookup field"
            floatingLabelText="Lookup field"
            value={field.field}
            onChange={(event, index, value) => { onChangeAttrField( 'field', value) }}
         >
            {fieldSelections}
         </SelectField>
         <RaisedButton
            style={{ marginTop: 5, minWidth: 45, height: 45 }}
            onClick={() => {
               if (fieldId !== -1) {
                  onEditField(fieldId, field)
               } else {
                  onAddField(field)
               }
               onSelectField(-1)
            }}
            label={fieldId === -1 ? 'Add' : 'Update'}
            icon={(fieldId === -1) && <Add />}
            primary={true}
         />
         {(fieldId !== -1) && <RaisedButton
            style={{ marginLeft: 5, minWidth: 45, height: 45 }}
            onClick={() => {
               onSelectField(-1)
            }}
            label={'Cancel'}
            secondary={true}
         />}
         <SelectField
            multiple={false}
            hintText="Rule"
            floatingLabelText="Rule"
            value={field.rule}
            onChange={(event, index, value) => onChangeAttrField('rule',value)}
         >
            <MenuItem value={EFFECT_KEY.MUST_EQUAL} primaryText={EFFECT_TITLE[EFFECT_KEY.MUST_EQUAL]} />
            <MenuItem value={EFFECT_KEY.CONTAIN} primaryText={EFFECT_TITLE[EFFECT_KEY.CONTAIN]} />
            <MenuItem value={EFFECT_KEY.REGEX} primaryText={EFFECT_TITLE[EFFECT_KEY.REGEX]} />
            <MenuItem value={EFFECT_KEY.FUNCTION} primaryText={EFFECT_TITLE[EFFECT_KEY.FUNCTION]} />
         </SelectField>
         <RuleValue field={fieldItem} rule={field.rule} onChange={(value) => { onChangeAttrField('value',value)}} value={field.value} />
         <Divider />
         <ListField value={fieldId} onSelect={onSelectField} fields={fields} onRemoveField={onRemoveField} />
      </div>
   )
}

export default React.memo(withStyles(styles)(Groupfield))
