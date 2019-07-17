import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import { ROLE_GUEST, ELROND_ENV } from "../constants";
import _ from "lodash";

const WithAuthorization = (WrappedComponent, allowedRoles) => {
  class Authorization extends React.Component {
    constructor(props) {
      super(props);
      this.chat = this.chat.bind(this);
    }
    isAuthenticated = logined => {
      if (!logined) {
        this.props.history.push("/login");
        return;
      }
    };
    getWidgetId() {
      const elrondEnv = ELROND_ENV;
      switch (elrondEnv) {
        case "UAT":
          return "FqNRBznn0U"
        case "SIT":
          return "5jnoFHlgMW"
        case "PRD":
          return "5PbDVKN4NH"
        default:
          return "";
      }

    }

    chat() {
    
      if (this.props.current_user.isAuthenticated) {
        var widgetId = this.getWidgetId();

        if (widgetId) {
          var jivoElementArr = document.getElementsByClassName('globalClass_ET');

          if (jivoElementArr && jivoElementArr.length > 0) {
            var jivoElement = jivoElementArr[0]
            if (jivoElement.style.display.includes('none')) {
              jivoElement.style = "display:''"
            }
          
          }
          var jivoIframe = document.getElementById('jivo-iframe-container');
          if (jivoIframe) {
            if (jivoIframe.style.display.includes('none')) {
              document.getElementById('jivo-iframe-container').style = "display:' '!important"
            }
          }
          //       else {

          var d = document; var w = window; function l() {

            var s = document.createElement('script'); s.type = 'text/javascript';
            s.async = true;
            s.src = `//code.jivosite.com/script/widget/${widgetId}`;
            var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);
          }
          if (d.readyState === 'complete') { l(); } else {
            if (w.attachEvent) { w.attachEvent('onload', l); }
            else { w.addEventListener('load', l, false); }
          }
        }
        //  }
      }
    }
    componentDidMount() {
      this.isAuthenticated(this.props.current_user.isAuthenticated);

      this.chat();



    }
   

    componentWillReceiveProps(nextProps) {

      this.isAuthenticated(nextProps.current_user.isAuthenticated);
    

    }

    shouldComponentUpdate(nextProps) {
      return !_.isEqual(this.props, nextProps);
    }

    render() {
      const roles = this.props.current_user.user.roles || [];

      if (_.intersection(roles, [ROLE_GUEST]).length === 0) {
        roles.push(ROLE_GUEST)
      }


      if (
        this.props.current_user.isAuthenticated &&
        (allowedRoles.length < 1 ||
          _.intersection(allowedRoles, roles).length > 0)
      ) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <div> Permission Denied! </div>;
      }
    }
  }


  function mapStateToProps(state) {
    return {
      current_user: state.current_user
    };
  }

  return connect(mapStateToProps)(withRouter(Authorization));
};

export default WithAuthorization;
