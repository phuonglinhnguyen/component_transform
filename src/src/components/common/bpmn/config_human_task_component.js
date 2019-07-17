import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';

import ContentAddIcon from 'material-ui/svg-icons/content/add';
import ContentRemoveIcon from 'material-ui/svg-icons/content/clear';

import { parseJsonToParams } from './commons/parseJsonToParams';
import pre_defined_guis from '../../../resources/pre_defined_guis';

import { Translate } from 'react-redux-i18n';
import _ from 'lodash';

class ConfigScriptTask extends React.PureComponent {
  constructor(props) {
    super(props);

    const { data_config, layouts } = this.props;

    let data = parseJsonToParams(
      layouts,
      data_config,
      this.props.action_getSections
    );

    this.state = { ...data };
  }

  onLayoutChange(event, index, value) {
    this.props.action_getSections(index);

    this.setState({ layout_name: value, section_name: null });
  }

  onSectionChange(event, index, value) {
    this.setState({ section_name: value });
  }

  onInputChange(e) {
    this.setState({ input_data: e.target.value });
  }

  onEntryChange(e, i) {
    const entries = [...this.state.entries];
    entries[i][e.target.name] = e.target.value;

    this.setState({ entries });
  }

  onTaskChange(event, index, value) {
    this.setState({ task: value });
  }

  onTypeDataChange(event, index, value) {
    this.setState({ type_data: value });
  }

  addEntry() {
    const { entries } = this.state;
    this.setState({ entries: [...entries, { key: '', value: '' }] });
  }

  removeEntry(index) {
    let entries = this.state.entries.filter((e, i) => i !== index);
    this.setState({ entries });
  }

  getConfig({ viewer, moddle, element, project_id }) {
    const {
      task,
      layout_name,
      section_name = '',
      input_data,
      type_data,
      entries
    } = this.state;

    const node = viewer.get('elementRegistry').get(element.id);

    let extensionElements;
    if (node.businessObject && node.businessObject.extensionElements) {
      extensionElements = node.businessObject.extensionElements;
    } else {
      extensionElements = moddle.create('bpmn:ExtensionElements');
    }

    if (task) {
      let values = extensionElements.get('values');
      let inputOutput;
      if (values) {
        values.forEach(d => {
          if (d.$type === 'camunda:InputOutput') {
            inputOutput = d;
          }
        });
      }

      if (!inputOutput) {
        inputOutput = moddle.create('camunda:InputOutput');
      }

      if (!inputOutput.inputParameters) {
        inputOutput.inputParameters = [];
      } else {
        const inputParameter_news = [];
        inputOutput.inputParameters.forEach(inputParameter => {
          if (
            inputParameter.name !== 'form_uri' &&
            inputParameter.name !== 'input_data'
          ) {
            inputParameter_news.push(inputParameter);
          }
        });
        inputOutput.inputParameters = inputParameter_news;
      }

      let path = _.replace(task, '#{layout_name}', layout_name);
      path = _.replace(path, '#{task_id}', element.id);
      path = _.replace(path, '#{project_id}', '${project_id}');
      path = _.replace(path, '#{section_name}', section_name);

      const inputParameterPath = moddle.create('camunda:InputParameter');
      inputParameterPath.name = 'form_uri';
      inputParameterPath.value = path;
      inputOutput.inputParameters.push(inputParameterPath);

      const inputParameterInputData = moddle.create('camunda:InputParameter');
      inputParameterInputData.name = 'input_data';
      if (type_data === 'text') {
        inputParameterInputData.value = input_data;
      } else {
        const map = moddle.create('camunda:Map');
        map.entries = [];

        entries.forEach(function(e) {
          const entry = moddle.create('camunda:Entry');
          entry.key = e.key;
          entry.value = e.value;
          map.entries.push(entry);
        }, this);

        inputParameterInputData.definition = map;
      }
      inputOutput.inputParameters.push(inputParameterInputData);

      extensionElements.set('values', [inputOutput]);
    }
    viewer.get('modeling').updateProperties(node, {
      extensionElements
    });
  }

  render() {
    const {
      task,
      layout_name,
      section_name,
      input_data,
      type_data,
      entries
    } = this.state;

    const { layouts = [], sections = [] } = this.props;
    return (
      <div>
        <SelectField
          value={task}
          onChange={this.onTaskChange.bind(this)}
          floatingLabelFixed={true}
          floatingLabelText={<Translate value="projects.workflow.task" />}
          fullWidth={true}
        >
          {pre_defined_guis.map((e, i) => (
            <MenuItem key={i} value={e.path} primaryText={e.name} />
          ))}
        </SelectField>
        {task &&
          !task.includes('classifying') && (
            <SelectField
              value={layout_name}
              floatingLabelFixed={true}
              floatingLabelText={<Translate value="projects.workflow.layout" />}
              fullWidth={true}
              onChange={this.onLayoutChange.bind(this)}
            >
              {layouts.map((e, i) => (
                <MenuItem key={i} value={e.name} primaryText={e.name} />
              ))}
            </SelectField>
          )}
        {task &&
          !task.includes('classifying') &&
          !task.includes('invoice') && (
            <SelectField
              value={section_name}
              floatingLabelFixed={true}
              floatingLabelText={
                <Translate value="projects.workflow.section" />
              }
              fullWidth={true}
              onChange={this.onSectionChange.bind(this)}
            >
              <MenuItem key={-1} value="" primaryText="" />
              {sections.map((e, i) => (
                <MenuItem key={i} value={e.name} primaryText={e.name} />
              ))}
            </SelectField>
          )}
        <SelectField
          value={type_data}
          floatingLabelFixed={true}
          floatingLabelText={<Translate value="projects.workflow.type_data" />}
          fullWidth={true}
          onChange={this.onTypeDataChange.bind(this)}
        >
          <MenuItem key={0} value="text" primaryText="Text" />
          <MenuItem key={1} value="map" primaryText="Map" />
        </SelectField>
        {type_data === 'text' && (
          <TextField
            name="input_data"
            fullWidth={true}
            onChange={this.onInputChange.bind(this)}
            value={input_data}
            floatingLabelText={
              <Translate dangerousHTML value="projects.workflow.input_data" />
            }
            floatingLabelFixed={true}
          />
        )}
        {type_data === 'map' && (
          <Table selectable={true} fixedHeader={true} multiSelectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Entry Key</TableHeaderColumn>
                <TableHeaderColumn>Entry Value</TableHeaderColumn>
                <TableHeaderColumn style={{ width: 64 }}>
                  <RaisedButton
                    onClick={this.addEntry.bind(this)}
                    primary={true}
                    icon={<ContentAddIcon />}
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={true} displayRowCheckbox={false}>
              {entries.map((e, i) => (
                <TableRow key={i}>
                  <TableRowColumn>
                    <TextField
                      name="key"
                      onChange={e => this.onEntryChange(e, i)}
                      fullWidth={true}
                      value={e.key}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name="value"
                      onChange={e => this.onEntryChange(e, i)}
                      fullWidth={true}
                      value={e.value}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: 64 }}>
                    <RaisedButton
                      onClick={() => this.removeEntry(i)}
                      icon={<ContentRemoveIcon />}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}
export default ConfigScriptTask;
