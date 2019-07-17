import React from 'react';

import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';


import _ from 'lodash';

import wrapState from '../../../../../components/common/selectable_list_new';

import CheckedIcon from 'material-ui/svg-icons/toggle/check-box';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import UnCheckBox from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import CheckedBox from 'material-ui/svg-icons/toggle/radio-button-checked';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import { Translate } from 'react-redux-i18n';

/**
 * @param {*anchorEl} null
 * @param {*dataSource} []
 * @param {*handleBigMenus} func
 * @param {*has_header} boolean
 * @param {*multiple} true
 * @param {*name} ''
 * @param {*noMatchFound} '<Translate value={"no match found"} />'
 * @param {*onClickItem} func
 * @param {*onFilterTyping} func
 * @param {*selectAllLabel} func
 * @param {*selectedColor} #F50057
 * @param {*showFilter} false
 * @param {*showSelectAll} false
 * @param {*totalCells} 3
 * @param {*valueFilter} ''
 * @param {*values} [] || {}
 *
 */

class ItemSelector extends React.PureComponent {
  render() {
    const {
      data,
      index,
      is_single_click = false,
      multiple,
      onClickItem,
      selectedColor,
      name,
      i
    } = this.props;

    let checked = <CheckedIcon style={{ color: selectedColor }} />;
    let unCheck = <UnCheckedIcon />;

    if (!multiple) {
      checked = <CheckedBox style={{ color: selectedColor }} />;
      unCheck = <UnCheckBox />;
    }
    if (is_single_click) {
      checked = <div />;
      unCheck = null;
    }
    return (

      <ListItem
        key={data.id}
        dense
        onClick={() => onClickItem(data, index, name)}
      >
        <Checkbox
          checked={index > -1 ? true : false}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={data.name} />
      </ListItem>

    );
  }
}

class Menus extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClickItem = this.handleOnClickItem.bind(this);
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
    return !_.isEqual(props, nextProps);
  }

  handleOnClickItem(data, index, name) {
    const { values, multiple = true, onClickItem } = this.props;
    if (multiple) {
      let response = [...values];
      if (index > -1) {
        response.splice(index, 1);
      } else {
        response.push(data);
      }
      onClickItem(response, name);
    } else {
      onClickItem(data, name);
    }
  }

  render() {
    const {
      dataSource = [],
      has_header = true,
      information = '',
      isLoadMore = false,
      labelName = 'name',
      multiple = true,
      name = '',
      noMatchFound = <Translate value={'no match found'} />,
      onClickItem = () => undefined,
      onClickLoadMore = () => undefined,
      onFilterTyping = null,
      selectedColor = '#F50057',
      showFilter = false,
      showSelectAll = false,
      style = { padding: 10 },
      totalCells = 3,
      valueFilter = '',
      values
    } = this.props;

    if (
      (multiple && !Array.isArray(values) && values) ||
      (!multiple && Array.isArray(values) && values)
    ) {
      alert('wrong input');
    }
    return (
      <Paper style={{ padding: 10 }} zDepth={0}>
        {has_header && (
          <GridList cols={3} cellHeight="auto" padding={-10}>
            {showSelectAll ? (
              <RaisedButton
                label={
                  <Translate
                    value={`projects.qc_sampling.all_in_selector`}
                    name={name}
                  />
                }
                disabled={!multiple}
                onClick={() =>
                  onClickItem(
                    _.concat(
                      values,
                      _.differenceBy(
                        dataSource,
                        values,
                        Array.isArray(labelName)
                          ? labelName[0]
                          : labelName || ''
                      )
                    ),
                    name
                  )
                }
              />
            ) : (
                <div />
              )}
            {showSelectAll ? (
              <RaisedButton
                disabled={!multiple}
                label={
                  <Translate
                    value={`projects.qc_sampling.de_select_all`}
                    name={name}
                  />
                }
                onClick={() => {
                  if (values.length === 0) {
                    return;
                  }
                  onClickItem(
                    _.differenceBy(
                      values,
                      dataSource,
                      Array.isArray(labelName) ? labelName[0] : labelName || ''
                    ),
                    name
                  );
                }}
              />
            ) : (
                <div />
              )}
            {showFilter ? (
              <TextField
                autoFocus={showFilter}
                value={valueFilter}
                fullWidth={true}
                hintText={<Translate value={`commons.hint_text.search`} />}
                onChange={(event, newValue) => onFilterTyping(newValue)}
              />
            ) : (
                <div />
              )}
            {Array.isArray(values) ? (
              <GridTile cols={1}>
                <Subheader>
                  <Translate
                    value={`projects.qc_sampling.data_selected`}
                    name={values.length}
                  />
                </Subheader>
              </GridTile>
            ) : (
                <div />
              )}
            <GridTile cols={2} style={{ marginLeft: totalCells * 45 }}>
              <Subheader inset={true}>{information}</Subheader>
            </GridTile>
          </GridList>
        )}

        <List style={{ maxHeight: 650, overflow: 'auto' }}>
          <Grid container style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1
          }} spacing={16} lg={12} md={12} sm={12} xs={12}>
            {dataSource.map((data, i) => {
              let index = -1;
              if (multiple) {
                if (typeof data !== 'string') {
                  index = _.findIndex(values, data);
                } else {
                  index = values.indexOf(data);
                }
              } else {
                index = _.isEqual(values, data) ? 0 : -1;
              }

              return (
                <Grid item lg={6} md={6} sm={6} xs={12} >
                  <ItemSelector
                    data={data}
                    index={index}
                    is_single_click={!values}
                    key={`item-selector-${name}-${i}`}
                    multiple={multiple}
                    name={name}
                    onClickItem={this.handleOnClickItem}
                    selectedColor={selectedColor}
                    i={i}
                  />
                </Grid>
              );
            })}
          </Grid>
        </List>
        
      </Paper >
    );
  }
}

const BigMenuPopover = ({ ...props }) => {
  const {
    name = '',
    anchorEl = null,
    handleBigMenus = null,
    totalCells = 3,
    cellWidth = 350
  } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onRequestClose={() => handleBigMenus(name, null)}
      open={anchorEl ? true : false}
      style={{
        overflowY: 'auto',
        width: totalCells * cellWidth
      }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      useLayerForClickAway={false}
    >
      <Menus {...props} />
    </Popover>
  );
};

class BigMenuWithRadioButton extends React.Component {
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

  render() {
    const {
      handleBigMenus = null,
      name = '',
      onClickItem = null,
      values
    } = this.props;

    return (
      <Paper zDepth={0}>
        <Subheader inset={true}>
          {<Translate value={`projects.qc_sampling.label_setting_${name}`} />}
        </Subheader>
        <RadioButtonGroup name="batch_selector" defaultSelected="-1">
          <RadioButton
            value="-1"
            label={
              <Translate value={`projects.qc_sampling.select_all_${name}`} />
            }
            onClick={e => { onClickItem([], name); alert(e.target) }}
          />
          <RadioButton
            value="0"
            label={
              <Translate
                value={`projects.qc_sampling.total_selected_${name}`}
                total={values.length}
              />
            }
            onClick={e => handleBigMenus(name, e.currentTarget)}
          />
        </RadioButtonGroup>
        <BigMenuPopover {...this.props} />
      </Paper>
    );
  }
}

class BigMenuWithListItem extends React.Component {
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
    return !_.isEqual(props, nextProps);
  }

  render() {
    const {
      dataSource = [],
      handleBigMenus = null,
      isLoadMore = false,
      name = '',
      title,
      values
    } = this.props;
    let total = 0;
    if (dataSource.length > 0) {
      if (
        values.length === 0 ||
        (values.length === dataSource.length && !isLoadMore)
      ) {
        total = 'All';
      } else {
        total = values.length;
      }
    }

    return (
      <Paper zDepth={0}>
        <ListItem
          disableKeyboardFocus={true}
          hoverColor={'#fff'}
          innerDivStyle={{ padding: '16px 0px 0px 16px' }}
          onClick={e => handleBigMenus(name, e.currentTarget)}
          primaryText={
            title ? (
              title
            ) : (
                <Translate value={`projects.qc_sampling.label_setting_${name}`} />
              )
          }
          rightIcon={<ArrowDown />}
          secondaryText={
            <Translate
              value={`projects.qc_sampling.total_selected_${name}`}
              total={total}
            />
          }
          secondaryTextLines={2}
        />
        <BigMenuPopover {...this.props} />
      </Paper>
    );
  }
}

export { BigMenuPopover, Menus, BigMenuWithRadioButton, BigMenuWithListItem };
