import React, { PureComponent } from "react";

import CircularProgress from "material-ui/CircularProgress";

class Loading extends PureComponent {

  render() {
    return (
      <div 
        className="ajax-circle"        
      >
        <CircularProgress
          size={100}
          left={0}
          top={0}
          status="loading"
          style={{
            display: "inline-block",
            //position: "relative",
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)"

          }}
        />
      </div>
    );
  }
}

export default Loading;
