import { connect } from 'react-redux';

import Processing from '../component/processing_component';

import { closeSnackbar } from '../action/processing_action';

const mapStateToProps = state => {
  const { processing } = state;

  return { processing };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeSnackbar: () => {
    dispatch(closeSnackbar());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Processing);
