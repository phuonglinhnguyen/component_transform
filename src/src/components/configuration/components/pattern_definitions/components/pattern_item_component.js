import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router'
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import ActionButtonsComponent from '../../common/action_buttons';
import ConfirmDialogComponent from '../../common/confirm_dialog';
import LoadingComponent from '../../../../common/ajax/load_page/circle';
import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';
import PatternPreview from './pattern_preview_component';
import PatternReference from './pattern_reference_component';

import * as pattern_constants from '../constants/pattern_constants';
import { I18n, Translate } from 'react-redux-i18n';

class PatternItem extends React.Component {
  constructor(props) {
    super(props);

    this.saveData = this.saveData.bind(this);
    this.modifyData = this.modifyData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentWillMount() {
    this.props.actions.getPatternById(this.props.match.params.patternDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStatePatternItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  modifyData(name, value) {
    this.props.actions.modifyPattern(name, value);
  }

  saveData() {
    const patternId = this.props.match.params.patternDefinitionId;
    if (patternId === 'new') {
      this.props.actions.createPattern(this.props.pattern_item.data);
    } else {
      this.props.actions.patchPattern(
        this.props.pattern_item.data,
        patternId
      );
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deletePattern(() => {
      history.push(redirect_url);
    });
  }


  render() {
    const {
      data,
      title_confirm,
      show_confirm,
      is_error,
      is_fetching
    } = this.props.pattern_item;

    const { actions, default_props, ajax_call_ajax } = this.props;

    const error_text_pattern_name = this.props.pattern_item.is_error
      ? I18n.t('configurations.pattern_definitions.this_field_is_required')
      : '';
    
    if (is_fetching) {
      return  <LoadingComponent />;
    }
    const patternId = this.props.match.params.patternDefinitionId;
    const label =
      patternId !== 'new'
        ? 'commons.actions.update'
        : 'commons.actions.save_and_create';

    return (
      <div className="two_column">
        <div className="column_left">
          <ActionButtonsComponent
            ajax_call_ajax={ajax_call_ajax}
            saveData={this.saveData}
            deleteData={actions.showConfirmDelete}
            is_error={is_error}
            edit_label={<Translate value={label} />}
            delete_label={<Translate value={'commons.actions.delete'} />}
            render_delete_button={data.id != null && data.id.length > 0}
          />

          <div className="data_content">
            <GridList cols={2} {...default_props.grid_list}>
              <TextField
                autoFocus
                {...default_props.text_field}
                errorText={error_text_pattern_name}
                floatingLabelText={
                  <Translate
                    dangerousHTML
                    value="configurations.pattern_definitions.name"
                  />
                }
                value={data[pattern_constants.KEY_PATTERN_NAME] || ''}
                onChange={event =>
                  this.modifyData(
                    pattern_constants.KEY_PATTERN_NAME,
                    event.target.value
                  )
                }
                name={`${pattern_constants.KEY_PATTERN_NAME}`}
              />
              <TextField
                {...default_props.text_field}
                floatingLabelText={
                  <Translate
                    dangerousHTML
                    value="configurations.pattern_definitions.description"
                  />
                }
                value={data[pattern_constants.KEY_PATTERN_DESCRIPTION] || ''}
                onChange={event =>
                  this.modifyData(
                    pattern_constants.KEY_PATTERN_DESCRIPTION,
                    event.target.value
                  )
                }
                name={`${pattern_constants.KEY_PATTERN_DESCRIPTION}`}
              />
            </GridList>
            <GridList cols={1} {...default_props.grid_list}>
              <TextField
                floatingLabelShrinkStyle={{ pointerEvents: 'all' }}
                {...default_props.text_field}
                floatingLabelText={
                  <Translate
                    dangerousHTML
                    value="configurations.pattern_definitions.content"
                  />
                }
                onChange={event =>
                  this.modifyData(
                    pattern_constants.KEY_PATTERN_CONTENT,
                    event.target.value
                  )
                }
                value={data[pattern_constants.KEY_PATTERN_CONTENT] || ''}
              />
            </GridList>
            <GridList cols={1} {...default_props.grid_list}>
              <Subheader>
                {
                  <Translate
                    value={`configurations.pattern_definitions.pattern_example`}
                  />
                }
              </Subheader>
              <PatternReference
                default_props={default_props}
                Translate={Translate}
              />
            </GridList>
          </div>

          <CallAjaxContainer />

          <ConfirmDialogComponent
            open={show_confirm}
            title={title_confirm}
            actionDelete={this.deleteData}
            hideDialog={actions.hideConfirmDelete}
          />
        </div>
        <div className="column_right">
          <Subheader>
            {
              <Translate
                value={`configurations.pattern_definitions.pattern_preview`}
              />
            }
          </Subheader>
          <GridList cols={1} {...default_props.grid_list}>
            <PatternPreview
              muiTheme={this.props.muiTheme}
              Translate={Translate}
              pattern={data}
              error={null}
              default_props={default_props}
            />
          </GridList>
        </div>
      </div>
    );
  }
}



export default withRouter(PatternItem);
