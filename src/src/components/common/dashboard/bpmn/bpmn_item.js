import React from "react";
import BpmnViewer from "bpmn-js";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";

const styles = {
  img: { cursor: "pointer" }
};

class BMPNItem extends React.PureComponent {
  showBpmn(viewer, instances, xml, primaryColor) {
    if (xml) {
      viewer.importXML(xml, function(err) {
        if (err) {
          console.log("error rendering", err);
        } else {
          viewer.get("canvas").zoom("fit-viewport", "auto");
          if (instances) {
            var overlays = viewer.get("overlays");
            for (var instance of instances) {
              overlays.add(instance.id, {
                position: {
                  bottom: 10,
                  left: -10
                },
                html: `
                <span class="badge" style="background-color: ${primaryColor}" tooltip="Running Activity Instances">
                  ${instance.instances}
                </span>
              `
              });
            }
          }
        }
      });
    }
  }
  componentDidMount() {
    let viewer;
    const { type, index, xml, primaryColor, instances } = this.props;
    if (type === "viewer") {
      const { action_elementClick } = this.props;
      viewer = new NavigatedViewer({
        container: `#wf_${index}`,
        additionalModules: [require("diagram-js/lib/features/search-pad")]
      });

      if (action_elementClick) {
        let eventBus = viewer.get("eventBus");
        let events = ["element.click"];
        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            action_elementClick(e);
          });
        });
      }
    } else {
      viewer = new BpmnViewer({ container: `#wf_${index}` });
    }

    this.showBpmn(viewer, instances, xml, primaryColor);

    this.viewer = viewer;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.xml !== this.props.xml || nextProps.instances !== this.props.instances) {
      const viewer = this.viewer;
      viewer.clear();

      this.showBpmn(viewer, nextProps.instances, nextProps.xml, nextProps.primaryColor);
    }
  }

  render() {
    const { index, height, backgroundColor, onClick } = this.props;
    return (
      <div
        onClick={onClick}
        style={{
          ...styles.img,
          height: height || "100%",
          backgroundColor: backgroundColor
        }}
        id={`wf_${index}`}
      />
    );
  }
}

export default BMPNItem;
