import React from 'react';

import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';

class ErrorInfos extends React.Component {
  render() {
    const {
        default_props,
        error_constants,
        label_error,
        error,
        Translate,
        modifyData
    } = this.props;

    return (
        <GridList cols={1} {...default_props.grid_list}>
          <TextField
            autoFocus
            {...default_props.text_field}
            errorText={label_error}
            floatingLabelText={
              <Translate
                dangerousHTML
                value="configurations.error_definitions.name"
              />
            }
            value={error[error_constants.KEY_ERROR_NAME] || ''}
            onChange={event =>
              modifyData(
                error_constants.KEY_ERROR_NAME,
                event.target.value
              )}
            name={`${error_constants.KEY_ERROR_NAME}`}
          />
          <TextField
            {...default_props.text_field}
            floatingLabelText={
              <Translate
                dangerousHTML
                value="configurations.error_definitions.code"
              />
            }
            value={error[error_constants.KEY_ERROR_CODE] || ''}
            onChange={event =>
              modifyData(
                error_constants.KEY_ERROR_CODE,
                event.target.value
              )}
            name={`${error_constants.KEY_ERROR_CODE}`}
          />
          <TextField
            {...default_props.text_field}
            floatingLabelText={
              <Translate
                dangerousHTML
                value="configurations.error_definitions.description"
              />
            }
            value={error[error_constants.KEY_ERROR_DESCRIPTION] || ''}
            onChange={event =>
              modifyData(
                error_constants.KEY_ERROR_DESCRIPTION,
                event.target.value
              )}
            name={`${error_constants.KEY_ERROR_DESCRIPTION}`}
          />
        </GridList>
    );
  }
}

export default ErrorInfos;
