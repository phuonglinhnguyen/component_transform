import React, { Component } from 'react';
import { Translate } from 'react-redux-i18n';// eslint-disable-line no-unused-vars
import { Tabs, Tab } from 'material-ui/Tabs';// eslint-disable-line no-unused-vars
import SwipeableViews from 'react-swipeable-views';// eslint-disable-line no-unused-vars
import TextField from 'material-ui/TextField';// eslint-disable-line no-unused-vars
import Slider from 'material-ui/Slider';// eslint-disable-line no-unused-vars
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { SketchPicker } from 'react-color';
import { isEqual } from 'lodash';
const styles = {
    root: {
        display: 'flex'
    },
    slide: {
        padding: 10,
        width: 250
    },
    preview: {
        marginLeft: 16,
        marginTop: 16,
        width: 100,
        height: 50,
    },
    tool: {
        width: 132,
        position: 'relative',
        display: 'block',
    }, actions: {
        marginLeft: 16,
        marginTop: 16,
    }
};
const getColorTest = (color) => {
    return color.hsl && color.hsl.l < 0.5 ? '#ffffff' : '#000000';
}
export default class OMRColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: { hex: '#FFF' },
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ color: nextProps.color })
    }
    componentWillMount() {
        this.setState({ color: this.props.color })
    }
    handleChangeColor = (color, event) => {
        this.setState({ color });
    }
    handleChangeColorComplete = (color, event) => {
        this.setState({ color });
    };
    handleSetColor = (event) => {
        event.preventDefault();
        const { onChange } = this.props;
        onChange(this.state.color);
    }
    handleClearColor = (event) => {
        const { onChange } = this.props;
        onChange({})
        this.setState({ color: { hex: '#FFF' } });
    }
    render() {
        const { color } = this.state;
        let stylePreview = { display: 'block', height: 25, width: '100%', borderRadius: '2px 2px 0px 0px', textAlign: 'center', color: getColorTest(color), background: color.hex }
        let stylePreviewOld = { display: 'block', height: 25, width: '100%', borderRadius: '0px 0px 2px 2px', textAlign: 'center', color: getColorTest(this.props.color), background: this.props.color.hex }
        return (
            <div style={Object.assign({},styles.root,this.props.style)}>
                <SketchPicker disableAlpha={true} width={styles.slide.width}
                    color={color}
                    onChange={this.handleChangeColor}
                    onChangeComplete={this.handleChangeColorComplete}
                />
                <div style={styles.tool}>
                    <Paper zDepth={1} style={styles.preview} >
                        <div style={stylePreview}>
                            <p style={{ paddingTop: 4, margin: 0 }}>
                                {color.hex && color.hex.toLocaleUpperCase()}
                            </p>
                        </div>
                        <div style={stylePreviewOld}>
                            <p style={{ paddingTop: 4, margin: 0 }}>
                                {this.props.color.hex && this.props.color.hex.toLocaleUpperCase()}
                            </p>
                        </div>

                    </Paper>
                    <div style={styles.actions}>
                        <RaisedButton label="Set" primary={true} style={{ marginBottom: 8, width: 100 }} onClick={this.handleSetColor} />
                        <RaisedButton label="Clear" style={{ width: 100 }} onClick={this.handleClearColor} />
                    </div>
                </div>
            </div>
        );
    }
}