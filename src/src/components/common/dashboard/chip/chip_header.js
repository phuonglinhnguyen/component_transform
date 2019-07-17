import React from "react";

import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";

import { GridList, GridTile } from "material-ui/GridList";

import * as global_constants from "../../../../constants";

import { Translate } from "react-redux-i18n";

let timeoutId = 0;

class CardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: ""
    };
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  onSearchTextChange(e) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(
      function() {
        this.props.filterDatas(this.state.search_text);
      }.bind(this),
      global_constants.TIME_OUT_KEY_SEARCH
    );

    this.setState({
      search_text: e.target.value
    });
  }

  render() {
    let {
      label_total,

      datas_length
    } = this.props;
    let { search_text } = this.state;

    return (
      <GridList style={{ margin: 0 }} cols={6} cellHeight={50}>
        <GridTile cols={5}>
          <Subheader>
            {datas_length} <Translate value={label_total} />
          </Subheader>
        </GridTile>
        <GridTile cols={1}>
          <TextField
            fullWidth={true}
            value={search_text}
            onChange={this.onSearchTextChange.bind(this)}
            ref={input => {
              this.searchInput = input;
            }}
            hintText={<Translate value="commons.hint_text.search" />}
          />
        </GridTile>
      </GridList>
    );
  }
}
export default CardHeader;
