import React from "react";

import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";

class Icon extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getNewsfeed();
  }

  render() {
    const { total_unread, actions } = this.props;
    const button = (
      <IconButton
        onClick={e => {
          // This prevents ghost click.
          e.preventDefault();

          actions.showList(e);
        }}
        tooltip="Notifications"
      >
        <NotificationsIcon />
      </IconButton>
    );

    if (total_unread === 0) {
      return button;
    }

    return (
      <Badge
        badgeContent={total_unread}
        secondary={true}
        style={{ padding: 0 }}
      >
        {button}
      </Badge>
    );
  }
}

export default Icon;
