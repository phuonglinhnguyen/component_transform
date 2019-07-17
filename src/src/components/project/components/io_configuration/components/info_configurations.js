import React from 'react'
import Checkbox from 'material-ui/Checkbox';
import { Translate } from 'react-redux-i18n';
import { IO_SUPPORT, IO_TITLE, IO_HIDDEN } from '../constants';
export const InfoConfiguration = (props) => {
  const {
    infoConfig = [],
    selected = [],
    addSelecteConfiguration,
    removeSelectedConfiguration,
    projectId, // eslint-disable-line no-unused-vars
    isFile,
  } = props;

  let relations = infoConfig.relationship_configuration || {};
  let countInfo = infoConfig.configurations || {
    'field_value_definitions': 0,
    'layout_definitions': 0,
    'section_definitions': 0,
    'acquisitors': 0,
    'upload_configurations': 0,
    'project_workflow': 0,
    'response_evaluations': 0,
    'project_users': 0,
    'export_configurations': 0
  }
  const getConfigsdependentOnThis = (configName, relationShip) => {
    let dependThis = {};
    Object.keys(relationShip).forEach(key => {
      let depends = relationShip[key]
      if (Array.isArray(depends) && depends.includes(configName) || depends === configName) {// eslint-disable-line  no-mixed-operators
        dependThis[key] = 1;
        let dependsSub = getConfigsdependentOnThis(key, relationShip);
        dependsSub.forEach(subKey => {
          dependThis[subKey] = 1;
        })
      }
    })
    return Object.keys(dependThis);
  }
  const getThisdependentConfigs = (configName, relationShip) => {
    let dependentsResult = {}
    let dependents = relationShip[configName];
    if (Array.isArray(dependents)) {
      dependents.forEach(key => {
        dependentsResult[key] = 1;
        let subDependents = getThisdependentConfigs(key, relationShip);
        subDependents.forEach(subKey => {
          dependentsResult[subKey] = 1;
        })
      })
    } else if (typeof dependents === 'string') {
      dependentsResult[dependents] = 1;
      let subDependents = getThisdependentConfigs(dependents, relationShip);
      subDependents.forEach(subKey => {
        dependentsResult[subKey] = 1;
      })
    }
    return Object.keys(dependentsResult);
  }
  const onChangeCheckListItem = (event, isInputChecked, configName) => {
    if (isInputChecked) {
      let depends = getThisdependentConfigs(configName, relations)
      depends.push(configName)
      addSelecteConfiguration(depends)
    } else {
      let depends = getConfigsdependentOnThis(configName, relations)
      depends.push(configName)
      removeSelectedConfiguration(depends)
    }
  }
  let result = []
  let disable = !infoConfig.configurations
  
  Object.keys(IO_SUPPORT).forEach(key => {
    if (!IO_HIDDEN.includes(IO_SUPPORT[key])) {
      let count = isFile ? countInfo[IO_SUPPORT[key]] && countInfo[IO_SUPPORT[key]].length || 0 : countInfo[IO_SUPPORT[key]]
     
      result.push(
          <Checkbox  //material-ui:v0.19.1 when disabled checkbox not fixed React-16  :https://github.com/mui-org/material-ui/issues/8443
            key={`configuration-${key}`}
            label={<Translate value={IO_TITLE[IO_SUPPORT[key]]} count={count} />}
            checked={selected.includes(IO_SUPPORT[key])}
            disabled={disable}
            style={{
              marginBottom: 16,
            }}
            onCheck={(event, isInputChecked) => onChangeCheckListItem(event, isInputChecked, IO_SUPPORT[key])}
          />)
    }
  })
  return result;
}
export default InfoConfiguration;