import React from "react";
import AceEditor from "react-ace";

class ConfigScriptTask extends React.PureComponent {
  constructor(props) {
    super(props);

    let script;
    if (this.props.data_config) {
      script = this.props.data_config.script;
    }

    this.state = {
      script: script
    };
  }

  getConfig({ viewer, element }) {
    const { script } = this.state;

    const node = viewer.get("elementRegistry").get(element.id);
    
    viewer.get("modeling").updateProperties(node, {
      script: script,
      scriptFormat: "Groovy"
    });
  }

  onScriptChange(newValue) {
    this.setState({
      script: newValue
    });
  }

  render() {
    const { script } = this.state;
    return (
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        name="script"
        fontSize={14}
        height="600px"
        width="100%"
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={script}
        onChange={newValue => {
          this.onScriptChange(newValue);
        }}
        enableBasicAutocompletion={true}
        enableSnippets={true}
      />
    );
  }
}
export default ConfigScriptTask;
