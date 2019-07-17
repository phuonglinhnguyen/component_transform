import PropTypes from 'prop-types';
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ExportComponent from './export_pre_defined_component'
import ImportComponent from './import_pre_defined_component'
import { withRouter } from 'react-router'
import NavigationArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import NavigationArrowUpward from "material-ui/svg-icons/navigation/arrow-upward";
class IOConfiguration extends React.Component {

  constructor(props) {
    super(props);
    this.openExportDialog = this.openExportDialog.bind(this);
    this.openImportDialog = this.openImportDialog.bind(this);
  }
  openExportDialog() {
    const path = this.props.location.pathname.split("/");
    this.props.actions.openDialogExport(path[2]);
  }
  openImportDialog() {
    const path = this.props.location.pathname.split("/");
    this.props.actions.openDialogImport(path[2]);
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <FloatingActionButton
            onClick={this.openExportDialog}
            title="Export"
          >
            <NavigationArrowUpward />

          </FloatingActionButton>
          <ExportComponent actions={this.props.actions}
            export_pre_defined={this.props.import_export_pre_defined.export_pre_defined}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FloatingActionButton
            onClick={this.openImportDialog}
            title="Import"
          >
            <NavigationArrowDownward />
          </FloatingActionButton>

          <ImportComponent actions={this.props.actions}
            import_pre_defined={this.props.import_export_pre_defined.import_pre_defined}
          />
        </div>


      </div>

    );
  }
}

export default  withRouter(IOConfiguration)