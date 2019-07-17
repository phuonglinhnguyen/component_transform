import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResponseEvaluationDialog from '../components/response_evaluation_dialog_component';

import { setDialog } from '../actions/response_evaluation_common_action';

const ResponseEvaluationDialogContainer = ({ response_evaluation_dialog, actions, Translate }) =>
  <ResponseEvaluationDialog
    response_evaluation_dialog={response_evaluation_dialog}
    actions={actions}
    Translate={Translate}
  />;

ResponseEvaluationDialogContainer.propTypes = {
  response_evaluation_dialog: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,

  Translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { response_evaluation_dialog } = state.project.response_evaluation;
  return { response_evaluation_dialog };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setDialog }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ResponseEvaluationDialogContainer
);
