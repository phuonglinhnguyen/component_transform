import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import BlurOnIcon from 'material-ui/svg-icons/image/blur-on';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';

export default class ButtonPercent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pixel_threshold: 0,
            open: !1,
        };
        this.onChange =this.props.onChangePixelThreshold
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ pixel_threshold: nextProps.pixel_threshold || 0 })
    }
    componentWillMount() {
        this.setState({ pixel_threshold: this.props.pixel_threshold || 0 })
    }
    onWheel = (event) => {
        event.preventDefault();
        let _p = this.state.pixel_threshold;
        if (event.deltaY < 0) {
            _p += 1;
        } else {
            _p -= 1;
        }
        _p = _p > 100 ? 100 : _p < 0 ? 0 : _p;
        this.setState({ pixel_threshold: _p });
        this.onChange(_p);
    }

    setEvent = (node) => {
        if (node) {
            this._slider = node;
            this._slider.addEventListener('wheel', this.onWheel)
        } else {
            this._slider.removeEventListener('wheel', this.onWheel)
            this._slider = node;
        }
    }

    handleChangePixelThreshold = (event, val) => {
        this.setState({ pixel_threshold: val });
        this.onChange(val);
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
        return (
            <IconButton 
            disabled={this.props.disabled}
            onClick={this.handleTouchTap}>
                <BlurOnIcon />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    <div ref={this.setEvent} style={{ width: 65, height: 145, overflow: 'hidden', textAlign: 'center' }}>
                        <Slider
                            style={{ height: 100, marginLeft: 25 }} axis="y"
                            min={0}
                            max={100}
                            step={1}
                            value={this.state.pixel_threshold}
                            onChange={this.handleChangePixelThreshold}
                        />
                    </div>
                </Popover>
            </IconButton>

        );
    }
}