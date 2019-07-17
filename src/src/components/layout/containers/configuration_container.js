import React from "react";
import PropTypes from "prop-types";
import { Route, Link, withRouter } from "react-router";
import { GridList, GridTile } from "material-ui/GridList";
import Paper from "material-ui/Paper";
import { ListItem } from "material-ui/List";
import SelectableList from "../../common/selectable_list";

import Subheader from "material-ui/Subheader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

import * as constants from "../../../constants";
import FlatButton from "material-ui/FlatButton";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const configs = [
  { name: "Validation Definitions", link_to: "validation-definitions" },
  { name: "Pattern Definitions", link_to: "pattern-definitions" }
];

class ConfigurationContainer extends React.Component {
  handleSelect(data) {
    this.props.history.push("/configurations/" + data.link_to);
  }
  render() {
    const { routes } = this.props;
    return (
      <GridList cols={4} cellHeight="auto">
        {configs.map((data, i) =>
          <Card key={i}>
            <CardActions>
              <FlatButton
                label={data.name}
                primary={true}
                onClick={this.handleSelect.bind(this, data)}
              />
            </CardActions>
          </Card>
        )}
      </GridList>
    );
  }
}

export default withRouter(ConfigurationContainer);
