import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import IconButton from "material-ui/IconButton";
import FlatButton from 'material-ui/FlatButton';
import SettingOmr from './setting_omr';
import SettingLoadDataSource from './setting_load_data_keying';
import SettingSingle from './setting_section_single';
import SettingActive from './setting_active';
import SettingVisibleFields from './setting_visible_fields'
import SettingMixed from './setting_mixed_fields'
import SettingDisableFields from './setting_disable_fields'
import SettingSwitchDisableFields from './setting_switch_disable_fields'
import ContentClear from 'material-ui/svg-icons/content/clear';
import SettingMultiple from './setting_section_multiple'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SettingDoubleTyping from './setting_double_typing'
import SettingValidation from './setting_validation';
import ValidationEditer from './validation';
import SettingSpecialLand from './setting_section_special_land';
import SettingDisableAutoFillOCR from './setting_disable_auto_fill_ocr';

const style = {
  root: {
    display: 'block',
    width: '100%',
    maxHeight: '550px',
    overflowY: 'auto',
    overflowX: 'visable',
    paddingBottom: 16
  },
  result: {
    display: 'block',
    width: '100%',
    marginBottom: 16
  },
  title: {
    position: 'relative',
    fontSize: 14,
    fontWeight: 500,
    paddingFeft: '0',
    paddingRight: 45,
    verticalAlign: 'middle',
    letterSpacing: 0
  },
  value: {
    position: 'absolute',
    right: '16',
    top: '0'
  },
  valueText: {
    position: 'relative',
    padding: '0px 6px'
  }
};

export default class SectionSettings extends React.Component {
  state = {
    omr: {
      color_threshold: {},
      pixel_threshold: 0,
      active: !1
    },
    source_refer: {
      active: !1,
      source: '',
      fields: []
    },
    double_typing: {
      active: !1,
      fields: []
    },
    disable: {
      active: !1,
      fields: []
    },
    disable_auto_fill_ocr: {
      active: !1,
      fields: []
    },
    switch_disable: {
      active: !1,
      fields: []
    },
    visible: {
      active: !1,
      fields: []
    },
    is_multiple: false,
    fieldId: '',
    autoIncrement: '',
    autoIncrementStart: '',
    multiple: {
      is_multiple: !1,
      record_no: 0
    },
    validation_centent: {
      name: '',
      content: '',
      arguments: ''
    },
    validation: {
      active: !1,
      editMode: !1,
      item: {
        name: '',
        content: '',
        arguments: ''
      }
    },
    special_land: {
      active: !1,
      item: [],
    },
    mixed: {
      active: !1,
      field_control: '',
    }
  }

  componentWillMount() {
    const { sections } = this.props;
    const section = sections.items[sections.settingSectionIndex];
    this.initSection(section);
  }
  initSection = (section) => {
    let active = !1;
    let omr = {
      color_threshold: {},
      pixel_threshold: 0,
      active: !1
    }
    let source_refer = {
      active: !1,
      source: '',
      fields: []
    }
    let double_typing = {
      active: !1,
      fields: []
    }
    let visible = {
      active: !1,
      fields: []
    }
    let disable = {
      active: !1,
      fields: []
    }
    let disable_auto_fill_ocr = {
      active: !1,
      fields: []
    }
    
    let switch_disable = {
      active: !1,
      fields: []
    }
    let multiple = {
      is_multiple: !1,
      record_no: 0
    }
    let is_multiple = false;
    let fieldId='';
    let autoIncrement='';
    let autoIncrementStart='';
    let validation = {
      active: !1,
      editMode: !1,
      item: {
        name: '',
        content: '',
        arguments: ''
      }
    }
    let special_land = {
      active: !1,
      item: [],
    }
    let mixed = {
      active: !1,
      field_control: '',
    }
    if (section && section.fields) {
      let field_double_typing = section.fields.filter(field => field.double_typing).map(field => field.field_id)
      let field_visible = section.fields.filter(field => field.visible).map(field => field.field_id);
      let field_disable = section.fields.filter(field => field.disable).map(field => field.field_id);
      let field_disable_auto_fill_ocr = section.fields.filter(field => field.disable_auto_fill_ocr).map(field => field.field_id);
      let field_switch_disable = section.fields.filter(field => field.switch_disable).map(field => field.field_id);
      double_typing = {
        fields: field_double_typing || [],
        active: field_double_typing.length > 0
      }
      visible = {
        fields: field_visible || [],
        active: field_visible.length > 0
      }
      disable = {
        fields: field_disable || [],
        active: field_disable.length > 0
      }
      disable_auto_fill_ocr ={
        fields: field_disable_auto_fill_ocr || [],
        active: field_disable_auto_fill_ocr.length > 0
      }
      switch_disable = {
        fields: field_switch_disable || [],
        active: field_switch_disable.length > 0
      }
    }
    if (section && section.settings) {
      is_multiple = section.settings.is_multiple || false
      fieldId = section.settings.fieldId || ''
      autoIncrement = section.settings.autoIncrement || ''
      autoIncrementStart = section.settings.autoIncrementStart || ''
      
      if (section.settings.multiple) {
        multiple = {
          ...section.settings.multiple
        }
      }
      if (section.settings.omr) {
        omr = {
          ...section.settings.omr,
          active: !0
        }
      }

      if (section.settings.source_refer) {
        source_refer = {
          ...section.settings.source_refer,
          active: !0
        }
      }
      if (section.settings.special_land) {
        special_land = {
          active: !0,
          item: section.settings.special_land
        }
      }

      if (section.settings.type === 'mixed') {
        mixed = {
          active: !0,
          field_control: section.settings.field_control
        }
      }
    }
    if (section) {
      active = section.active || !1;
    }

    if (section && section.validation) {
      validation = {
        active: !0,
        editMode: !1,
        item: section.validation,
      }
    }
    this.setState({
      omr,
      active,
      disable,
      disable_auto_fill_ocr,
      switch_disable,
      visible,
      multiple,
      validation,
      is_multiple,
      fieldId,
      autoIncrement,
      autoIncrementStart,
      source_refer,
      special_land,
      double_typing,
      mixed,
    })
  }
  componentWillReceiveProps(nextProps) {
    const { sections } = nextProps;
    const section = sections.items[sections.settingSectionIndex];
    this.initSection(section);
  }

  onHandleChangeOMRColor = (color_threshold) => {
    this.setState({
      omr: {
        ...this.state.omr,
        color_threshold
      }
    })
  }

  onHandleChangeOMRPercent = (pixel_threshold) => {
    this.setState({
      omr: {
        ...this.state.omr,
        pixel_threshold
      }
    })
  }
  handleChangeEditMode = (active, update) => {
    if (active) {
      this.setState({
        validation_centent: this.state.validation.item,
        validation: {
          ...this.state.validation,
          editMode: active
        }
      })
    } else {
      if (update) {
        this.setState({
          validation: {
            ...this.state.validation,
            editMode: active,
            item: this.state.validation_centent
          }
        })
      } else {
        this.setState({
          validation: {
            ...this.state.validation,
            editMode: active
          }
        })
      }
    }

  }
  onRunTestOMR = () => {
    const { sectionActions, sections } = this.props;
    const { omr } = this.state;
    sectionActions.runTestOMR(omr, sections.items[sections.settingSectionIndex]);
  }
  setActive = (name, active) => {
    switch (name) {
      case 'active':
        this.setState({ active });
        break;

      case 'omr':
        this.setState({
          omr: {
            color_threshold: {},
            pixel_threshold: 0,
            active: active
          }
        });
        break;
      case 'source_refer':
        this.setState({
          source_refer: {
            source: '',
            fields: [],
            active: active
          }
        });
        break;
      case 'double_typing':
        this.setState({
          double_typing: {
            fields: [],
            active: active
          }
        });
        break;
      case 'visible':
        this.setState({
          visible: {
            fields: [],
            active: active
          }
        });
        break;
      case 'disable':
        this.setState({
          disable: {
            fields: [],
            active: active
          }
        });
        break;
        case 'disable_auto_fill_ocr':
          this.setState({
            disable_auto_fill_ocr: {
              fields: [],
              active: active
            }
          });
          break;  
        

      case 'switch_disable':
        this.setState({
          switch_disable: {
            fields: [],
            active: active
          }
        });
        break;
      case 'is_multiple':
        this.setState({
          is_multiple: active,
          fieldId:'',
          autoIncrement:'',
          autoIncrementStart:''
        });
        break;
      case 'multiple':
        this.setState({
          multiple: {
            record_no: 0,
            is_multiple: active,
            mask: null,
          }
        });
        break;

      case 'validation':
        this.setState({
          validation: {
            active: active,
            item: {
              name: '',
              content: '',
              arguments: ''
            }
          }
        });
        break;
      case 'special_land':
        this.setState({
          special_land: {
            active: active,
            item: [],
          }
        });
        break;

      case 'mixed':
        this.setState({
          mixed: {
            active: active,
            field_control: '',
          }
        });
        break;

      default:
        break;
    }
  }
  handleClose = (e) => {
    const { sectionActions } = this.props;
    const { validation } = this.state;
    if (validation.editMode) {
      this.handleChangeEditMode(!1, !1);
    } else {
      sectionActions.closeSetting(e)
    }
  }
  setConfig = () => {
    const {
      sections,
      sectionActions
    } = this.props;
    let {
      omr,
      active,
      disable,
      disable_auto_fill_ocr,
      switch_disable,
      visible,
      multiple,
      validation,
      is_multiple,
      fieldId,
      autoIncrement,
      autoIncrementStart,
      source_refer,
      special_land,
      double_typing,
      mixed,
    } = this.state;
    if (validation.editMode) {
      this.handleChangeEditMode(!1, !0);
    } else {
      let _config = {};
      _config.is_multiple = is_multiple
      _config.fieldId = fieldId
      _config.autoIncrement = autoIncrement
      _config.autoIncrementStart = autoIncrementStart

      

      if (omr.active) {
        _config.omr = {
          ...omr,
          active: undefined
        };
      }
      if (special_land.active) {
        _config.special_land = special_land.item;
      }
      if (source_refer.active) {
        _config.source_refer = {
          ...source_refer,
          active: undefined
        };
      }
      if (double_typing.active) {
        _config.double_typing = {
          ...double_typing,
          active: undefined
        };
      }

      if (visible.active) {
        _config.visible = {
          ...visible,
          active: undefined
        };
      }
      if (mixed.active) {
        _config.field_control = mixed.field_control;
        _config.type = 'mixed';
      }

      if (disable.active) {
        _config.disable = {
          ...disable,
          active: undefined
        };
      }
      if (disable_auto_fill_ocr.active) {
        _config.disable_auto_fill_ocr = {
          ...disable_auto_fill_ocr,
          active: undefined
        };
      }
      
      if (switch_disable.active) {
        _config.switch_disable = {
          ...switch_disable,
          active: undefined
        };
      }
      if (multiple.is_multiple) {
        _config.multiple = {
          ...multiple
        };
      }
      if (validation.active) {
        _config.validation = validation.item;
      }
      _config.active = active;
      sectionActions.changeSetting(sections.settingSectionIndex, _config)
      sectionActions.closeSetting();
    }
  }
  handleChangeSoureRefer = (source) => {
    this.setState({
      source_refer: {
        ...this.state.source_refer,
        source
      }
    })
  }
  handleChangeFieldsMap = (fields) => {
    this.setState({
      source_refer: {
        ...this.state.source_refer,
        fields
      }
    })
  }
  handleChangeFieldsMapDoubleTyping = (fields) => {
    this.setState({
      double_typing: {
        ...this.state.double_typing,
        fields
      }
    })
  }
  handleChangeFieldsMapVisible = (fields) => {
    this.setState({
      visible: {
        ...this.state.visible,
        fields
      }
    })
  }
  handleChangeFieldsMapDisable = (fields) => {
    this.setState({
      disable: {
        ...this.state.disable,
        fields
      }
    })
  }
   handleChangeFieldsMapDisableAutoFillOCR = (fields) => {
    this.setState({
      disable_auto_fill_ocr: {
        ...this.state.disable_auto_fill_ocr,
        fields
      }
    })
  }
  
  handleChangeFieldsMapSwitchDisable = (fields) => {
    this.setState({
      switch_disable: {
        ...this.state.switch_disable,
        fields
      }
    })
  }
  handleChangeFieldControl = (value) => {
    this.setState({
      mixed: {
        active: true,
        field_control: value
      }
    })
  }
  handleChangeRecordNo = (record_no) => {
    this.setState({
      multiple: {
        ...this.state.multiple,
        record_no
      }
    })
  }
  handleChangeMask = (mask) => {
    this.setState({
      multiple: {
        ...this.state.multiple,
        mask
      }
    })
  }
  handleChangeValidation = (value) => {
    let item = { ...this.state.validation_centent, content: value }
    this.setState({
      validation_centent: item
    })
  }
  handleChangeSectionMultipleData=({name,value})=>{
    this.setState({
      [name]:value
    })
  }
  render() {
    const { sections, sectionActions, fields } = this.props;
    const { omr,
      source_refer,
      multiple,
      is_multiple,
      fieldId,
      autoIncrement,
      autoIncrementStart,
      double_typing,
      active,
      visible,
      disable,
      disable_auto_fill_ocr,
      switch_disable,
      validation,
      validation_centent,
      mixed,
      special_land } = this.state;
    let section = sections.items[sections.settingSectionIndex];
    let fieldSource = (section && section.fields) || []
    return (
      <Dialog
        title="Settings"
        modal={false}
        open={sections.openSetting}
        actions={[<FlatButton label="Cancel" primary={
          true
        }
          onClick={
            this.handleClose
          } />,
        <FlatButton label={validation.editMode ? 'Save' : 'apply'} primary={
          true
        }
          onClick={
            this.setConfig
          } />
        ]}
        onRequestClose={(e) => {
          sectionActions.closeSetting();
        }}>
        <div className='cool_scroll_smart' style={Object.assign({}, style.root, this.props.style)}>
          {validation.editMode ?
            <ValidationEditer
              validation={validation_centent}
              onChange={this.handleChangeValidation} />
            : <List style={{ width: 'calc(100% - 8px)' }} >
              <SettingActive
                isActive={active}
                onChange={(isActive) => this.setActive('active', isActive)}
              />
              <SettingSingle
                isMultiple={is_multiple}
                fieldId={fieldId}
                fieldSource={fieldSource}
                autoIncrement={autoIncrement}
                autoIncrementStart={autoIncrementStart}
                fields={fields}
                onChange={this.handleChangeSectionMultipleData}
                onActive={(isMultiple) => this.setActive('is_multiple', isMultiple)}
              />
              <SettingMultiple
                recordNo={multiple.record_no}
                onChangeMask={this.handleChangeMask}
                mask={multiple.mask}
                isMultiple={multiple.is_multiple}
                onActive={(isMultiple) => this.setActive('multiple', isMultiple)}
                onChange={this.handleChangeRecordNo}
              />
              <SettingOmr
                pixel_threshold={omr.pixel_threshold}
                color={omr.color_threshold}
                isRunning={sections.isTestingOMR}
                active={omr.active}
                onActive={(active) => this.setActive('omr', active)}
                onRunTest={this.onRunTestOMR}
                onChangePixelThreshold={this.onHandleChangeOMRPercent}
                onChangeColorThreshold={this.onHandleChangeOMRColor} />
              <SettingLoadDataSource
                active={source_refer.active}
                source={source_refer.source}
                fieldMap={source_refer.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('source_refer', active)}
                onChangeSource={this.handleChangeSoureRefer}
                onChangeFields={this.handleChangeFieldsMap} />
              <SettingDoubleTyping
                active={double_typing.active}
                fieldMap={double_typing.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('double_typing', active)}
                onChangeFields={this.handleChangeFieldsMapDoubleTyping} />
              <SettingVisibleFields
                active={visible.active}
                fieldMap={visible.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('visible', active)}
                onChangeFields={this.handleChangeFieldsMapVisible} />
                
              <SettingDisableFields
                active={disable.active}
                fieldMap={disable.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('disable', active)}
                onChangeFields={this.handleChangeFieldsMapDisable} />
              
              <SettingDisableAutoFillOCR
                active={disable_auto_fill_ocr.active}
                fieldMap={disable_auto_fill_ocr.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('disable_auto_fill_ocr', active)}
                onChangeFields={this.handleChangeFieldsMapDisableAutoFillOCR} />
              <SettingSwitchDisableFields
                active={switch_disable.active}
                fieldMap={switch_disable.fields}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('switch_disable', active)}
                onChangeFields={this.handleChangeFieldsMapSwitchDisable} />

              <SettingMixed
                active={mixed.active}
                value={mixed.field_control}
                fields={fields}
                fieldSource={fieldSource}
                onActive={(active) => this.setActive('mixed', active)}
                onChangeFields={this.handleChangeFieldControl} />
              <SettingValidation
                active={validation.active}
                editMode={validation.editMode}
                onActive={(active) => this.setActive('validation', active)}
                onEdit={(active) => this.handleChangeEditMode(active)}
              />
              <SettingSpecialLand
                value={special_land.item}
                isActive={special_land.active}
                onChange={(value) => this.setState({ special_land: { active: special_land.active, item: value } })}
                onActive={(active) => this.setActive('special_land', active)}
              />
            </List>}
          {sections.omrTestResult && (
            <Card style={Object.assign({}, style.result, this.props.style)}>
              <CardHeader title="Result">
                <IconButton
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: 0
                  }}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    sectionActions.resetResutlOMR();
                  }}>
                  <ContentClear />
                </IconButton>
              </CardHeader>
              <CardText>

                <List>
                  {sections.omrTestResult && section && section
                    .fields
                    .map(field => (
                      <ListItem primaryText={fields.map[field.field_id].name}>
                        <span
                          style={{
                            position: 'absolute',
                            left: '50%'
                          }}>
                          Values: {sections.omrTestResult[field.field_id]}</span>
                      </ListItem>

                    ))}
                </List>
              </CardText>
            </Card>
          )}
        </div>
      </Dialog>
    );
  }
}
