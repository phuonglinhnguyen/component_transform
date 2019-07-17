import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';
import { isEqual } from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import { limeA200 } from 'material-ui/styles/colors';
import CircularProgress from "material-ui/CircularProgress";

import { ACTION_CREATE } from '../constant';
const initialStyle = {
    toolbar: {
        display: 'inline-flex',
        alignItems: "center",
        marginBottom: 0,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: 'calc(100% - 32px)',
        padding: 16,
    }
}
export default class MenuToolbar extends Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        const {onSave,isSaving,info} = this.props;
        const {layoutId} = info;
        let action = isSaving?()=>{}: onSave;
        let lableName ='save_and_create';
            if(layoutId!==ACTION_CREATE){
                lableName=  isSaving?'updating':'update';
            }else if(isSaving){
                lableName='saving';
            }
        return (
            <div style={initialStyle.toolbar}>
                    <RaisedButton
                        label={<Translate value={`omr.button.label.${lableName}`} />}
                        labelPosition="after"
                        backgroundColor={limeA200}
                        onClick={action}
                        secondary={true}
                        fullWidth={true}
                        icon={ isSaving?<CircularProgress size={25} />:''}
                    />
            </div>
        );
    }
}