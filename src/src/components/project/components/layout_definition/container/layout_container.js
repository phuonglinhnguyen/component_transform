import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

import { NAME_STORE, } from '../constant';

/**@description: Component */
import Wrapper from '../../../../common/layout/wrapper';
import LayoutComponent from '../components/layout_component';

import DialogContainer from '../../../../common/dialog/containers/dialog_container';
/**@description: actions of creator */
import { setDialog, resetDialog } from '../../../../common/dialog/actions/dialog_common_action';
import layoutActions from '../actions/layout_actions';
import sectionsActionsCreator from '../actions/sections_action';
import fieldsActionCreator from '../actions/fields_action';
import imageActionCreator from '../actions/image_action_creator';
import { resetALL } from '../actions';
import { resetGoto } from '../actions/redirect_action';
import EventListener from 'react-event-listener';
import { isEqual } from 'lodash';
import { Notification, NotifyActions } from '../../../../common/notification';
import Loading from '../../../../common/loading';
import Button from '@material-ui/core/Button';


class LayoutContainer extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };




  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (!isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
      || !isEqual(this.context, nextContext)
    )

  }
  componentWillMount() {
    const { layoutActions, fieldActions, match, sectionActions, history } = this.props;
    let info = { ...match.params, history };
    layoutActions.fetchIfNeeded(info);
    fieldActions.fetchIfNeeded(info);
    sectionActions.fetchIfNeeded(info);
  }
  componentWillReceiveProps(nextProps) {
    const { layoutActions, fieldActions, sectionActions, match, redirect, history } = nextProps;
    if (redirect.goto.length) {
      history.push(`/projects/${match.params.projectId}/layout-definitions`);
    } else {
      let info = { ...match.params, history };
      layoutActions.fetchIfNeeded(info);
      fieldActions.fetchIfNeeded(info);
      sectionActions.fetchIfNeeded(info);
    }
  }


  componentWillUnmount() {
    this.props.resetALL();
    this.props.resetGoto();
    this.props.notifyActions.removeMessage();
  }
  handleKeyDown = (event) => {
    const { sections, sectionActions } = this.props;
    if (event.key === 'Delete') {
      if (sections.selectedFieldIndex > -1) {
        if (sections.selectedOptionIndex > -1) {
          sectionActions.deletePositionOption(sections.selectedIndex, sections.selectedFieldIndex, sections.selectedOptionIndex);
        } else {
          sectionActions.deleteField(sections.selectedIndex, sections.selectedFieldIndex);
        }
      } else {
        sectionActions.deleteSection(sections.selectedIndex)
      }
    }
  }

  render() {
    const { muiTheme } = this.context;
    const {
      view,
      history,
      match,
      layout,
      fields,
      images,
      sections,
      layoutActions,
      sectionActions,
      imageActions,
      notifyActions,
    } = this.props;
    let info = { ...match.params, history };
    if (layout.isFetching) {
      return <div
        style={{
          width: "100vw",
          height: '100vh'
        }}
      > <Notification /><Loading /></div>
    } else
      return (
        <Wrapper muiTheme={muiTheme} offset={{ top: 118 }}>
          <Notification />
          <EventListener target="window" onKeyDown={this.handleKeyDown} />

          <DialogContainer
            Translate={Translate}
          />

          <LayoutComponent
            layout={layout}
            fields={fields}
            images={images}
            sections={sections}
            imageActions={imageActions}
            layoutActions={layoutActions}
            sectionActions={sectionActions}
            view={view}
            info={info}
            Translate={Translate}
            notifyActions={notifyActions}
            theme={muiTheme} />

        </Wrapper>
      );
  }
}

function mapStateToProps(state) {
  const dialog = state.common.common_dialog;
  const pathname = state.router.location.pathname;
  const { view, layout, sections, fields, images, redirect } = state[NAME_STORE];
  return {
    view: { ...view, dialog },
    layout,
    fields,
    sections,
    images,
    redirect,
    pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ resetALL, resetGoto }, dispatch),
    viewActions: bindActionCreators({ setDialog, resetDialog }, dispatch),
    layoutActions: bindActionCreators({ ...layoutActions }, dispatch),
    sectionActions: bindActionCreators({ ...sectionsActionsCreator }, dispatch),
    fieldActions: bindActionCreators({ ...fieldsActionCreator }, dispatch),
    imageActions: bindActionCreators({ ...imageActionCreator }, dispatch),
    notifyActions: bindActionCreators({ ...NotifyActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
