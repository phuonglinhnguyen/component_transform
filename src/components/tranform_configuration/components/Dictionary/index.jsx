import React, { useState } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DictionaryInput from "./dictionary_input";
import DictionaryList from "./dictionary_list";

const styles: any = (theme: any) => {
  return {
    wrapForm: {
      display: "flex",
      justifyContent: "space-around"
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
      padding: theme.spacing.unit * 2,
      minHeight: "200px"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
}
const Dictionary: React.FC<IDefautProps> = (props) => {
  const { classes, config, setConfig} = props
  const dictionary = config && config.dictionary ? config.dictionary : []
  const [selectedDictItem, setSelectedDictItem] = useState(null);
  const [dictItem, setDictItem] = useState(null)
  const [mode, setMode] = useState('add')

  return (
    <Grid className={classes.wrapForm} spacing={24}>
      <Grid item xs={12} md={6} className={classes.formControl}>
        <DictionaryInput
          config={config}
          setConfig={setConfig}
          dictItem={selectedDictItem ? selectedDictItem : dictItem} 
          setDictItem={selectedDictItem ? setSelectedDictItem : setDictItem}
          setSelectedDictItem={setSelectedDictItem}
          mode={mode}
          setMode={setMode}
          dictionary={dictionary}
          // setIsError={setIsError}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.formControl}>
        <DictionaryList
          dictionary={dictionary}
          setSelectedDictItem={setSelectedDictItem}
          setMode={setMode}
          config={config}
          setConfig={setConfig}
        />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles, { withTheme: true })(Dictionary)