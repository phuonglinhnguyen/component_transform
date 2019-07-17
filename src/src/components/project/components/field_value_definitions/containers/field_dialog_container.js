import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FieldDialog from '../components/field_dialog_component';

import { setDialogField } from '../actions/field_common_action';

const FieldDialogContainer = ({ field_dialog, actions }) => (
  <FieldDialog field_dialog={field_dialog} actions={actions} />
);

FieldDialogContainer.propTypes = {
  field_dialog: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { field_dialog } = state.field_definition;
  return { field_dialog };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setDialogField }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FieldDialogContainer
);
