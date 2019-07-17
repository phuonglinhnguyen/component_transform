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

import wrapState from '../../../../common/selectable_list_new';

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
  ({ value, actionSelectItem, actionEditItem, muiTheme, index_item, type }) => {
    let expression = value.value || '';
    expression = expression.replace('return', '=');
    if (expression.length > 40) {
      expression = expression.slice(0, 35) + '...';
    }
    return (
      <ListItem
        // onClick={e => {
        //   if (!e.target.tagName || e.target.tagName.toLowerCase() !== 'div') {
        //     return;
        //   }
        //   actionSelectItem(value);
        // }}
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
                  data: { ...value },
                  title: "Edit Item",
                  type: type
                }
              })}
          >
            <MoreVertIcon />
          </IconButton>
        }
      >
        {`${value.name} = ${expression}`}
      </ListItem>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, actionSelectItem, actionEditItem, muiTheme, type }) => {
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
            type={type}
          />
        ))}
      </SelectableList>
    );
  }
);

class FieldExportTypeConfigDetails extends React.Component {
  constructor(props) {
    super(props);

    const {actionEditItem, actionSelectItem, actionUpdateFields, defaultHeight} = this.props;
    this.state = {
      choose_height: defaultHeight
    };
    
    this.actionEditItem = actionEditItem && actionEditItem.bind(this);
    this.actionSelectItem = actionSelectItem && actionSelectItem.bind(this);
    this.actionUpdateFieldsRootConfig = actionUpdateFields && actionUpdateFields.bind(this);
    this.onSortEndRootConfig = this.onSortEndRootConfig.bind(this);
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

  onSortEndRootConfig = ({ oldIndex, newIndex }) => {
    const { type, datas } = this.props;
    const items = arrayMove(this.props.datas, oldIndex, newIndex);
    if (_.isEqual(items,datas)) {
      return;
    }
    this.actionUpdateFieldsRootConfig({ [this.props.name]: items, type});
  };

  render() {
    const {
      is_sort = false,
      datas = [],
      title = null,
      name = '',
      muiTheme,
      has_add_button = false,
      type,
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
                  data: {},
                  title: "Add Item",
                  type: type
                }
              })}
            style={{ position: 'absolute', marginTop: 0, marginLeft: 10 }}
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
              onSortEnd={this.onSortEndRootConfig}
              pressDelay={100}
              type={type}
            />
          ) : ''}
        </Paper>
      </Paper>
    );
  }
}

export default FieldExportTypeConfigDetails;
