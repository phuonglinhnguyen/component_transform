import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from "material-ui/IconButton";
import { isEqual } from 'lodash';
const style = {
  box: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    position: 'relative',
    fontSize: 14,
    fontWeight: 500,
    paddingFeft: '0',
    paddingRight: 45,
    verticalAlign: 'middle',
    letterSpacing: 0,
  }
};

export default class DropDownField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState) {
    return (!isEqual(this.props, nextProps)||
    !isEqual(this.state, nextState)
  );
  }
  handleTouchTap(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      listOpen: true,
      anchorEl: findDOMNode(this.anchorEl)
    });
  }
  handleRequestClose() {
    this.setState({
      listOpen: false
    });
  }
 
  render() {
    return (
      <div
        onClick={this.handleTouchTap}
        style={Object.assign({}, style.box, this.props.style)}>
        <span ref={node => this.anchorEl = node} style={Object.assign({}, style.title, this.props.styleTitle)}>{this.props.displayValue[this.props.primaryTextValue]}
          {(this.props.visiEdit || this.state.listOpen) ? <div style={{ position: 'absolute', right: 0, top: -20 }}>
            <IconButton

            >
              <ModeEdit />
            </IconButton>
          </div>:''}
        </span>
        <Popover
          anchorEl={this.state.anchorEl}
          open={this.state.listOpen}
          onRequestClose={this.handleRequestClose}
          canAutoPosition={true}
        >
          <List style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }} >
            {this.props.items.map(item =>
              <ListItem
                key={item.id}
                primaryText={item[this.props.primaryTextValue]}
                onClick={() => {
                  this.props.onSelect(item);
                  this.handleRequestClose();
                }}
              />
            )}
          </List>
        </Popover>
      </div>
    );
  }
}

DropDownField.propTypes = {
  displayValue: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  primaryTextValue: PropTypes.string,
  onSelect: PropTypes.func,
  deleteButton: PropTypes.bool,
  deleteCallback: PropTypes.func,
  deleteLabel: PropTypes.string,
  deleteMessage: PropTypes.string,
  deleteTitle: PropTypes.string
};
