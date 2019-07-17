import React from "react";

import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";

const styles = {
  chip: {
    margin: 4
  }
};

class ChipItemWithIcon extends React.PureComponent {
  render() {
    const {
      addItem,
      key_value,

      data,
      getIcon
    } = this.props;

    return (
      <Chip style={styles.chip} onClick={() => addItem(data)}>
        <Avatar icon={getIcon(data)} />
        {data[key_value]}
      </Chip>
    );
  }
}

export default ChipItemWithIcon;
