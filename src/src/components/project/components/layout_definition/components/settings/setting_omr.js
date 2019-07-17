import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';
import { isEqual } from 'lodash';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import ButtonColor from './button_color';
import ButtonPercent from './button_percent';
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
export default class SettingOMR extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState));
    }
    render() {
        const {
            pixel_threshold = '',
            color,
            isRunning,
            active,
            onActive = () => { },
            onRunTest = () => { },
            onChangePixelThreshold = () => { },
            onChangeColorThreshold = () => { },
            } = this.props;
        let colorHex = color.hex || 'none';
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(!active)}
                    />}
                disabled={!active}
                primaryText="OMR"
                secondaryText={`Threshold(${colorHex} ; ${pixel_threshold}%)`}
            >
                <div style={initialStyle.toolbarWrapper}>
                    <div style={initialStyle.toolbar}>
                        <div style={{
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            whiteSpace: 'nowrap',
                        }} >

                            <ButtonColor
                                disabled={!active}
                                color={color}
                                onChange={onChangeColorThreshold}
                                onChangeComplete={onChangeColorThreshold}
                            />

                            <ButtonPercent
                                disabled={!active}
                                pixel_threshold={pixel_threshold}
                                onChangePixelThreshold={onChangePixelThreshold}
                            />
                        </div>
                        <FlatButton
                            disabled={!active || isRunning}
                            style={{ marginTop: 6 }}
                            label={<Translate value={isRunning ? 'omr.button.label.testing' : 'omr.button.label.test'} />}
                            labelPosition="before"
                            icon={<PlayArrowIcon />}
                            primary={true}
                            onClick={e => onRunTest()}
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