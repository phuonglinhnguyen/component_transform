import React from "react";
import PropTypes from "prop-types";

import Paper from "material-ui/Paper";

import ActionButtonsComponent from "../../common/action_buttons";
import ConfirmDialogComponent from "../../common/confirm_dialog";
import ErrorInfos from "./error_infos_component";
import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import * as error_constants from "../constants/error_constants";
import { Translate } from "react-redux-i18n";

class ErrorItem extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    this.props.actions.getErrorById(this.props.match.params.errorDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateErrorItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf("/"));
  }

  modifyData(name, value) {
    this.props.actions.modifyError(name, value);
  }

  saveData() {
    const errorId = this.props.match.params.errorDefinitionId;
    if (errorId === "new") {
      this.props.actions.createError(this.props.error_item.data);
    } else {
      this.props.actions.patchError(this.props.error_item.data, errorId);
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deleteError(() => {
      history.push(redirect_url);
    });
  }

  render() {
    const {
      ajax_call_ajax,
      error_item,

      actions,
      default_props
    } = this.props;

    if (error_item.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      is_create,
      is_error,
      title_confirm,
      show_confirm,

      data,

      error_field_name
    } = error_item;

    const label = is_create
      ? "commons.actions.save_and_create"
      : "commons.actions.update";
    return (
      <div
        style={{
          width: "70%",
          margin: "auto",
          marginTop: 10
        }}
      >
        <Paper style={{ margin: 2 }}>
          <div className="column_left">
            <ActionButtonsComponent
              ajax_call_ajax={ajax_call_ajax}
              saveData={this.saveData}
              deleteData={actions.showConfirmDelete}
              is_error={is_error}
              edit_label={<Translate value={label} />}
              delete_label={<Translate value={"commons.actions.delete"} />}
              render_delete_button={!is_create}
            />

            <ErrorInfos
              default_props={default_props}
              error_constants={error_constants}
              label_error={error_field_name}
              error={data}
              Translate={Translate}
              modifyData={this.modifyData}
            />

            <CallAjaxContainer />

            <ConfirmDialogComponent
              open={show_confirm}
              title={title_confirm}
              actionDelete={this.deleteData}
              hideDialog={actions.hideConfirmDelete}
            />
          </div>
        </Paper>
      </div>
    );
  }
}



export default ErrorItem;
