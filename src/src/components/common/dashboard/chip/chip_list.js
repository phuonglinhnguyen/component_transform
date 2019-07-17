import React from "react";

import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import ChipItemComponent from "./chip_item";
import ChipItemWithIconComponent from "./chip_item_with_icon";
import ImportExportPredefined from '../../../configuration/components/import_export/container/io_pre_defineds_container'
const styles = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 4
  },
  button: {
    zIndex: 1,
    position: "fixed",
    bottom: 46,
    right: 46
  },
  import_export: {
    zIndex: 2,
    position: "fixed",
    bottom: 100,
    right: 46
  }
};

class ChipList extends React.PureComponent {
  render() {
    const {
      key_value,
      addItem,
      datas,
      getIcon,
      import_export = false
    } = this.props;

    let body = "";

    if (getIcon) {
      body = datas.map((data, i) => (
        <ChipItemWithIconComponent
          key={i}
          key_value={key_value}
          data={data}
          addItem={(data) => addItem(data, i)}
          getIcon={getIcon}
        />
      ));
    } else {
      body = datas.map((data, i) => (
        <ChipItemComponent
          key={i}
          key_value={key_value}
          data={data}
          addItem={(data) => addItem(data, i)}
        />
      ));
    }

    return (
      <div style={styles.wrapper}>
        <FloatingActionButton
          secondary={true}
          style={styles.button}
          onClick={() => addItem()}
        >
          <ContentAdd />
        </FloatingActionButton>
        {import_export &&
          <div style={styles.import_export}>
            <ImportExportPredefined />
          </div>
        }
        {body}
      </div>
    );
  }
}

export default ChipList;
