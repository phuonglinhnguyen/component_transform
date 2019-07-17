import React from 'react';
import PropTypes from 'prop-types';

import { GridList } from 'material-ui/GridList';
import InputLookupField from '../../../../common/form/input_field';

let field = {
  name: 'field_test',
  field_display: 'Field Test Lookup',
  default_value: '',
  control_type: 'TEXTFIELD',
  tooltip: '',
  is_list: false,
  pattern: {
    content: '',
    description: ''
  },
  validation: {
    name: '',
    content: '',
    arguments: []
  },
  lookup_broadcast: [],
  value_broadcast: ''
};
class LookupItemPreview extends React.PureComponent {
  render() {
    const { lookup, default_props } = this.props;
    let lookup_source = {...lookup};
    let params_set = lookup_source.param_set || '';
    params_set = params_set.replace(/data.[\w|\W]+ /g , 'data.field_test,')
    lookup_source.param_set = params_set
    field.lookup_source = lookup_source;
    return (
      <GridList cols={1} {...default_props.grid_list}>
        <InputLookupField
          floatingLabelText={field.field_display}
          floatingLabelFixed={true}
          field={field}
          name={'field_test'}
          nextFocus={() => undefined}
        />
      </GridList>
    );
  }
}

LookupItemPreview.propTypes = {
  lookup: PropTypes.object
};

export default LookupItemPreview;
