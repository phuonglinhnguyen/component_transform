import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import autoPrefix from 'material-ui/utils/autoPrefix';
import transitions from 'material-ui/styles/transitions';
import Overlay from 'material-ui/internal/Overlay';
import Paper from 'material-ui/Paper';
import propTypes from 'material-ui/utils/propTypes';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';
import FileUploader from '../upload_file_component';
let openNavEventHandler = null;
class ListImage extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.object,
        disableSwipeToOpen: PropTypes.bool,
        docked: PropTypes.bool,
        onRequestChange: PropTypes.func,
        open: PropTypes.bool,
        openSecondary: PropTypes.bool,
        inside: PropTypes.bool,
        overlayClassName: PropTypes.string,
        overlayStyle: PropTypes.object,
        style: PropTypes.object,
        swipeAreaWidth: PropTypes.number,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        zDepth: propTypes.zDepth,
    };
    static defaultProps = {
        disableSwipeToOpen: false,
        docked: true,
        open: null,
        inside: true,
        openSecondary: false,
        swipeAreaWidth: 30,
        width: null,
        zDepth: 2,
    };
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };
    componentWillMount() {
        this.maybeSwiping = false;
        this.touchStartX = null;
        this.touchStartY = null;
        this.swipeStartX = null;
        this.setState({
            open: (this.props.open !== null) ? this.props.open : this.props.docked,
            swiping: null,
        });
    }
    componentDidMount() {
        this.enableSwipeHandling();
    }
    componentWillReceiveProps(nextProps) {
        // If controlled then the open prop takes precedence.
        if (nextProps.open !== null) {
            this.setState({
                open: nextProps.open,
            });
            // Otherwise, if docked is changed, change the open state for when uncontrolled.
        } else if (this.props.docked !== nextProps.docked) {
            this.setState({
                open: nextProps.docked,
            });
        }
    }

    componentDidUpdate() {
        this.enableSwipeHandling();
    }

    componentWillUnmount() {
        this.disableSwipeHandling();
        this.removeBodyTouchListeners();
    }
    getStyles() {
        const muiTheme = this.context.muiTheme;
        const theme = muiTheme.drawer;
        const { inside } = this.props;
        const x = this.getTranslateMultiplier() * (this.state.open ? 0 : this.getMaxTranslateX());

        const styles = {
            root: {
                height: '100%',
                width: this.getTranslatedWidth() || theme.width,
                position: inside ? 'absolute' : 'fixed',
                zIndex: muiTheme.zIndex.drawer,
                left: 0,
                top: 0,
                transform: `translate(${x}px, 0)`,
                transition: !this.state.swiping && transitions.easeOut(null, 'transform', null),
                backgroundColor: theme.color,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
            },
            overlay: {
                zIndex: muiTheme.zIndex.drawerOverlay,
                pointerEvents: this.state.open ? 'auto' : 'none', // Bypass mouse events when left nav is closing.
            },
            rootWhenOpenRight: {
                left: 'auto',
                right: 0,
            },
        };

        return styles;
    }

    shouldShow() {
        return this.state.open || !!this.state.swiping;  // component is swiping
    }

    close(reason) {
        if (this.props.open === null) this.setState({ open: false });
        if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
        return this;
    }

    open(reason) {
        if (this.props.open === null) this.setState({ open: true });
        if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
        return this;
    }

    handleTouchTapOverlay = (event) => {
        event.preventDefault();
        this.close('clickaway');
    };

    handleKeyUp = (event) => {
        if (this.state.open && !this.props.docked && keycode(event) === 'esc') {
            this.close('escape');
        }
    };
    getTranslatedWidth() {
        if (typeof this.props.width === 'string') {
            if (!/^\d+(\.\d+)?%$/.test(this.props.width)) {
                throw new Error('Not a valid percentage format.');
            }
            const width = parseFloat(this.props.width) / 100.0;
            // We are doing our best on the Server to render a consistent UI, hence the
            // default value of 10000
            return typeof window !== 'undefined' ? width * window.innerWidth : 10000;
        } else {
            return this.props.width;
        }
    }

    getMaxTranslateX() {
        const width = this.getTranslatedWidth() || this.context.muiTheme.drawer.width;
        return width + 10;
    }

    getTranslateMultiplier() {
        return this.props.openSecondary ? 1 : -1;
    }

    enableSwipeHandling() {
        if (!this.props.docked) {
            document.body.addEventListener('touchstart', this.onBodyTouchStart);
            if (!openNavEventHandler) {
                openNavEventHandler = this.onBodyTouchStart;
            }
        } else {
            this.disableSwipeHandling();
        }
    }

    disableSwipeHandling() {
        document.body.removeEventListener('touchstart', this.onBodyTouchStart);
        if (openNavEventHandler === this.onBodyTouchStart) {
            openNavEventHandler = null;
        }
    }

    onBodyTouchStart = (event) => {
        const swipeAreaWidth = this.props.swipeAreaWidth;

        const touchStartX = this.context.muiTheme.isRtl ?
            (document.body.offsetWidth - event.touches[0].pageX) :
            event.touches[0].pageX;
        const touchStartY = event.touches[0].pageY;

        // Open only if swiping from far left (or right) while closed
        if (swipeAreaWidth !== null && !this.state.open) {
            if (this.props.openSecondary) {
                // If openSecondary is true calculate from the far right
                if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
            } else {
                // If openSecondary is false calculate from the far left
                if (touchStartX > swipeAreaWidth) return;
            }
        }

        if (!this.state.open &&
            (openNavEventHandler !== this.onBodyTouchStart ||
                this.props.disableSwipeToOpen)
        ) {
            return;
        }

        this.maybeSwiping = true;
        this.touchStartX = touchStartX;
        this.touchStartY = touchStartY;

        document.body.addEventListener('touchmove', this.onBodyTouchMove);
        document.body.addEventListener('touchend', this.onBodyTouchEnd);
        document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
    };

    removeBodyTouchListeners() {
        document.body.removeEventListener('touchmove', this.onBodyTouchMove);
        document.body.removeEventListener('touchend', this.onBodyTouchEnd);
        document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
    }

    setPosition(translateX) {
        const rtlTranslateMultiplier = this.context.muiTheme.isRtl ? -1 : 1;
        const drawer = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
        const transformCSS = `translate(${(this.getTranslateMultiplier() * rtlTranslateMultiplier * translateX)}px, 0)`;
        this.refs.overlay.setOpacity(1 - translateX / this.getMaxTranslateX());
        autoPrefix.set(drawer.style, 'transform', transformCSS);
    }

    getTranslateX(currentX) {
        return Math.min(
            Math.max(
                this.state.swiping === 'closing' ?
                    this.getTranslateMultiplier() * (currentX - this.swipeStartX) :
                    this.getMaxTranslateX() - this.getTranslateMultiplier() * (this.swipeStartX - currentX),
                0
            ),
            this.getMaxTranslateX()
        );
    }

    onBodyTouchMove = (event) => {
        const currentX = this.context.muiTheme.isRtl ?
            (document.body.offsetWidth - event.touches[0].pageX) :
            event.touches[0].pageX;
        const currentY = event.touches[0].pageY;

        if (this.state.swiping) {
            event.preventDefault();
            this.setPosition(this.getTranslateX(currentX));
        } else if (this.maybeSwiping) {
            const dXAbs = Math.abs(currentX - this.touchStartX);
            const dYAbs = Math.abs(currentY - this.touchStartY);
            // If the user has moved his thumb ten pixels in either direction,
            // we can safely make an assumption about whether he was intending
            // to swipe or scroll.
            const threshold = 10;

            if (dXAbs > threshold && dYAbs <= threshold) {
                this.swipeStartX = currentX;
                this.setState({
                    swiping: this.state.open ? 'closing' : 'opening',
                });
                this.setPosition(this.getTranslateX(currentX));
            } else if (dXAbs <= threshold && dYAbs > threshold) {
                this.onBodyTouchEnd();
            }
        }
    };

    onBodyTouchEnd = (event) => {
        if (this.state.swiping) {
            const currentX = this.context.muiTheme.isRtl ?
                (document.body.offsetWidth - event.changedTouches[0].pageX) :
                event.changedTouches[0].pageX;
            const translateRatio = this.getTranslateX(currentX) / this.getMaxTranslateX();

            this.maybeSwiping = false;
            const swiping = this.state.swiping;
            this.setState({
                swiping: null,
            });

            // We have to open or close after setting swiping to null,
            // because only then CSS transition is enabled.
            if (translateRatio > 0.5) {
                if (swiping === 'opening') {
                    this.setPosition(this.getMaxTranslateX());
                } else {
                    this.close('swipe');
                }
            } else {
                if (swiping === 'opening') {
                    this.open('swipe');
                } else {
                    this.setPosition(0);
                }
            }
        } else {
            this.maybeSwiping = false;
        }

        this.removeBodyTouchListeners();
    };

    render() {
        const {
      children,
            className,
            containerClassName,
            containerStyle,
            docked,
            openSecondary,
            overlayClassName,
            overlayStyle,
            style,
            zDepth,
            onClose,
            onImageLoad,
    } = this.props;

        const styles = this.getStyles();

        let overlay;
        if (!docked) {
            overlay = (
                <Overlay
                    ref="overlay"
                    show={this.shouldShow()}
                    className={overlayClassName}
                    style={Object.assign(styles.overlay, overlayStyle)}
                    transitionEnabled={!this.state.swiping}
                    onClick={this.handleTouchTapOverlay}
                />
            );
        }

        return (
            <div
                className={className}
                style={style}
            >

                <EventListener target="window" onKeyUp={this.handleKeyUp} />
                {overlay}
                <Paper
                    ref="clickAwayableElement"
                    zDepth={zDepth}
                    rounded={false}
                    transitionEnabled={!this.state.swiping}
                    className={containerClassName}
                    style={Object.assign(styles.root, openSecondary && styles.rootWhenOpenRight, containerStyle)}
                >
                    <AppBar
                        iconElementLeft={<IconButton tooltip="Close" onClick={onClose}>
                            <IconClose />
                        </IconButton>}
                        iconElementRight={<FileUploader onFileLoad={onImageLoad} mini={true}
                        />}
                    />
                    {children}
                </Paper>
            </div>
        );
    }
}

export default ListImage;


