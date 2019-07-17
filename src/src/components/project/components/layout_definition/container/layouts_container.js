import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Translate } from 'react-redux-i18n';
import { isEqual } from 'lodash';
import { NAME_STORE, URL_MODULE } from '../constant';


import layoutActions from '../actions/layouts_action';
import { Notification, NotifyActions } from '../../../../common/notification';
import { setDialog, resetDialog } from '../../../../common/dialog/actions/dialog_common_action';

import List from '../components/layouts_grid_component';
import Wrapper from '../../../../common/layout/wrapper';
import DialogContainer from '../../../../common/dialog/containers/dialog_container';
class Layouts extends Component {
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
        const { layoutActions, match, history } = this.props;
        let info = { ...match.params, history };
        layoutActions.fetchIfNeeded(info);
    }
    componentWillReceiveProps(nextProps) {
        const { layoutActions, match, history } = nextProps;
        let info = { ...match.params, history };
        layoutActions.fetchIfNeeded(info);
    }
    render() {
        const { muiTheme } = this.context;
        const { viewActions, notifyActions, layoutActions, match, layouts,history } = this.props;
        let layoutItems = layouts.items || [];
        let info = { ...match.params, history};
        return (<Wrapper muiTheme={muiTheme}>
            <Notification />
            <DialogContainer Translate={Translate} />
            <List
                items={layoutItems}
                sections={[]}
                muiTheme={muiTheme}
                history={history}
                info={info}
                deleting={layouts.deletingLayout}
                loading={layouts.isFetching}
                cloning={layouts.cloningLayout}
                onSelect={item => {
                    (layouts.selectedId || item) && layoutActions.selectLayout(item)
                    notifyActions.removeMessage();
                }
                }
                onClone={(layout, layoutId) => {
                    layoutActions.cloneLayout(info.projectId, layout, layoutId)
                }}
                onDelect={(layout) => {
                    viewActions.setDialog({
                        open_dialog: true,
                        title_dialog: `Delete ${layout.name}`,
                        body_dialog: 'Are you sure delete this?',
                        handleClickSubmit: () => {
                            viewActions.resetDialog();
                            setTimeout(() => {
                                layoutActions.deleteLayout(info.projectId, layout)
                            }, 50)
                        },
                        label_button_dialog: 'commons.actions.delete'
                    });
                }}
                selectedId={layouts.selectedId}
                redirect_url={`/projects/${info.projectId}/${URL_MODULE}`}
            />
        </Wrapper>);
    }
}
function mapStateToProps(state) {
    const dialog = state.common.common_dialog;
    const { view, layouts } = state[NAME_STORE];
    return {
        view: { ...view, dialog },
        layouts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        viewActions: bindActionCreators({ setDialog, resetDialog }, dispatch),
        layoutActions: bindActionCreators({ ...layoutActions }, dispatch),
        notifyActions: bindActionCreators({ ...NotifyActions }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);

