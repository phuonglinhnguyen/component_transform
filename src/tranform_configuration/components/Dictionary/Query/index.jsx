import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import QueryInput from "./query_input";
import QueryList from "./query_list";
import get from "lodash/get";

const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  styles?: any;
  theme?: any;
}
const Content: React.FC<IDefautProps> = props => {
  return (
    <React.Fragment>
      <QueryInput />
      <QueryList />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Content);
