import React from 'react';
import ReactDOM from 'react-dom';

import * as RouterRedirect from 'connected-react-router'

import Paper from 'material-ui/Paper';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/editor/mode-edit';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';

import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle
} from 'react-sortable-hoc';

import wrapState from '../../../../../components/common/selectable_list_new';

import _ from 'lodash';

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

let o = {
  cursor: 'row-resize',
  display: 'block',
  height: 24,
  left: 4,
  marginLeft: 12,
  position: 'absolute',
  top: 12,
  width: 24
};

const SortDragHandle = SortableHandle(() => <DragHandle style={o} />); // This can be any component you want
const SortableItem = SortableElement(
  ({ value, actionSelectItem, actionEditItem, muiTheme, index_item }) => {
    let expression = value.expression || '';
    expression = expression.replace('return', '=');
    if (expression.length > 40) {
      expression = expression.slice(0, 35) + '...';
    }
    return (
      <ListItem
        onClick={e => {
          if (!e.target.tagName || e.target.tagName.toLowerCase() !== 'div') {
            return;
          }
          actionSelectItem(value);
        }}
        hoverColor="rgba(0, 0, 0, 0)"
        style={{
          marginTop: 1,
          backgroundColor: '#fff'
        }}
        leftIcon={<SortDragHandle />}
        rightIconButton={
          <IconButton
            onClick={() =>
              actionEditItem({
                field_mapping: {
                  open_dialog: true,
                  index: index_item,
                  data: { ...value }
                }
              })}
          >
            <MoreVertIcon />
          </IconButton>
        }
      >
        {`${value.name} ${expression}`}
      </ListItem>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, actionSelectItem, actionEditItem, muiTheme }) => {
    return (
      <SelectableList
        defaultValue={-1}
        style={{
          backgroundColor: muiTheme.palette.background1Color,
          padding: 0,
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {items.map((value, index) => (
          <SortableItem
            actionEditItem={actionEditItem}
            actionSelectItem={actionSelectItem}
            index={index}
            index_item={index}
            key={`item-${index}`}
            muiTheme={muiTheme}
            style={{ border: 1 }}
            value={value}
          />
        ))}
      </SelectableList>
    );
  }
);

const RenderMenuWithoutSort = ({ datas, actionSelectItem, borderColor }) => {
  return (
    <SelectableList
      defaultValue={-1}
      style={{
        height: '100%',
        padding: 0,
        overflowY: 'auto'
      }}
    >
      <List multiple={true}>
        {datas.map((v, i) => {
          return (
            <ListItem
              hoverColor="rgba(0, 0, 0, 0)"
              insetChildren={true}
              key={i}
              onClick={() => actionSelectItem(v)}
              primaryText={v.name}
              style={{
                borderTop: '0.01px solid ' + borderColor,
                borderBottom: '0.01px solid ' + borderColor
              }}
            />
          );
        })}
      </List>
    </SelectableList>
  );
};

class FieldDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choose_height: 750
    };
    this.actionEditItem = this.props.actionEditItem.bind(this);
    this.actionSelectItem = this.props.actionSelectItem.bind(this);
    this.actionUpdateFields = this.props.actionUpdateFields.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };
    for (var key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !_.isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    let nodeStyle = null;
    if (this.props.name && this.refs[this.props.name]) {
      nodeStyle = ReactDOM.findDOMNode(this.refs[this.props.name]);
    }
    if (nodeStyle) {
      this.setState({
        choose_height:
          window.innerHeight - nodeStyle.getBoundingClientRect().top
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const items = arrayMove(this.props.datas, oldIndex, newIndex);
    if (JSON.stringify(items) === JSON.stringify(this.props.datas)) {
      return;
    }
    this.actionUpdateFields({ [this.props.name]: items });
  };

  render() {
    const {
      is_sort = false,
      datas = [],
      title = null,
      name = '',
      muiTheme,
      has_add_button = false
    } = this.props;
    return (
      <Paper zDepth={1} style={{ padding: -2 }}>
        {has_add_button && (
          <FloatingActionButton
            mini={true}
            onClick={() =>
              this.actionEditItem({
                field_mapping: {
                  open_dialog: true,
                  index: -1,
                  data: {}
                }
              })}
            style={{ position: 'fixed', marginTop: -20, marginLeft: 10 }}
          >
            <ContentAdd />
          </FloatingActionButton>
        )}
        {title}
        <Paper
          ref={name}
          style={{ height: this.state.choose_height }}
          transitionEnabled={false}
          zDepth={0}
        >
          {is_sort ? (
            <SortableList
              actionEditItem={this.actionEditItem}
              actionSelectItem={this.actionSelectItem}
              axis={'y'}
              items={datas}
              muiTheme={muiTheme}
              useDragHandle={true}
              onSortEnd={this.onSortEnd}
              pressDelay={100}
            />
          ) : (
            <RenderMenuWithoutSort
              actionSelectItem={this.actionSelectItem}
              borderColor={muiTheme.palette.borderColor}
              datas={[...datas]}
            />
          )}
        </Paper>
      </Paper>
    );
  }
}

export default FieldDetails;
