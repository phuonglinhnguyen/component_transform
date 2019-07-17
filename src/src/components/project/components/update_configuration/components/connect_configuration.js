import React from 'react';
import { validation_config } from '../constants';
import TextField from 'material-ui/TextField';
export const Connect = (props) => {
    const { onChange, data, type, Translate, handleValidataion, errorMap } = props;
    const getErrorByName = (name) => {
        let rs = '';
        if (errorMap && errorMap[name]) {
            let error = errorMap[name];
            rs = error.errorValidate || error.errorPattern || '';
        }
        return rs;
    }
    switch (type) {
        case 'FS':
            return (
                <div>
                    <TextField
                        tabIndex={10065}
                        hintText={<Translate value='projects.upload_configuration.hint_text.upload_to_folder' />}
                        floatingLabelText={<Translate value='projects.upload_configuration.lable.upload_to_folder' />}
                        name="upload_to_folder"
                        floatingLabelFixed={true}
                        value={data['upload_to_folder']||''}
                        onChange={onChange}
                        fullWidth
                        onBlur={handleValidataion}
                        errorText={getErrorByName('upload_to_folder')}
                    />
                </div>
            )
        case 'FTP':
        case 'SFTP':
        case 'IMAP':
        case 'POP3':
            return (
                <div style={{ width: '100%' }}>
                    <TextField
                        tabIndex={10065}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.source_info_host`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.source_info_host`} />}
                        name='host'
                        floatingLabelFixed={true}
                        value={data['host']||''}
                        fullWidth
                        onChange={onChange}
                        onBlur={handleValidataion}
                        errorText={getErrorByName('host')}
                    />
                    <br />
                    <TextField
                        tabIndex={10070}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.source_info_port`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.source_info_port`} />}
                        name='port'
                        floatingLabelFixed={true}
                        value={data['port']||''}
                        fullWidth
                        onChange={onChange}
                        onBlur={handleValidataion}
                        errorText={getErrorByName('port')}
                    />
                    <br />
                    <TextField
                        tabIndex={10075}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.source_info_username`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.source_info_username`} />}
                        name='username'
                        floatingLabelFixed={true}
                        value={data['username']||''}
                        fullWidth
                        onChange={onChange}
                        onBlur={handleValidataion}
                        errorText={getErrorByName('username')}
                    />
                    <br />
                    <TextField
                        tabIndex={10080}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.source_info_password`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.source_info_password`} />}
                        name='password'
                        floatingLabelFixed={true}
                        value={data['password']||''}
                        onChange={onChange}
                        fullWidth
                        type='password'
                        autoComplete='new-password'
                        onBlur={handleValidataion}
                        errorText={getErrorByName('password')}
                    />
                    <br />
                    <TextField
                        tabIndex={10085}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.upload_to_folder`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.upload_to_folder`} />}
                        name='upload_to_folder'
                        fullWidth
                        floatingLabelFixed={true}
                        value={data['upload_to_folder']||''}
                        onChange={onChange}
                        onBlur={handleValidataion}
                        errorText={getErrorByName('upload_to_folder')}
                    />
                    <br />
                </div>)
        case 'SOAP':
        case 'RESTFUL':
            return (<div style={{ width: '100%' }}>
                {validation_config.connection.SOAP.map((name, index) => {
                    let tabIndex = 10065 + index * 5;
                    return (<TextField
                        tabIndex={tabIndex}
                        key={`input-name-${name}`}
                        hintText={<Translate value={`projects.upload_configuration.hint_text.${name.replace('.', '_')}`} />}
                        floatingLabelText={<Translate value={`projects.upload_configuration.lable.${name.replace('.', '_')}`} />}
                        name={name}
                        fullWidth
                        floatingLabelFixed={true}
                        value={data[name]||''}
                        onChange={onChange}
                        onBlur={handleValidataion}
                        errorText={getErrorByName(name)}
                    />)
                })}
            </div>)
        case 'NONE':
        default:
            return '';
    }
}

export default Connect