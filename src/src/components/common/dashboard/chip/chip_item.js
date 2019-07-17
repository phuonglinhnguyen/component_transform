import React from "react";

import Chip from "material-ui/Chip";

const styles = {
  chip: {
    margin: 4
  }
};

class ChipItem extends React.PureComponent {
  render() {
    const {
      addItem,
      key_value,

      data
    } = this.props;

    return (
      <Chip style={styles.chip} onClick={() => addItem(data)}>
        {data[key_value]}
      </Chip>
    );
  }
}

export default ChipItem;
