import React, { Component } from 'react';
import { getTranformMap } from './tranforms';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
export const RuluesTranforms = (ComposeComponent) => {
    return class RulesTranforms extends Component {
        static state = {
            tranformMap: undefined,
        }
        static propTypes = {
            recordsInput: PropTypes.arrayOf(PropTypes.object).isRequired,
            fields: PropTypes.arrayOf(PropTypes.object).isRequired,
        }
        static defaultProps = {
            recordsInput: [],
            fields: [],
        }
        componentWillMount() {
            const { fields } = this.props;
            this.setState({ tranformMap: getTranformMap(fields) })
        }
        componentWillReceiveProps(nextProps) {
            if (!isEqual(this.props.fields, nextProps.fields)) {
                const _tranformMap = getTranformMap(nextProps.fields);
                this.setState({ tranformMap: _tranformMap })
            }
        }
        shouldComponentUpdate(nextProps, nextState, nextContext) {
            let shouldUpdate = (!isEqual(this.props, nextProps)
                || !isEqual(this.state, nextState)
                || !isEqual(this.context, nextContext)
            )
            return shouldUpdate;
        }
        componentWillUnmount() {
            this.setState({
                tranformMap: undefined,
            })
        }
        getValueTranforms = (records) => {
            const { fields, recordsInput } = this.props;
            const { tranformMap={} } = this.state;
                let result = [];
                let _records = records ? records : recordsInput;
                _records.forEach((record) => {
                    let _resultRecord = {};
                    fields.forEach(field => {
                        let fieldName = field.name
                        let val = record[fieldName];
                        let funcTranform = tranformMap[fieldName];
                        if (funcTranform) {
                            val = funcTranform(val, record);
                        }
                        _resultRecord[fieldName] = val;
                    });
                    result.push(_resultRecord);
                });
                return result;
           
        }

        render() {
            return (
                <ComposeComponent {...this.props}
                    getValueTranforms={this.getValueTranforms}
                    canGetTranform={!!this.state.tranformMap}
                />
            );
        }
    }
}

export default RuluesTranforms;