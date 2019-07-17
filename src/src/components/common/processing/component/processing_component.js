import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import { Translate } from 'react-redux-i18n';
const Processing = ({ processing, closeSnackbar }) => {
  let {
    status_text,

    is_processing,

    show_snack_bar,
    name
  } = processing;

  if (is_processing) {
    return <LinearProgress />;
  }

  if (!status_text) {
    status_text = ' ';
  } else {
    status_text = status_text + '';
  }

  return (
    <Snackbar
      style={{ zIndex: '9999' }}
      open={show_snack_bar}
      message={<Translate value={status_text} name={name} />}
      onRequestClose={closeSnackbar}
    />
  );
};
Processing.propTypes = {
  is_processing: PropTypes.bool,
  show_snack_bar: PropTypes.bool,

  status_text: PropTypes.string
};

export default Processing;
