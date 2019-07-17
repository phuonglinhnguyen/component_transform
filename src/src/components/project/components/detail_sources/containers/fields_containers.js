import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FieldsComponent from "../components/fields_component";

import { getList } from "../../field_value_definitions/actions/field_list_action";

const FieldsContainer = props =>
  <FieldsComponent {...props} />


FieldsContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field_list: state.field_definition.field_list
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldsContainer);
