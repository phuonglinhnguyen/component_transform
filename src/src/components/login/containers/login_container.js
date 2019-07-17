import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { editUser, doLogin } from "../actions/login_action";

import LoginComponent from "../components/login_component";
import Processing from "../../common/snackbars/containers/common_processing_container";

import elrondThemeBlue from "../../../styles/themes/elrond_blue";
import { Translate } from "react-redux-i18n";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

class LoginContainer extends React.Component {
  render() {
    const muiTheme = getMuiTheme(elrondThemeBlue);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Processing
            Translate={Translate}
            muiTheme={muiTheme}
            {...this.props}
          />
          <LoginComponent {...this.props} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    isAuthenticated,
    completed,
    status_text,
    user
  } = state.current_user;

  return { isFetching, isAuthenticated, completed, status_text, user };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        editUser,
        doLogin
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
