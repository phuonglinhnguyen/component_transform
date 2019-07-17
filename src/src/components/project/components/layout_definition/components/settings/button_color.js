import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import { SketchPicker } from 'react-color';
import ColorizeIcon from 'material-ui/svg-icons/image/colorize';

export default class ButtonColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: !1,
        };
    }
    handleTouchTap = (event) => {
        if (event.target.tagName !== 'BUTTON') {
            this.setState({
                open: true,
                anchorEl: this.state.anchorEl||event.currentTarget,
            });
        }
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        const { disabled, color, onChange, onChangeComplete } = this.props;
        return (
            <IconButton
                disabled={disabled}
                onClick={this.handleTouchTap}
            >
                <ColorizeIcon />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    <SketchPicker disableAlpha={true} width={250}
                        color={color}
                        onChange={onChange}
                        onChangeComplete={onChangeComplete}
                    />
                </Popover>
            </IconButton>

        );
    }
}