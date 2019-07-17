import BpmnModeler from "bpmn-js/lib/Modeler";
import BpmnViewer from "./bpmn_viewer";
import BpmnMonitor from "./bpmn_monitor";

import CustomContextPadProvider from "../features/custom_context_pad_provider";
import OverrideContextPadProvider from "../features/override_context_pad_provider";

import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

import config_package from "../config_package.json";
import FileBpmn from "../resources/default";
import jspdf from "jspdf";
import canvg from "canvg-browser";
import { numberForReport } from "../../../../utils/format_number";

class CustomModeler {
  styles = {
    badge: ""
  };

  constructor({
    type,
    project_id,
    project_name,
    workflow_type,
    canvas_id,
    properties_panel_id,
    xml,
    instances,
    primary1Color,
    accent1Color,
    onClickElement,
    actions
  }) {
    let viewer;
    if (type === "modeler") {
      viewer = new BpmnModeler({
        container: canvas_id,
        propertiesPanel: {
          parent: properties_panel_id
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          config: config_package,
          camunda: camundaModdleDescriptor
        }
      });

      if (actions) {
        new CustomContextPadProvider(viewer, actions.openConfig);
      }
    } else if (type === "monitor") {
      viewer = new BpmnMonitor({
        container: canvas_id
      });

      viewer.get("eventBus").on("element.dblclick", 1500, function(event) {
        event.stopPropagation();
      });
      
      viewer.get("eventBus").on("element.click", 1500, function(event) {
        if (viewer.get("canvas").getRootElement() !== event.element) {
          onClickElement(event);
        }
      });
    } else {
      viewer = new BpmnViewer({
        container: canvas_id,
        additionalModules: [new OverrideContextPadProvider({ ...actions })]
      });

      viewer.get("eventBus").on("element.dblclick", 1500, function(event) {
        event.stopPropagation();
      });
    }

    this.styles.badge = primary1Color;
    this.styles.incident = accent1Color;
    this.viewer = viewer;
    this.project_id = project_id;
    this.project_name = project_name;
    this.workflow_type = workflow_type;
    this.importXML(xml, instances);
  }

  getTargetTasks(element, original_tasks) {
    const tasks = [];
    const parent = element.parent;

    if (parent) {
      const children = parent.children;
      children.forEach(function(element) {
        const task = original_tasks.find(e => e.id === element.id);
        if (task) {
          tasks.push(task);
        }
      });
    }

    return tasks;
  }

  onZoom(is_zoom_out) {
    const canvas = this.viewer.get("canvas");
    const scale = canvas.zoom();

    canvas.zoom(is_zoom_out ? scale - 0.1 : scale + 0.1);
  }

  importXML(xml, instances, callback) {
    const viewer = this.viewer;
    const styles = this.styles;
    const showInstances = this.showInstances;

    let value = xml;
    if (!value) {
      value = FileBpmn.xml;
    }
    viewer.importXML(value, function(err) {
      if (!err) {
        viewer.get("canvas").zoom("fit-viewport", "auto");
        showInstances(viewer, instances, styles);

        if (callback) {
          callback();
        }
      } else {
        console.log("something went wrong:", err);
      }
    });
  }

  onUpload(e, id, value) {
    let files = e.target.files || [];
    if (files.length > 0) {
      let reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");
      reader.onloadend = function(e) {
        let result = e.target.result;

        if (result) {
          this.importXML(result, [], () => {
            this.updateWorkflowName(id, value);
          });
          this.viewer.get("canvas").zoom("fit-viewport");
        }
      }.bind(this);
    }
  }

  focusElement(id) {
    const viewer = this.viewer;
    const task = viewer.get("elementRegistry").get(id);
    viewer.get("selection").select(task);
    var searchPad = viewer.get("searchPad");
    searchPad._centerViewbox(task);
  }

  updateInstances(instances) {
    this.showInstances(this.viewer, instances, this.styles);
  }

  changeType(workflow_type) {
    this.workflow_type = workflow_type;
  }

  updateWorkflowName() {
    const { project_id, project_name, workflow_type, viewer } = this;
    const element = viewer.get("canvas").getRootElement();

    viewer.get("modeling").updateProperties(element, {
      id: `${workflow_type}_${project_id}`.toLowerCase(),
      name: `${workflow_type}_${project_name}`.toUpperCase()
    });
  }

  showInstances(viewer, instances, styles) {
    var overlays = viewer.get("overlays");
    if (!instances) {
      return null;
    }
    if (instances) {
      overlays.clear();

      for (let instance of instances) {
        let elementRegistry = viewer.get("elementRegistry").get(instance.id);
        if (elementRegistry) {
          instance.name = elementRegistry.businessObject.name;

          overlays.add(instance.id, {
            position: {
              bottom: 10,
              left: -10
            },
            html: `
            <span class="badge" style="background-color: ${
              styles.badge
            }" tooltip="Running Activity Instances">
            ${numberForReport(instance.instances)}
            </span>
            `
          });

          if (instance.incidents && instance.incidents.length > 0) {
            overlays.add(instance.id, {
              position: {
                bottom: 10,
                right: 10
              },
              html: `
              <span class="badge" style="background-color: ${
                styles.incident
              }" tooltip="Incidents">
              !
              </span>
              `
            });
          }
        }
      }
    }
  }

  saveXML(callback) {
    this.updateWorkflowName();
    this.viewer.saveXML({ format: true }, (err, xml) => {
      callback(xml);
    });
  }

  downloadXML() {
    const { workflow_type, project_name, viewer } = this;
    viewer.saveXML({ format: true }, function(err, xml) {
      if (xml) {
        var pom = document.createElement("a");
        pom.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(xml)
        );
        pom.setAttribute("download", `${workflow_type}_${project_name}.bpmn`);
        pom.click();
      }
    });
  }

  downloadPDF(name) {
    const { workflow_type, project_name, viewer } = this;
    viewer.saveSVG({ format: true }, function(err, svg) {
      if (svg) {
        svg = svg.replace(/\r?\n|\r/g, "").trim();

        var canvas = document.createElement("canvas");
        canvg(canvas, svg);
        var imgData = canvas.toDataURL("image/png");

        var doc = new jspdf("l", "pt", "a4");
        const defaultPageWidth = doc.internal.pageSize.width;
        const defaultPageHeight = doc.internal.pageSize.height;
        var width =
          defaultPageWidth > canvas.width ? defaultPageWidth : canvas.width;
        var height =
          defaultPageHeight > canvas.height ? defaultPageHeight : canvas.height;

        doc.deletePage(1);
        doc.addPage(width, height);
        if (
          defaultPageWidth < canvas.width ||
          defaultPageHeight < canvas.height
        ) {
          doc.addImage(imgData, "PNG", 0, 0, width, height);
        } else {
          doc.addImage(imgData, "PNG", 0, 0);
        }

        doc.save(`${workflow_type}_${project_name}.pdf`);
      }
    });
  }
}

export default CustomModeler;
