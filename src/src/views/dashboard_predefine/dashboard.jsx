import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  Dashboard from '../../@components/Dashboard_Predefine/Dashboard'
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionDashboard from "material-ui/svg-icons/action/dashboard";
// import ActionHelp from "material-ui/svg-icons/action/help";
import ActionBuild from "material-ui/svg-icons/action/build";
import ActionPermIdentity from "material-ui/svg-icons/action/perm-identity";
import InsertChartIcon from "material-ui/svg-icons/editor/insert-chart";
// import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Panorama from "material-ui/svg-icons/image/panorama";
import FolderIcon from "material-ui/svg-icons/file/folder";
import { push } from 'connected-react-router'

import {functions} from '../../constants/function_predefine';




export class Dashboard_Predefine extends Component {
  static propTypes = {
    prop: PropTypes
  }
  render() {

    return (
    <Dashboard
        datas={functions}
        onClickItem={item=>{
            this.props.dispatch(push("/pre-defined"+item.path))
        }}
    />
    )
  }
}



export default connect()(Dashboard_Predefine)
