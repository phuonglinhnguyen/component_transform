import React from 'react';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import { Translate } from 'react-redux-i18n';

export const GridHeader = (props) => {
  let { label_total, total, onSearch, keySearch } = props;
  return (
    <GridList cols={6} cellHeight={50}>
      <GridTile cols={5}>
        <Subheader>
          {total} <Translate value={label_total} />
        </Subheader>
      </GridTile>
      <GridTile cols={1}>
        <TextField
          fullWidth={true}
          value={keySearch}
          onChange={e => {
            onSearch(e.target.value);
          }}
          hintText={<Translate value="commons.hint_text.search" />}
        />
      </GridTile>
    </GridList>
  );
}

export default GridHeader;