import React, { Component } from 'react';
import PropTypes from "prop-types";
import DropDownField from "./dropdown_field_component";
import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import ImageCrop from "material-ui/svg-icons/image/crop";

import shallowEqual from 'recompose/shallowEqual';
import { grey500 } from "material-ui/styles/colors";
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FieldSetting from './setting_field/FieldSetting'
const getViewPostionOption = (item, colorWarning) => {
    let rs = "none";
    if (item.position) {
        rs = (
            <div>
                <div>
                    <span>{parseInt(item.position.x, 0)}</span>,
            <span>{parseInt(item.position.y, 0)}</span>
                </div>
                <div>
                    <span>{parseInt(item.position.w, 0)}</span>,
            <span>{parseInt(item.position.h, 0)}</span>
                </div>
            </div>
        );
    }
    return (
        <div
            style={{
                position: "absolute",
                top: item.position ? 4 : 12,
                right: 100,
                fontSize: 12,
                height: 16,
                margin: 0,
                marginTop: 4,
                color: item.position ? grey500 : colorWarning,
                textOverflow: "ellipsis"
            }}
        >
            {rs}
        </div>
    );
};

const styles = {
    root: {
        cursor: 'move',
    }
}
export default class FieldItem extends Component {
    state = {
        open: !1,
        hovered: !1,
    }
    static tabName = 'FieldItem';
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };
    componentWillReceiveProps(nextProps) {
        if (!this.state.open) {
            if (nextProps.selected
                && nextProps.selectedOptionIndex > -1
                && nextProps.selectedOptionIndex !== this.props.selectedOptionIndex) {
                this.setState({
                    open: !0,
                });
            }
        }
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context, nextContext)
        );
    }
    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };
    handleMouseEnter = (event) => {
        if (!this.state.hovered) this.setState({ hovered: true });
    };

    handleMouseLeave = (event) => {
        this.setState({ hovered: false });
    };

    _getViewPostion = (isHasArgument) => {
        const { item, colorWarning } = this.props;
        let rs = "none";
        if (item.position) {
            rs = (
                <div>
                    <div>
                        <span>{parseInt(item.position.x, 0)}</span>,
                <span>{parseInt(item.position.y, 0)}</span>
                    </div>
                    <div>
                        <span>{parseInt(item.position.w, 0)}</span>,
                <span>{parseInt(item.position.h, 0)}</span>
                    </div>
                </div>
            );
        }
        return (
            <div
                style={{
                    position: "absolute",
                    top: item.position ? 4 : 12,
                    right: 100,
                    fontSize: 12,
                    height: 16,
                    margin: 0,
                    marginTop: 4,
                    color: item.position ? grey500 : colorWarning,
                    textOverflow: "ellipsis"
                }}
            >
                {rs}
            </div>
        );
    }

    _getProps = (isHasArgument) => {
        const {
            onSelect,
            addNodeField,
            selected,
            onSelectOption,
            selectedOptionIndex,
            selectedItemStyle,
            fields,
            fieldsChoose,
            onChangeItem,
            colorWarning,
            changePositionOption,

            item, } = this.props;
        let nameField = 'Choose...'
        try {
            nameField = item.field_id && fields.map[item.field_id].name && fields.map[item.field_id].name
        } catch (error) {
            nameField = `Field ID:${item.field_id} removed`
        }
        let displayValue = { name: nameField };
        let _props = {
            ref: addNodeField,
            style: selected && selectedOptionIndex === -1 ? Object.assign({}, selectedItemStyle, styles.root) : styles.root,
            onClick: onSelect,
            open: this.state.open,
            onNestedListToggle: this.handleNestedListToggle,
            secondaryTextLines: 2,
            primaryText: <DropDownField
                visiEdit={this.state.hovered}
                promptText="fields"
                displayValue={displayValue}
                items={fieldsChoose}
                primaryTextValue="name"
                onSelect={field => {
                    onChangeItem(field.id, item.field_id);
                }}
                deleteButton={false}
            />,

        }

        if (isHasArgument) {
            _props.nestedItems = item.argument_details.map((option, optionIndex) => {
                let isSelected = selected && selectedOptionIndex === optionIndex;
                return (<ListItem
                    key={`option-${optionIndex}`}
                    value={option.value}
                    style={isSelected ? selectedItemStyle : {}}
                    primaryText={`Option: ${option.value}`}
                    onClick={(e) => {
                        onSelectOption(optionIndex);
                    }}
                >
                    <IconButton
                        style={{ position: "absolute", display: "block", top: 0, right: 50 }}
                        onClick={() => {
                            changePositionOption(optionIndex, !!option.position)
                        }
                        }
                    >
                        <ImageCrop />
                    </IconButton>
                    {getViewPostionOption(option, colorWarning)}
                </ListItem>)
            })

        }
        return _props;
    }

    _getOptions = (isHasArgument) => {
        const { item } = this.props;
        if (isHasArgument) {
            let hasPosition = item.argument_details.filter(op => !!op.position).length;
            return (<span style={{ position: 'absolute', left: '50%' }}>{hasPosition}/{item.argument_details.length} {item.argument_details.length > 1 ? 'options' : 'option'}</span>);
        }
        else {
            return;
        }
    }
    render() {
        const { item, changePosition, fields, changeSettingField, sections } = this.props;

        let isHasArgument = !!item.argument_details && item.argument_details.length;
        let _props = this._getProps(isHasArgument);

        return (
            <ListItem {..._props}
                onMouseLeave={this.handleMouseLeave}
                onMouseEnter={this.handleMouseEnter}
            >
                {this._getOptions(isHasArgument)}
                <IconButton
                    style={{ position: "absolute", display: "block", top: 0, right: 60 }}
                    onClick={changePosition}
                >
                    <ImageCrop />
                </IconButton>
                <FieldSetting fields={fields} field={item} sections={sections} changeSettingField={changeSettingField} />
                {this._getViewPostion(isHasArgument)}
            </ListItem >
        );
    }
}

