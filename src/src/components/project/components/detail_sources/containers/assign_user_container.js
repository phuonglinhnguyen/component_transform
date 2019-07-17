import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AssignUserComponent from "../components/assign_user_component";
import {  } from "../../assign_user/actions/assign_user_list_action";


const AssignUserContainer = props =>
  <AssignUserComponent {...props} />


AssignUserContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assign_user_list: state.assign_user.assign_user_list
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignUserContainer);
