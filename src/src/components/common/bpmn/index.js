import React from "react";

import PropertyComponent from "./toolbars/property_component";
import ZoomComponent from "./toolbars/zoom_component";
import ExpandComponent from "./toolbars/expand_component";
import ExportImportComponent from "./toolbars/export_import_component";
import HistoryComponent from "./toolbars/history_component";

import "diagram-js/assets/diagram-js.css";
import "bpmn-js/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/assets/bpmn-font/css/bpmn-embedded.css";
import "../../../styles/assets/bpmn/properties_panel/app.css";

class Canvas extends React.PureComponent {
  render() {
    const {
      is_view,
      is_expand,
      is_publish,
      backgroundColor,

      action_expandView,
      action_resetZoom,
      action_onZoom,
      action_onUpload,
      action_downloadPDF,
      action_downloadXML,
      action_openHistories
    } = this.props;

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: backgroundColor
        }}
      >
        <div className="canvas" id="js-canvas" style={{ height: "100%" }} />
        {is_publish && (
          <HistoryComponent
            is_view={is_view}
            action_openHistories={action_openHistories}
          />
        )}
        {!is_view && (
          <PropertyComponent>
            <div id="js-properties-panel" />
          </PropertyComponent>
        )}
        <ExpandComponent is_expand={is_expand} action_expandView={action_expandView} />
        <ZoomComponent resetZoom={action_resetZoom} onZoom={action_onZoom} />
        <ExportImportComponent
          onUpload={action_onUpload}
          downloadPDF={action_downloadPDF}
          downloadXML={action_downloadXML}
        />
      </div>
    );
  }
}

export default Canvas;
