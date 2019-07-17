import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import UserRoleComponent from "../components/user_role_component";
import { getListUserRoles, checkRoles, checkUsers, saveUserRoles, resetListState } from "../actions/user_role_list_action";
import { dialogOpen, dialogClose, dialogSaveUserRole, dialogResetState } from '../actions/user_role_dialog_action'
import ProcessingComponent from '../../common/snackbars/containers/common_processing_container';

import { getListUserADs } from '../../common/user_ad/action'

import { Translate } from 'react-redux-i18n';
import muiThemeable from 'material-ui/styles/muiThemeable';
const UserRoleContainer = props =>
<section className="without-tabs" role="main">
    <ProcessingComponent muiTheme={props.muiTheme} Translate={Translate} />
    <UserRoleComponent {...props} />
  </section>;

UserRoleContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user_role_list: state.config_user_role.user_role_list,
  user_role_dialog: state.config_user_role.user_role_dialog,
  user_ads: state.common.user_ads,
  current_user:state.current_user

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getListUserRoles,
      getListUserADs,
      checkRoles,
      checkUsers,
      saveUserRoles,
      dialogOpen,
      dialogClose,
      dialogSaveUserRole,
      dialogResetState,
      resetListState

    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(UserRoleContainer));
