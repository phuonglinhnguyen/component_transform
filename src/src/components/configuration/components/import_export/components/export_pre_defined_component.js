import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Menus } from '../../../../project/components/qc_sampling/components/big_menu_component'
import FlatButton from 'material-ui/FlatButton';
import { Translate } from 'react-redux-i18n';
class ExportConfigurationComponent extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onExportDatas = this.onExportDatas.bind(this);
    }
    onClickItem(values, name) {
        this.props.actions.exportCheckItems(values);
    }
    onCloseDialog() {
        this.props.actions.closeDialogExport();
    }
    onExportDatas() {
        this.props.actions.exportDatas();
    }
    render() {
        const { open_dialog,
            datas,
            key,
            selected_items
        } = this.props.export_pre_defined
        const title = key.replace(/-/g, " ")
        const action_button = [
            <FlatButton
                label={<Translate value={'buuton.cancel'} />}
                primary={true}
                onClick={this.onCloseDialog}
            />,
            <FlatButton
                label={'Export'}
                primary={true}
                keyboardFocused={true}
                onClick={this.onExportDatas}
                disabled={!selected_items || selected_items.length === 0}
            />
        ];
        return (
            <div style={{ width: "100%" }}>
                <Dialog
                    title={`Export ${title}`}
                    onCloseDialog={this.onCloseDialog}
                    modal={true}
                    open={open_dialog}
                    actions={action_button}
                    titleStyle={{ textTransform: 'capitalize',  width: "100%"}}
                >
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
                </Dialog>
            </div>

        );
    }

}


export default ExportConfigurationComponent;
