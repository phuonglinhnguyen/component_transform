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
  const [selectedCommonName, setSelectedCommonName] = useState(null);
  const [selectedCommonValue, setSelectedCommonValue] = useState(null);
  return (
    <React.Fragment>
      <CommonInput
        config={config}
        setConfig={setConfig}
        commonValue={
          selectedCommonValue ? selectedCommonValue : commonValue
        }
        setCommonValue={
          selectedCommonValue ? setSelectedCommonValue : setCommonValue
        }
        mode={mode}
        setMode={setMode}
        common={common}
        commonName={
          selectedCommonName ? selectedCommonName : commonName
        }
        setCommonName={selectedCommonName ? setSelectedCommonName : setCommonName}
        selectedCommonValue={selectedCommonValue}
        selectedCommonName={selectedCommonName}
      />
      <CommonList
        setMode={setMode}
        common={common}
        config={config}
        setConfig={setConfig}
        commonName={commonName}
        commonValue={commonValue}
        setSelectedCommonValue={setSelectedCommonValue}
        setSelectedCommonName={setSelectedCommonName}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
