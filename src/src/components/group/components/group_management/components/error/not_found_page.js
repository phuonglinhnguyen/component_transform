import React, { PureComponent } from 'react';

import ImageSrc from './t-google-404-1299071983.jpg';

class Loading extends PureComponent {
  render() {
    let style = this.props.style || {};
    let error = this.props.error || 'Error :(';
    return (
      <div
        style={{
          height: 'calc(100vh - 68px)',
          backgroundColor: 'rgb(255, 255, 255)',
          ...style
        }}
      >
        <div
          style={{
            height: 'calc(50vh)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{ width: 370, wordBreak: 'break-word', userSelect: 'none' }}
          >
            <div style={{ fontSize: 40 }}>{'Error :('}</div>
            <br />
            {error}
          </div>
          <img src={ImageSrc} style={{ userSelect: 'none' }} alt="" />
        </div>
      </div>
    );
  }
}

export default Loading;
