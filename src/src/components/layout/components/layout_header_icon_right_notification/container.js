import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import IconComponent from "./components/icon";
import DialogItemComponent from "./components/dialog_item";
import PopoverListComponent from "./components/popover_list";
import * as actions from "./action";

const LayoutHeaderIconRightContertain = props => (
  <div>
    <IconComponent {...props} />
    <PopoverListComponent {...props} />
    <DialogItemComponent {...props} />
  </div>
);

const mapStateToProps = state => ({
  ...state.layout_header_notification
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  LayoutHeaderIconRightContertain
);
