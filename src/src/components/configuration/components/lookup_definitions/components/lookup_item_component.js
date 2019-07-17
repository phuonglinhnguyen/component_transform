import React from "react";

import Subheader from "material-ui/Subheader";

import LookupInfos from "./lookup_item_infos_component";
import LookupPreview from "./lookup_preview_component";
import ActionButtonsComponent from "../../common/action_buttons";
import ConfirmDialogComponent from "../../common/confirm_dialog";
import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import * as lookup_constants from "../constants/lookup_constants";

import {  Translate } from "react-redux-i18n";

class LookupItem extends React.Component {
  constructor(props: any) {
    super(props);

    this.modifyLookup = this.props.actions.modifyLookup.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleAddChip = this.handleAddChip.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);
  }

  componentDidMount() {
    this.props.actions.getLookupById(this.props.match.params.lookupDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateLookupItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf("/"));
  }

  saveData() {
    const lookupId = this.props.match.params.lookupDefinitionId;
    if (lookupId === "new") {
      this.props.actions.createLookup(this.props.lookup_item.data);
    } else {
      this.props.actions.patchLookup(this.props.lookup_item.data, lookupId);
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deleteLookup(() => {
      history.push(redirect_url);
    });
  }

  handleAddChip(chip: string, name: string) {
    const lookup = { ...this.props.lookup_item.data };
    let locale = [...lookup[name]] || [];
    locale.push(chip);
    this.props.actions.modifyLookup(name, locale);
  }

  handleDeleteChip(index: number, name: string) {
    const lookup = { ...this.props.lookup_item.data };
    let locale = [...lookup[name]] || [];
    locale.splice(index, 1);
    this.props.actions.modifyLookup(name, locale);
  }

  render() {
    const {
      ajax_call_ajax,
      lookup_item,

      actions,
      default_props,
      muiTheme
    } = this.props;

    if (lookup_item.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      data,
      is_create,
      is_error,
      label_error = {},
      show_confirm,
      title_confirm
    } = lookup_item;

    const label = is_create
      ? "commons.actions.save_and_create"
      : "commons.actions.update";

    return (
      <div className="two_column">
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
          <div className="data_content">
            <LookupInfos
              default_props={default_props}
              lookup_constants={lookup_constants}
              lookup={data}
              label_error={label_error}
              Translate={Translate}
              modifyData={this.modifyLookup}
              handleAddChip={this.handleAddChip}
              handleDeleteChip={this.handleDeleteChip}
            />
          </div>
          <CallAjaxContainer />
          <ConfirmDialogComponent
            open={show_confirm}
            title={title_confirm}
            actionDelete={this.deleteData}
            hideDialog={actions.hideConfirmDelete}
          />
        </div>
        <div className="column_right">
          <Subheader>
            {
              <Translate
                value={`configurations.lookup_definitions.lookup_preview`}
              />
            }
          </Subheader>
          <LookupPreview
            muiTheme={muiTheme}
            lookup={data}
            default_props={default_props}
          />
        </div>
      </div>
    );
  }
}

export default LookupItem;
