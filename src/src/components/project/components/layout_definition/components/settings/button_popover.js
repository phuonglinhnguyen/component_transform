import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
export default class ButtonPopover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    closePopover(event
    ) {
        this.setState({
            open: false,
        });
    }
    openPopover() {
        this.setState({
            open: true,
        });
    }
    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const{label,buttonLabelPosition,iconButton,disabled ,typeButton} = this.props;
        let _button =typeButton?typeButton:RaisedButton;
        return (
            <div>
                <_button
                    onClick={this.handleTouchTap}
                    label={label}
                    disabled={!!disabled}
                    labelPosition={buttonLabelPosition}
                    icon={iconButton}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    {this.props.children}
                </Popover>
            </div>
        );
    }
}