import React, { Component } from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';
import { isEqual } from 'lodash';
import IconButton from 'material-ui/IconButton';
import ImageCrop from 'material-ui/svg-icons/image/crop';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import OpenIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Chip from 'material-ui/Chip';
import { SETTING_TITLE } from '../constant';
function getStyles(props, context) {
    const { card } = context.muiTheme;
    return {
        root: {
            width: '100%',
            height: '116px',
            position: 'relative',
        },
        toobar: {
            display: 'inline-flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: 'calc(100%)',
            fontWeight: card.fontWeight,
            whiteSpace: 'nowrap',
        },
        toobarLeft: {
            display: 'inline-flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingLeft: 8,
        }
        ,
        toobarInfo: {
            marginTop: 12,
            height: 32,
        },
        sectionTitle: {
            display: 'inline-flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: 'calc(100%)',
            fontWeight: card.fontWeight,
            whiteSpace: 'nowrap',
        },
        text: {
            display: 'inline-block',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            width: 'calc(50% - 16px)',
            paddingLeft: 16,
        },
        sectionTitleAction: {
            display: 'inline-block',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            width: 'calc(50% - 16px)',
            paddingLeft: 16,
        },
        checkbox: {
            width: 26,
            margin: '16px 4px 0 8px',
        },
        title: {
            color: props.titleColor || card.titleColor,
            display: 'block',
            fontSize: 15,
        },
        subtitle: {
            color: props.subtitleColor || card.subtitleColor,
            display: 'block',
            fontSize: 14,
        },
    };
}

const getViewPostion = (item) => {
    if (item.position) {
        return (
            <div style={{
                // position: 'absolute',
                marginTop: 12,
                fontSize: 12,
                height: 32,
                // margin: 0,
                // marginTop: 4,
                color: grey500,
                // textOverflow: 'ellipsis'
            }}>
                <div>
                    <span>{parseInt(item.position.x, 0) || ''}</span>,
                    <span>{parseInt(item.position.y, 0) || ''}</span>
                </div>
                <div>
                    <span>{parseInt(item.position.w, 0) || ''}</span>,
                    <span>{parseInt(item.position.h, 0) || ''}</span>
                </div>
            </div>
        );
    }
    return (
        <div style={{
            fontSize: 12,
            height: 16,
            // margin: 0,
            marginTop: 16,
            color: grey500,
            // textOverflow: 'ellipsis'
        }}
        >
            none
        </div>
    );
}
class SectionHeader extends Component {
    static muiName = 'CardHeader';
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (!isEqual(this.props, nextProps)
            || !isEqual(this.state, nextState)
            || !isEqual(this.context, nextContext)
        );
    }
    handleChangeName = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onChangeSectionName(event.target.value);
    }

    handleCheck = (event, isChecked) => {
        this.props.onSelect(isChecked);
    }
    getInfoSection = () => {
        const { section } = this.props;
        let rs = [];
        if (section.settings) {
            let label = [];
            Object.keys(section.settings).forEach(key => {
                if (section.settings[key] && SETTING_TITLE[key]) {
                    label.push(I18n.t(SETTING_TITLE[key]))
                } else {
                    if (!['fieldId', 'autoIncrement', 'autoIncrementStart'].includes(key)) {
                        label.push(I18n.t(key))
                    }
                }
            })
            if (section.settings.fieldId) {
                label.push(I18n.t('fieldId'))
            }
            rs.push(<Chip key={`info-settings`} >
                {label.join(', ')}
            </Chip>)
        }
        return rs;
    }
    render() {
        const {
            style,
            selected,
            section,
            sections,
            onChangePosition,
            onOpenSetting,
            onClose,
            expanded,
            onExpanding,
        } = this.props;
        let errorRequiredSectionName =
            !section.name || section.name.trim().length === 0 ? I18n.t('error_text.field_required') : '';
        if (errorRequiredSectionName.length === 0) {
            let comflict = sections.items.filter(item => item.name && item.name.trim() === section.name.trim())
            if (comflict.length > 1) {
                errorRequiredSectionName = I18n.t('error_text.conflict_name')
            }
        }
        const { prepareStyles } = this.context.muiTheme;
        const styles = getStyles(this.props, this.context);
        let selectedStyle = selected ? {} : {};

        return (
            <div style={prepareStyles(Object.assign(styles.root, style, selectedStyle))}>
                <div style={prepareStyles(Object.assign(styles.toobar))}>
                    <div style={prepareStyles(Object.assign(styles.toobarLeft))}>
                        <Checkbox
                            checked={selected}
                            onCheck={this.handleCheck}
                            style={styles.checkbox}
                        />
                        <div style={prepareStyles(Object.assign(styles.toobarInfo))}>
                            {this.getInfoSection()}
                        </div>
                    </div>
                    <div>
                        <IconButton
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onOpenSetting();
                            }}
                        >
                            <ActionSettings />
                        </IconButton>

                        <IconButton
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            <ContentClear />
                        </IconButton>
                    </div>
                </div>
                <div style={prepareStyles(Object.assign(styles.sectionTitle))}>
                    <div style={prepareStyles(Object.assign(styles.text))}>
                        <TextField
                            errorText={errorRequiredSectionName}
                            value={section.name || ''}
                            hintText={<Translate value="projects.layout_definitions.hint_text.section_name" />}
                            fullWidth={true}
                            underlineStyle={{ borderColor: 'gray' }}
                            onKeyDown={event => event.stopPropagation()}
                            onChange={this.handleChangeName}
                            name="name"
                        />
                    </div>
                    <div>
                        <div style={{ display: 'inline-flex', alignContent: 'right', paddingRight: 20 }}>
                            {getViewPostion(section)}
                            <IconButton
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onChangePosition();
                                }}>
                                <ImageCrop />
                            </IconButton>
                            <IconButton
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onExpanding(!expanded);
                                }}
                            >
                                {expanded ? <OpenIcon /> : <CloseIcon />}
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SectionHeader;
