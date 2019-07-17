const styles = {
  chip: {
    margin: 4
  },
  grid_list: {
    margin: 10
  },
  toggle: {
    margin: 0
  },
  info: {
    margin: 0
  },
  inline: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  icon_button: {
    marginTop: 25
  }
};

const default_props = {
  text_field: {
    floatingLabelFixed: true,
    fullWidth: true
  },

  select_field: {
    floatingLabelFixed: true,
    fullWidth: true
  },
  chip: {
    style: styles.chip
  },
  grid_list: {
    padding: 30,
    cellHeight: 'auto',
    style: styles.grid_list,
    cols: 4
  },
  toggle: {
    cols: 4,
    padding: 30,
    cellHeight: 'auto',
    style: styles.toggle
  },
  info: {
    cols: 1,
    padding: 30,
    cellHeight: 'auto',
    style: styles.info
  },
  source: {
    style: {
      fontSize: '12px',
      fontWeight: '400',
      paddingLeft: '0px'
    }
  },
  buttonToolbar: {
    style: {
      marginLeft: '0px'
    }
  },
  toolbar: {
    style: {
      marLeft: '0px'
    }
  }
};

export default default_props;
