import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import { Translate } from 'react-redux-i18n';

import FlatButton from 'material-ui/FlatButton';
import ImportConfigurations from './io_configuration/containers/import_configurations_container';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import * as project_contants from '../constants/project_constant';
import GroupSelect from './project_item_select_group'

class ProjectItemEdit extends React.Component {
  componentWillUnmount() {
    this.props.actions.stopModifyProject();
  }
  constructor(props) {
    super(props);

    this.state = {
      project: props.data,
      project_error: {
        name: '',
        priority: '',
        group_id: ''
      },
      name: props.data && props.data.name
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      project: nextProps.data,
      name: nextProps.data && nextProps.data.name
    });
  }

  handleInputChange(event) {
    const target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const project = this.state.project;
    if (name === project_contants.KEY_PROJECT_PRIORITY) {
      if (value.trim() === '' || value.match(/^\d+$/)) {
        project[name] = value;
        this.setState({ project: project });
      }
    } else {
      project[name] = value;
      this.setState({ project: project });
    }

  }
  handleChangeGroup(value) {
    var project = this.state.project;
    project[project_contants.KEY_PROJECT_GROUP_ID] = value;
    this.setState({ project: project });

  }
  validateField(name, value) {
    const project_error = this.state.project_error;
    var errorText = '';
    if (!value || value.toString().trim() === '') {
      errorText = <Translate value="error_text.field_required" />;
    }
    project_error[name] = errorText;
    this.setState({ project_error: project_error });
    return errorText === '' ? true : false;
  }

  handleSaveProject() {
    const project = this.state.project;
    const validCustomer = this.validateField(
      project_contants.KEY_PROJECT_CUSTOMER,
      project.customer
    );
    const validName = this.validateField(
      project_contants.KEY_PROJECT_NAME,
      project.name
    );
    const validPriority = this.validateField(
      project_contants.KEY_PROJECT_PRIORITY,
      project.priority
    );
    const validGroup = this.validateField(
      project_contants.KEY_PROJECT_GROUP_ID,
      project.group_id
    );
    const validFolder = this.validateField(
      project_contants.KEY_PROJECT_FOLDER,
      project.folder
    );

    if (validCustomer && validName && validPriority && validGroup && validFolder) {
      if (project.id && project.id !== '0') {
        const { path } = this.props.location;
        this.props.actions.updateProject(project, project.id, path);
      } else {
        this.props.actions.insertProject(project);
      }
    }
  }
  handleCancelEdit() {
    this.props.actions.stopModifyProject();
  }


  render() {
    const { project, name, project_error } = this.state;
    const { muiTheme } = this.props;

    const primary1Color = muiTheme.palette.primary1Color,
      secondaryTextColor = muiTheme.palette.secondaryTextColor
    const { groups } = this.props.project_group
    return (
      <Card>
        <CardHeader
          title={project.id === '0' ? 'New Project' : `Modify Project`}
          subtitle={project.id === '0' ? '' : `${name}`}

        />
        <CardText>
          <GridList cols={1} padding={0} cellHeight="auto">
            <TextField
              name={project_contants.KEY_PROJECT_CUSTOMER}
              type="text"
              fullWidth={true}
              onChange={this.handleInputChange}

              floatingLabelText="Customer"
              errorText={project_error.customer}
              floatingLabelFixed={true}
              value={project.customer}
            />
            <TextField
              name={project_contants.KEY_PROJECT_NAME}
              type="text"
              fullWidth={true}
              onChange={this.handleInputChange}
              floatingLabelText="Project Name"
              errorText={project_error.name}
              floatingLabelFixed={true}
              value={project.name}
            />

            <TextField
              name={project_contants.KEY_PROJECT_PRIORITY}
              onChange={this.handleInputChange}
              floatingLabelText="Project Priority (Number Only)"
              floatingLabelFixed={true}
              errorText={project_error.priority}
              value={project.priority}
              fullWidth={true}
            />
            <GroupSelect
              group_id={project.group_id}
              group_name={project.group_name}
              groups={groups}
              primary1Color={primary1Color}
              secondaryTextColor={secondaryTextColor}
              handleChangeGroup={this.handleChangeGroup}
              actions={this.props.actions}
              errorText={project_error.group_id}
            />
            <TextField
              name={project_contants.KEY_PROJECT_FOLDER}
              onChange={this.handleInputChange}
              floatingLabelText="Project Path"
              floatingLabelFixed={true}
              errorText={project_error.folder}
              value={project.folder}
              fullWidth={true}
            />
            <ImportConfigurations />
          </GridList>
        </CardText>
        <CardActions>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <FlatButton
                onClick={this.handleCancelEdit.bind(this)}
                label="Cancel"
                primary={true}
              />
            </ToolbarGroup>

            <ToolbarGroup>
              <FlatButton
                onClick={this.handleSaveProject.bind(this)}
                label={<Translate value="commons.actions.save" />}
                primary={true}
              />
            </ToolbarGroup>
          </Toolbar>
        </CardActions>
      </Card>
    );
  }
}
ProjectItemEdit.defaultProps = {
  projectDefault: {
    name: '',
    customer: '',
    priority: ''
  },
  projectErrorDefault: {
    name: '',
    customer: '',
    priority: ''
  }
};
export default ProjectItemEdit;
