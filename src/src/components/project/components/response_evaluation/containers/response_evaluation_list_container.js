import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResponseEvaluationList from '../components/response_evaluation_list_component';
import ResponseEvaluationProcessing from '../../../../common/snackbars/containers/common_processing_container';

import { I18n, Translate } from 'react-redux-i18n';

import { setDialog } from '../actions/response_evaluation_common_action';
import {
  getList,
  resetStateResponseEvaluationList
} from '../actions/response_evaluation_list_action';
import { closeSnackbar } from '../../../../common/snackbars/actions/common_action';

const ResponseEvaluationListContainer = props => (
  <div style={{width: "100%"}}>
    <ResponseEvaluationProcessing
      muiTheme={props.muiTheme}
      Translate={Translate}
    />
    <ResponseEvaluationList I18n={I18n} Translate={Translate} {...props} />
  </div>
);

const mapStateToProps = state => {
  const response_evaluation_list =
    state.project.response_evaluation.response_evaluation_list;
  return {
    response_evaluations: response_evaluation_list.response_evaluations,
    is_fetching: response_evaluation_list.is_fetching
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getList,
      setDialog,
      closeSnackbar,
      resetStateResponseEvaluationList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ResponseEvaluationListContainer
);
