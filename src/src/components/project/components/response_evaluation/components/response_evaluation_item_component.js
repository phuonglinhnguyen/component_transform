import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ItemValues from './response_evaluation_item_value_component'

import * as response_evaluation_constants from '../constants/response_evaluation_constants';

class ProjectResponseEvaluationItem extends React.Component {
  componentWillMount() {
    const projectId = this.props.match.params.projectid;
    this.props.actions.getFieldDefinitions(projectId);
  }
  constructor(props) {
    super(props);

    this.saveData = this.saveData.bind(this);
    this.modifyData = this.modifyData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getRedirectUrl() {
    const url = this.props.match.url;

    return url.substring(0, url.lastIndexOf('/'));
  }

  componentDidMount() {
    const responseEvaluationId = this.props.match.params.responseEvaluationId;
    const projectId = this.props.match.params.projectid;

    if (responseEvaluationId === 'new') {
      return;
    }

    this.props.actions.getResponseEvaluationById(projectId, responseEvaluationId);

  }

  componentWillUnmount() {
    this.props.actions.resetStateResponseEvaluationItem();
  }

  modifyData(name, value) {

    const response_evaluation = { ...this.props.response_evaluation_item.response_evaluation };
    if (name) {
      response_evaluation[name] = value;
    }
    this.props.actions.modifyResponseEvaluation(response_evaluation);
  }


  deleteData() {
    const response_evaluation = this.props.response_evaluation_item.response_evaluation;

    const projectId = this.props.match.params.projectid;
    this.props.actions.setDialog({
      open_dialog: true,
      title_dialog: `Delete #project meta data ${response_evaluation[
      response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_NAME
      ]}`,
      handleClickSubmit: () =>
        this.props.actions.deleteResponseEvaluation(
          projectId,
          response_evaluation,
          this.props.history,
          this.getRedirectUrl()
        ),
      label_button_dialog: 'commons.actions.delete'
    });
  }

  saveData() {
    const projectId = this.props.match.params.projectid;
    const responseEvaluationId = this.props.match.params.responseEvaluationId;
    if (responseEvaluationId === 'new') {
      this.props.actions.insertResponseEvaluation(projectId, this.props.response_evaluation_item.response_evaluation);
    } else {
      this.props.actions.updateResponseEvaluation(projectId, this.props.response_evaluation_item.response_evaluation);
    }
  }

  render() {
    const {
      response_evaluation,
      response_evaluation_error,
      is_fetching,
      fields = []
    } = this.props.response_evaluation_item;
    const { Translate, default_props, is_error } = this.props;
    if (is_error) {
      return <Redirect to={this.getRedirectUrl()} />;
    }
    if (is_fetching) {
      return <div />;
    }
    const responseEvaluationId = this.props.match.params.responseEvaluationId;
    const label =
      responseEvaluationId !== 'new'
        ? 'commons.actions.update'
        : 'commons.actions.save_and_create';

    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton
              onClick={this.saveData}
              label={<Translate value={label} />}
              primary={true}
            />
          </ToolbarGroup>
          {response_evaluation.id && (
            <ToolbarGroup lastChild={true}>
              <FlatButton
                onClick={this.deleteData}
                label={<Translate value={'commons.actions.delete'} />}
              />
            </ToolbarGroup>
          )}
        </Toolbar>
        <GridList cols={1} {...default_props.grid_list}>
          <TextField
            autoFocus
            {...default_props.text_field}
            errorText={response_evaluation_error[response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_NAME] || ''}
            floatingLabelText={
              <Translate
                dangerousHTML
                value="projects.response_evaluation.name"
              />
            }
            value={response_evaluation[response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_NAME] || ''}
            onChange={event =>
              this.modifyData(
                response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_NAME,
                event.target.value
              )}

          />


          <TextField
            {...default_props.text_field}
            errorText={response_evaluation_error[response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_KEY] || ''}
            floatingLabelText={
              <Translate
                dangerousHTML
                value="projects.response_evaluation.key"
              />
            }
            value={response_evaluation[response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_KEY] || ''}
            onChange={event =>
              this.modifyData(
                response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_KEY,
                event.target.value
              )}

          />


        </GridList>

        <ItemValues
          onChange={this.modifyData}
          default_props={default_props}
          Translate={Translate}
          response_evaluation={response_evaluation}
          response_evaluation_error={response_evaluation_error}
          modifyData={this.modifyData}
          fields={fields}
        />
      </Paper>
    );
  }
}


export default withRouter(ProjectResponseEvaluationItem);
