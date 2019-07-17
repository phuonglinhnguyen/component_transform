import React from 'react';

import { List, ListItem, makeSelectable } from 'material-ui/List';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import FolderIcon from 'material-ui/svg-icons/file/folder';

import wrapState from '../../../../common/selectable_list_new';

import { GROUP_MANAGEMENT_TYPE_PROJECT } from '../constants/group_management_constant';

import { isEqual } from 'lodash';

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

class GroupTree extends React.Component {
  shouldComponentUpdate(nextProps) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        if (
          !key.includes('action') &&
          !isEqual(this.props[key], nextProps[key])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  renderItem(child_group = [], name) {
    const {
      id_selected,
      label_keys = ['name'],
      primary1Color,
      secondaryTextColor,
    } = this.props;
    let nestedItems = [];
    child_group.forEach((data, index) => {
      if (data.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
        return;
      }
      nestedItems = [
        ...nestedItems,
        <ListItem
          initiallyOpen={JSON.stringify(data.childs || []).includes(
            id_selected
          )}
          innerDivStyle={{
            color: data.id === id_selected ? primary1Color : secondaryTextColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          key={'list-item-' + data.name}
          leftIcon={
            data.type === 'Project' ? (
              <ContentInbox
                color={
                  data.id === id_selected ? primary1Color : secondaryTextColor
                }
              />
            ) : (
              <FolderIcon
                color={
                  data.id === id_selected ? primary1Color : secondaryTextColor
                }
              />
            )
          }
          nestedItems={this.renderItem(data.childs, data.name)}
          onClick={() => this.props.action_redirectGroup(data.id, data)}
          value={data.id}
        >
          {label_keys.map(_label => {
            return data[_label];
          })}
        </ListItem>
      ];
    });
    return nestedItems;
  }

  render() {
    const {
      action_redirectGroup,
      datas = [],
      id_selected,
      primary1Color,
      secondaryTextColor,
      style = {}
    } = this.props;
    return (
      <SelectableList defaultValue={-1} style={{ ...style }}>
        <ListItem
          initiallyOpen={true}
          innerDivStyle={{
            color: id_selected === 'root' ? primary1Color : secondaryTextColor
          }}
          key={'list-item-root'}
          leftIcon={
            <FolderIcon
              color={
                id_selected === 'root' ? primary1Color : secondaryTextColor
              }
            />
          }
          nestedItems={this.renderItem(datas, 'Groups')}
          onClick={() => action_redirectGroup('root', datas)}
          value={'root'}
        >
          {'Groups'}
        </ListItem>
      </SelectableList>
    );
  }
}

export default GroupTree;
