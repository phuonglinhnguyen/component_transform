import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ResponseEvaluationItem from '../components/response_evaluation_item_component';
import ResponseEvaluationProcessing from '../../../../common/snackbars/containers/common_processing_container';
import ResponseEvaluationDialog from './response_evaluation_dialog_container';

import muiThemeable from 'material-ui/styles/muiThemeable';

import { setDialog } from '../actions/response_evaluation_common_action';
import {
  getFieldDefinitions,
  checkResponseEvaluation,
  getResponseEvaluationById,
  modifyResponseEvaluation,
  insertResponseEvaluation,
  updateResponseEvaluation,
  deleteResponseEvaluation,
  resetStateResponseEvaluationItem
} from '../actions/response_evaluation_item_action';
import {
  getListLayouts,
  resetStateDetailSources
} from '../../detail_sources/action'

import { I18n, Translate } from 'react-redux-i18n';

import default_props from '../../../../common/default_props';

const ResponseEvaluationItemContainer = props =>

  <div style={{
    width: '70%',
    position: 'absolute',
    marginLeft: '15%'
  }}>

    <ResponseEvaluationDialog Translate={Translate} />
    <ResponseEvaluationProcessing
      muiTheme={props.muiTheme}
      Translate={Translate}
      default_props={default_props}
    />

    <ResponseEvaluationItem
      I18n={I18n}
      Translate={Translate}
      {...props}
      default_props={default_props}
    />
  </div>;

ResponseEvaluationItemContainer.propTypes = {
  response_evaluation_item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { response_evaluation_item } = state.project.response_evaluation;
  const pathname = state.router.location.pathname;
  const { layouts } = state.project.detail_sources;
  const is_error = state.common.common_processing.is_error;
  return {
    response_evaluation_item,
    layouts,
    is_error,
    pathname,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setDialog,
        checkResponseEvaluation,
        getResponseEvaluationById,
        modifyResponseEvaluation,
        insertResponseEvaluation,
        updateResponseEvaluation,
        deleteResponseEvaluation,
        resetStateResponseEvaluationItem,
        getListLayouts,
        resetStateDetailSources,
        getFieldDefinitions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(ResponseEvaluationItemContainer)
);
