import React, { useState,useEffect } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Groupfield from './group_field'
import clone from 'clone'
const initialStateField = { value: "", section: "", rule: "", field: "" }

const dialog_cru_group = (props) => {
   const {
      fieldList,
      fieldMap,
      sections,
      onClose,
      open,
      group = [],
      groupId,
      updateGroupField
   } = props;
   const [field, setField] = useState(initialStateField)// eslint-disable-line react-hooks/rules-of-hooks
const [fields, setFields] = useState(group);// eslint-disable-line react-hooks/rules-of-hooks
const [fieldId, setFieldId] = useState(-1);// eslint-disable-line react-hooks/rules-of-hooks
   useEffect(()=>{ // eslint-disable-line react-hooks/rules-of-hooks
      setFields(group);
      setFieldId(-1)
      setField(initialStateField);
   },[group])

   const handleSelectField = (id) => {
      setFieldId(id)
      if (id === -1) {
         setField({
            value: "",
            section: "",
            rule: "",
            field: ""
         })
      } else {
         setField({ ...fields[id] })
      }
   }
   const handleAddField = (field) => {
      setFields([...fields, field])
   }
   const handleRemoveField = (index) => {
      let _fields = clone(fields)
      _fields.splice(index, 1);
      setFields(_fields)
   }
   const handleEditField = (index, field) => {
      let _fields = clone(fields)
      _fields.splice(index, 1, field)
      setFields(_fields)
   }
   const onChangeAttrField = (key, value) => {
      setField(state => ({ ...state, [key]: value }))
   }
   const handleUpdateGroup = () => {
      updateGroupField(groupId, fields)
   }

   const actions = [
      <FlatButton
         label="Cancel"
         primary={true}
         onClick={_ => onClose()}
      />,
      <FlatButton
         label={groupId === -1 ? "ADD" : "UPDATE"}
         primary={true}
         keyboardFocused={true}
         onClick={handleUpdateGroup}
      />,
   ];
   return (
      <Dialog
         title="Update Group"
         actions={actions}
         modal={false}
         open={open}
         onRequestClose={_ => onClose()}
      >
         <Groupfield
            open={open}
            onEditField={handleEditField}
            onAddField={handleAddField}
            onRemoveField={handleRemoveField}
            onSelectField={handleSelectField}
            fieldList={fieldList}
            fieldMap={fieldMap}
            sections={sections}
            fields={fields}
            field={field}
            fieldId={fieldId}
            onChangeAttrField={onChangeAttrField}
         />
      </Dialog>
   )
}
export default React.memo(dialog_cru_group)
