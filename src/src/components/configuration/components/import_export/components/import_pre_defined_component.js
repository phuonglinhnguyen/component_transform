import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import { Menus } from '../../../../project/components/qc_sampling/components/big_menu_component'

import { Translate } from 'react-redux-i18n';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onImportDatas = this.onImportDatas.bind(this);
    }
    onClickItem(values, name) {
        this.props.actions.importCheckItems(values);
    }
    onCloseDialog() {
        this.props.actions.closeDialogImport();
    }
    onImportDatas() {
        this.props.actions.importDatas();
    }



    handleChange = (event) => {

        var file = event.target.files[0];
        this.props.actions.importChangeFile(file)
    };

    render() {
        const { open_dialog,
            datas,
            selected_items,
            error_text,
            file,
            key
        } = this.props.import_pre_defined
        const action_button = [
            <FlatButton
                label={<Translate value={'buuton.cancel'} />}
                primary={true}
                onClick={this.onCloseDialog}
            />,
            <FlatButton
                label={'Import'}
                primary={true}
                keyboardFocused={true}
                onClick={this.onImportDatas}
                disabled={!selected_items || selected_items.length === 0}
            />
        ];
        const title = key.replace(/-/g, " ")
        return (
            <Dialog
                title={`Import ${title}`}
                onCloseDialog={this.onCloseDialog}
                modal={true}
                open={open_dialog}
                actions={action_button}
                titleStyle={{ textTransform: 'capitalize' }}
            >
                <div style={{ display: 'flex' }}>
                    <div>
                        <RaisedButton
                            labelStyle={{ paddingLeft: '4px' }}
                            label="Choose JSON file"
                            labelPosition="before"
                            primary={true}
                        >

                            <input
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0
                                }}
                                ref={node => this.inputFile = node}
                                type="file" accept=".json"
                                onChange={this.handleChange}
                            />
                        </RaisedButton>

                        <h3 style={{ color: 'red' }}>{error_text}</h3>
                    </div>
                    <div>
                        {file !== null ? <Subheader style={{ lineHeight: '36px' }}>{file.name}</Subheader> : <div></div>}
                    </div>
                </div>
                {datas.length > 0 &&
                    <Menus
                        dataSource={datas}
                        labelName="name"
                        totalCells={2}
                        multiple={true}
                        values={selected_items}
                        showSelectAll={true}
                        onClickItem={this.onClickItem}
                        style={{ textTransform: 'capitalize' }}
                    />
                }
            </Dialog>



        );
    }


}
export default UploadScreen;