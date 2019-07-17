import React from 'react';

import LookupInfos from '../../../../configuration/components/lookup_definitions/components/lookup_item_infos_component';

import * as field_constants from '../constants/field_constants';
import * as lookup_constants from '../../../../configuration/components/lookup_definitions/constants/lookup_constants';

class FieldItemLookupSource extends React.Component {
  modifyLookup(name, value) {
    let lookup_source = { ...this.props.lookup_source };
    lookup_source[name] = value;
    this.props.modifyData(field_constants.KEY_LOOKUP_SOURCE, lookup_source);
  }

  handleAddChip(chip: string, name: string) {
    const lookup = { ...this.props.lookup_source };
    let locale = Array.isArray(lookup[name]) ? [...lookup[name]] : [];
    locale.push(chip);
    lookup[name] = locale;
    this.props.modifyData(field_constants.KEY_LOOKUP_SOURCE, lookup);
  }

  handleDeleteChip(index: number, name: string) {
    const lookup = { ...this.props.lookup_source };
    let locale = [...lookup[name]] || [];
    locale.splice(index, 1);
    lookup[name] = locale;
    this.props.modifyData(field_constants.KEY_LOOKUP_SOURCE, lookup);
  }

  render() {
    const {
      Translate,
      default_props,
      list_fields = [],
      list_lookup = [],
      modifyData,
    } = this.props;

    let lookup_source = { ...this.props.lookup_source };
    return (
      <div style={{ padding: 10 }}>
        <LookupInfos
          Translate={Translate}
          actionSelectData={modifyData.bind(this)}
          default_props={default_props}
          field_constants={field_constants}
          handleAddChip={this.handleAddChip.bind(this)}
          handleDeleteChip={this.handleDeleteChip.bind(this)}
          is_inherited={true}
          label_error={{}}
          list_fields={list_fields}
          list_lookup={list_lookup}
          lookup={lookup_source}
          lookup_constants={lookup_constants}
          modifyData={this.modifyLookup.bind(this)}
        />
      </div>
    );
  }
}

export default FieldItemLookupSource;
