import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace';
export const KEY_VALIDATION_NAME = 'name';
export const KEY_VALIDATION_SCRIPT = 'content';
export const KEY_VALIDATION_ARGUMENTS = 'arguments';
export default class ValidationSectionEditer extends PureComponent {
    static propTypes = {
        validation: PropTypes.object,
        onChange:PropTypes.func.isRequired,
    }
    render() {
        const {validation, onChange} = this.props;
        return (
            <div>
                <AceEditor
                    mode="javascript"
                    theme="solarized_dark"
                    name={KEY_VALIDATION_SCRIPT}
                    fontSize={14}
                    height="600px"
                    width="100%"
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={validation[KEY_VALIDATION_SCRIPT] || ''}
                    editorProps={{ $blockScrolling: 'Infinity' }}
                    onChange={newValue =>
                        onChange(newValue)
                    }
                    enableBasicAutocompletion={true}
                    enableSnippets={true}
                />
            </div>
        )
    }
}
