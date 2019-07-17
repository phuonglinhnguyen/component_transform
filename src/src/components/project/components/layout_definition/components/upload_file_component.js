import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
const getNameFile = filepath => {
  return filepath.split('\\').pop();
};
class FileUploader extends Component {
  static propTypes = {
    onFileLoad: PropTypes.func.isRequired
  };
  static defaultProps = {
    fileTypeRegex: /.*/,
    onFileLoad: () => undefined
  };
  onInputChange(e) {
    let fileName = getNameFile(e.target.value);
    let reader = new FileReader();
    reader.onload = event =>
      this.props.onFileLoad({
        data: event.target.result,
        fileName: fileName
      });
    reader.readAsDataURL(e.target.files[0]);
  }
  componentDidMount() {
    this.fileUpload.addEventListener(
      'change',
      e => this.onInputChange(e),
      false
    );
  }
  render() {
    const { style = {}, mini } = this.props;
    return (
      <FloatingActionButton style={style} mini={mini}>
        <input
          style={{
            opacity: 0,
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px'
          }}
          type="file"
          ref={node => (this.fileUpload = node)}
        />
        <FileUpload />
      </FloatingActionButton>
    );
  }
}
export default FileUploader;
