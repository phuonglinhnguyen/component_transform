import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Paper from 'material-ui/Paper';

export default class ViewerOCR extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,   //link image currenct 
    page: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),//is ocr's data 
    focusText: PropTypes.string, //heighline text in image like this 
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func, // when agent selecting data in image 
    onChangeEnd: PropTypes.func,// when agent selected data in image 
  }
  static defaultProps = {
    imageUrl: '',
    pages: [],
    focusText: null,
    width: 500,
    height: 500,
    onChange: (text) => undefined,
    onChangeEnd: (text) => undefined
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps)
  }
  render() {
    const { imageUrl, pages, focusText, width, height } = this.props;
    return (
      <div
        style={{
          height: height,
          width: width,
          position: 'relative',
          overflow: 'hidden',
          background:'transparent'
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto'
          }}
        >
          <div style={{
            height: '100%',
            width: '100%',
            direction: 'ltr',
            position: 'relative',
            overflow: 'visible',
          }}>
            <img src={imageUrl || ''} />
          </div>
        </div>
      </div>
    );
  }
} 