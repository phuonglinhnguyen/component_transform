import React from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import FolderIcon from 'material-ui/svg-icons/file/folder';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import TextField from 'material-ui/TextField';
import wrapState from '../../common/selectable_list_new';
import Popover from 'material-ui/Popover';

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

class GroupTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.props.actions.getListGroups();
    }
    componentWillUnmount() {
        this.props.actions.resetStateProjectGroup();
    }



    renderItem(child_group = [], group_id, primary1Color, secondaryTextColor) {
        //     const {

        //         label_keys = ['name']
        // } = this.props;


        let nestedItems = [];

        child_group.forEach((data, index) => {
            nestedItems = [
                ...nestedItems,
                <ListItem
                    initiallyOpen={true}
                    innerDivStyle={{
                        color: data.id === group_id ? primary1Color : secondaryTextColor,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    key={'list-item-' + data.name}
                    leftIcon={
                        data.type === 'Project' ? (
                            <ContentInbox
                                color={
                                    data.id === group_id ? primary1Color : secondaryTextColor
                                }
                            />
                        ) : (
                                <FolderIcon
                                    color={
                                        data.id === group_id ? primary1Color : secondaryTextColor
                                    }
                                />
                            )
                    }
                    nestedItems={this.renderItem(data.childs, group_id, primary1Color, secondaryTextColor)}
                    onClick={() => this.handleChange(data.id)}
                    value={data.id}
                    primaryText={data.name}
                />


            ];
        });
        return nestedItems;
    }
    handleChange = (value) => {
        this.setState({
            open: false,
            anchorEl: null,
        });
        this.props.handleChangeGroup(value);
    }
    handleClick = (event) => {
        // This prevents ghost click.
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
    getGroup(groups, group_id) {
        if (groups && group_id) {

            for (var item of groups) {
                if (item.id === group_id) {
                    return item;
                }
                if (item.childs && item.childs.length > 0) {
                    var found = this.getGroup(item.childs, group_id);

                    if (found) {
                        return found;
                    }
                }
            }
        }
    }

    render() {

        const { groups, group_id, group_name, primary1Color, secondaryTextColor, errorText } = this.props;
        var groupName;
        if (groups && groups.length > 0) {
            var group = this.getGroup(groups, group_id)

            groupName = group ? group.name : ""
        } else {
            groupName = group_name || "";
        }

        return (
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <TextField
                    floatingLabelText="Group"
                    floatingLabelFixed={true}
                    style={{ cursor: 'pointer' }}
                    readOnly={true}
                    name="group"
                    value={groupName}
                    errorText={errorText}
                    onClick={this.handleClick.bind(this)} />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <SelectableList defaultValue={-1}>
                        {this.renderItem(groups, group_id, primary1Color, secondaryTextColor)}
                    </SelectableList>
                </Popover>
                <NavigationArrowDropDown style={{ marginTop: '45px' }} />
            </div>








        );
    }
}

export default GroupTree;


