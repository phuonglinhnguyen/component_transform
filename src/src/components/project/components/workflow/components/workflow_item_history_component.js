import React from "react";

import { List, ListItem, makeSelectable } from "material-ui/List";
import wrapState from "../../../../common/selectable_list_new";
import Avatar from "material-ui/Avatar";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import Moment from "moment";

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

class WorkflowItemDataHistory extends React.PureComponent {
  getPublishById(data) {
    const { workflow } = this.props;

    const modeler = workflow.modeler;
    this.props.actions.getPublishById(data, (xml, instances) => {
      modeler.importXML(xml, instances, () => {
        modeler.updateInstances(instances);
      });
    });
  }

  render() {
    const { open, publishes } = this.props.version;
    if (!open || !this.props.workflow.data.publish) {
      return null;
    }
    const { id } = this.props.workflow.data.publish;

    const length = publishes.length;
    const defaultValue = publishes.findIndex(p => p.id === id);

    return (
      <Drawer
        containerClassName="cool_scroll"
        width="30%"
        openSecondary={true}
        onRequestChange={open => this.props.actions.hideHistories()}
        open={open}
      >
        <AppBar
          title="Versions"
          iconElementLeft={
            <IconButton onClick={this.props.actions.hideHistories}>
              <NavigationClose />
            </IconButton>
          }
        />
        <SelectableList defaultValue={defaultValue}>
          {publishes.map((p, i) => (
            <ListItem
              key={i}
              value={i}
              leftAvatar={<Avatar>{length - i}</Avatar>}
              onClick={() => this.getPublishById(p)}
              primaryText={p.source}
              secondaryText={Moment.parseZone(p.deploymentTime).local().format(
                "YYYY/MM/DD HH:mm"
              )}
            />
          ))}
        </SelectableList> 
      </Drawer>
    );
  }
}

export default WorkflowItemDataHistory;
