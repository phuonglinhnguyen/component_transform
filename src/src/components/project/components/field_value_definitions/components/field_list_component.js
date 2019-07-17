import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../common/loading';
import { withRouter } from 'react-router'
import DashboardCard from '../../../../common/dashboard/chip';

import ListIcon from 'material-ui/svg-icons/action/list';
import CropSquareIcon from 'material-ui/svg-icons/image/crop-square';
import Crop75Icon from 'material-ui/svg-icons/image/crop-7-5';
import CheckboxIcon from 'material-ui/svg-icons/toggle/check-box';
import RadioButtonCheckIcon from 'material-ui/svg-icons/toggle/radio-button-checked';

import * as global_constants from '../../../../../constants';
import * as field_constants from '../constants/field_constants';

class FieldList extends React.Component {
  componentDidMount() {
    this.props.actions.getList(this.props.match.params.projectid);
  }

  componentWillUnmount() {
    this.props.actions.resetStateFieldList();
    this.props.actions.closeSnackbar();
  }

  getIcon(data) {
    let icon;

    switch (data.control_type) {
      case global_constants.COMPONENT_COMBOBOX:
        icon = <ListIcon />;
        break;
      case global_constants.COMPONENT_TEXTAREA:
        icon = <CropSquareIcon />;
        break;
      case global_constants.COMPONENT_CHECKBOX:
        icon = <CheckboxIcon />;
        break;
      case global_constants.COMPONENT_RADIO:
        icon = <RadioButtonCheckIcon />;
        break;
      default:
        icon = <Crop75Icon />;
        break;
    }
    return icon;
  }

  goToPageFieldItem(data) {
    this.props.history.push(
      `${this.props.match.url}/${data ? data.id : 'new'}`
    );
  }

  render() {
    const {
      is_fetching,

      Translate,

      fields,
      muiTheme
    } = this.props;

    if (is_fetching) {
      return <div > <Loading /></div>

    }

    return (
      <DashboardCard
        getIcon={this.getIcon.bind(this)}
        muiTheme={muiTheme}
        key_value={field_constants.KEY_FIELD_NAME}
        label_total="projects.field_value_definitions.fields_available"
        label_button_add="projects.field_value_definitions.create_new_field"
        addItem={this.goToPageFieldItem.bind(this)}
        editItem={this.goToPageFieldItem.bind(this)}
        datas={fields}
        Translate={Translate}
      />
    );
  }
}


export default withRouter(FieldList);
