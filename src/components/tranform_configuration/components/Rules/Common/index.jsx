import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CommonInput from "./common_input";
import CommonList from "./common_list";
import get from "lodash/get";
const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  commonName?: any;
}
const Common: React.FC<IDefautProps> = props => {
  const { classes, mode, setMode, config, setConfig } = props;
  const common = get(config, "rules.common", []);

  const [commonValue, setCommonValue] = useState(null);
  const [commonName, setCommonName] = useState(null);
  const [selectedCommonItem, setSelectedCommonItem] = useState(null);

  return (
    <React.Fragment>
      <CommonInput
        config={config}
        setConfig={setConfig}
        commonValue={commonValue}
        setCommonValue={setCommonValue}
        mode={mode}
        setMode={setMode}
        common={common}
        commonName={commonName}
        setCommonName={setCommonName}
        selectedCommonItem={selectedCommonItem}
      />
      <CommonList
        setMode={setMode}
        common={common}
        config={config}
        setConfig={setConfig}
        setSelectedCommonItem={setSelectedCommonItem}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
