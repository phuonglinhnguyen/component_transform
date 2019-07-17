import React, { Component } from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Connect from './connect_configuration';
import { PROTOCOL } from '../constants';
const styles = {
    main: {
        position: 'relative',
        width: "100%",
        height: 'calc(100% - 16px)',
        paddingTop: 16,
        overflow: 'auto',
    },
    card: {
        maxWidth: '900px',
        margin: '0px auto',
    },
    form: {
        display: 'inline-flex',
        width: '100%',
    },
    config: {
        position: 'relative',
        width: 'calc(50% - 8px)',
        marginRight: 8,
    },
    config_right: {
        position: 'relative',
        width: 'calc(50% - 8px)',
        paddingLeft: 8,
    }
}
export default class Form extends Component {
    handleChangeFieldText = (event) => {
        let field_name = event.target.name;
        let field_value = event.target.value;
        this.props.onChangeField(field_name, field_value);
    }
    handleChangeFieldSelete = (name) => {
        const { onChangeField } = this.props;
        return (event, index, value) => {
            onChangeField(name, value);
        }
    }
    handleValidataion = (event) => {
        let field_name = event.target.name;
        let field_value = event.target.value;
        const { checkValidationAndPattern } = this.props;
        checkValidationAndPattern(field_name, field_value)
    }
    handleDelete = () => {
        const { item_upload_configuration, deleteConfig } = this.props;
        const {
            deleting,
            adding,
            updating } = item_upload_configuration;
        if (deleting ||
            adding ||
            updating) return;
        if (item_upload_configuration.item.id) {
            deleteConfig(item_upload_configuration.item.id)
        }
    }
    handleSubmit = () => {
        const { checkValidationForm, item_upload_configuration, updateConfig, saveConfig, projectId } = this.props;
        const {
            deleting,
            adding,
            updating } = item_upload_configuration;
        if (deleting ||
            adding ||
            updating) return;
        // let error = checkValidationForm();
        
        // if (!error) {
            if (item_upload_configuration.item.id) {
                updateConfig(item_upload_configuration.item, item_upload_configuration.item.id)
            } else {
                saveConfig(item_upload_configuration, projectId)
            }
    //  }
    }
    handelTestConnection = () => {
        const { testConnection, item_upload_configuration } = this.props;
        testConnection(item_upload_configuration.item);
    }
    render() {
        const { Translate, item_upload_configuration, onChangeField, errorMap } = this.props;
        let data = item_upload_configuration.item;
        const {
            deleting,
            adding,
            updating } = item_upload_configuration;
        let enableDelete = !!(item_upload_configuration.item.id && item_upload_configuration.item.id.length);
        let enableSubmit = !0;
        let labelSave = '';
        let labelDelete = 'projects.upload_configuration.button.delete';
        if (adding || updating) {
            enableDelete = !1;
            labelSave = adding ? 'projects.upload_configuration.button.saving' : 'projects.upload_configuration.button.updating';
        } else
            if (deleting) {
                enableSubmit = !1;
                labelDelete = 'projects.upload_configuration.button.deleting';
            } else {
                labelSave = enableDelete ? 'projects.upload_configuration.button.update' : 'projects.upload_configuration.button.save_and_create';
            }


        const getErrorByName = (name) => {
            let rs = '';
            if (errorMap[0] && errorMap[0][name]) {
                let error = errorMap[0][name];
                rs = error.errorValidate || error.errorPattern || '';
            }
            return rs;
        }
        return (
            <div style={styles.main} >
                <Card style={styles.card} zDepth={2}>
                    <CardActions >
                        <TextField
                            tabIndex={10000}
                            hintText={<Translate value='projects.upload_configuration.hint_text.upload_configuration_name' />}
                            floatingLabelText={<Translate value='projects.upload_configuration.lable.upload_configuration_name' />}
                            name="name"
                            value={data['name'] || ''}
                            onChange={this.handleChangeFieldText}
                            floatingLabelFixed={true}
                            onBlur={this.handleValidataion}
                            errorText={getErrorByName('name')}
                        />
                        <div style={{ position: 'absolute', right: 0, top: 8 }} >
                            {enableDelete && <RaisedButton style={{ marginRight: 8 }} tabIndex={10165} secondary={true} label={<Translate value={labelDelete} />} onClick={this.handleDelete} />}
                            {enableSubmit && <RaisedButton tabIndex={10170} label={<Translate value={labelSave} />} primary={true} onClick={this.handleSubmit} />}
                        </div>
                    </CardActions>
                    <CardText>
                        <form style={styles.form} >
                            <div style={styles.config}>
                                <Subheader>
                                    <Translate value='projects.upload_configuration.header.configuration' />

                                </Subheader>
                                <TextField
                                    tabIndex={10010}
                                    hintText={<Translate value='projects.upload_configuration.hint_text.regex_expression' />}
                                    floatingLabelText={<Translate value='projects.upload_configuration.lable.regex_expression' />}
                                    name="upload_pattern"
                                    floatingLabelFixed={true}
                                    fullWidth
                                    value={data['upload_pattern'] || ''}
                                    onChange={this.handleChangeFieldText}
                                    onBlur={this.handleValidataion}
                                    errorText={getErrorByName('upload_pattern')}
                                />
                                <br />
                                <TextField
                                    tabIndex={10015}
                                    hintText={<Translate value='projects.upload_configuration.hint_text.time_out' />}
                                    floatingLabelText={<Translate value='projects.upload_configuration.lable.time_out' />}
                                    name="time_out"
                                    floatingLabelFixed={true}
                                    fullWidth
                                    value={data['time_out'] || ''}
                                    onChange={this.handleChangeFieldText}
                                    onBlur={this.handleValidataion}
                                    errorText={getErrorByName('time_out')}
                                />
                                <br />

                                <Checkbox
                                    tabIndex={10020}
                                    label={<Translate value='projects.upload_configuration.lable.zip' />}
                                    name='zip'
                                    checked={!!data['zip']}
                                    style={{ marginTop: 16 }}
                                    onCheck={e => onChangeField('zip', !!data['zip'] ? 0 : 1)}
                                />
                                <br />
                                <Checkbox
                                    tabIndex={10022}
                                    label={<Translate value='projects.upload_configuration.lable.encrypt' />}
                                    name='encrypt'
                                    checked={!!data['encrypt']}
                                    style={{ marginTop: 16 }}
                                    onCheck={e => onChangeField('encrypt', !!data['encrypt'] ? 0 : 1)}
                                />
                                <br />
                                <Checkbox
                                    tabIndex={10023}
                                    label={<Translate value='projects.upload_configuration.lable.overwrite' />}
                                    name='overwrite'
                                    checked={!!data['overwrite']}
                                    style={{ marginTop: 16 }}
                                    onCheck={e => onChangeField('overwrite', !!data['overwrite'] ? 0 : 1)}
                                />
                                <br />

                            </div>
                            <div style={styles.config_right}>
                                <Subheader>
                                    <Translate value='projects.upload_configuration.header.connection' />
                                </Subheader>
                                <SelectField
                                    tabIndex={10060}
                                    floatingLabelText={<Translate value='projects.upload_configuration.lable.source_info_type' />}
                                    floatingLabelFixed={true}
                                    value={data['type'] || ''}
                                    onChange={this.handleChangeFieldSelete('type')}
                                    fullWidth
                                >
                                    {PROTOCOL.map(item => <MenuItem key={`protocol-${item}`} value={item} primaryText={item} />)}
                                </SelectField>
                                <br />
                                <Connect Translate={Translate} handleValidataion={this.handleValidataion} errorMap={errorMap[0]} data={data} type={data['type']} onChange={this.handleChangeFieldText} />
                            </div>
                        </form>
                    </CardText>
                </Card>
            </div>
        );
    }
}

//<FlatButton label="Test connection" primary={true} onClick={this.handelTestConnection} />
