import * as React from 'react';
import Proptypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
export default class LayoutType extends React.PureComponent {
    static defaultProps={
        onChange:()=>null,
        value:'default',
        style:{}
    }
    static propTypes ={
        onChange:Proptypes.func.isRequired,
        value:Proptypes.string.isRequired,
    }
    handleChange = (event, index, value) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event, value)
        }
    }
    render() {
        const { value , style} = this.props;
        return (
            <DropDownMenu value={value} onChange={this.handleChange} style={style}>
                <MenuItem value="default" primaryText="default" />
                <MenuItem value="mixed" primaryText="Mixed"/>
                <MenuItem value="non_capture" primaryText="Non Capture"/>
            </DropDownMenu>
        )
    }
}
