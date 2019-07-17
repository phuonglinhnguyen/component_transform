import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
const initialStyle = {
    toolbarWrapper: {
        position: 'absolute',
        right: 0,
        zIndex: 200,

    },
    toolbar: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        whiteSpace: 'nowrap',
    }
}
export default class SettingValidation extends PureComponent {
    render() {
        const {
            active,
            editMode,
            onActive = () => {},
            onEdit = () => {},
            } = this.props;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(!active)}
                    />}
                disabled={!active}
                primaryText="Validation"
            >
                <div style={initialStyle.toolbarWrapper}>
                    <div style={initialStyle.toolbar}>
                        <FlatButton
                            disabled={!active}
                            style={{ marginTop: 6 }}
                            label={'EDIT'}
                            labelPosition="before"
                            icon={<ModeEditIcon />}
                            primary={true}
                            onClick={()=>onEdit(!editMode)}
                        />
                    </div>
                </div>
            </ListItem>
        );
    }
}
/*
import { SketchPicker } from 'react-color';
import ColorizeIcon from 'material-ui/svg-icons/image/colorize';


*/