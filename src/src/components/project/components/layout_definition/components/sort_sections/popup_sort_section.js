import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { isEqual } from 'lodash'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ContentSort from 'material-ui/svg-icons/content/sort'
import ListSection from './list_section'
export default class PopoverSortSections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items || [],
            open: false,
        };
    }
    componentWillReceiveProps = (nextProps) => {
        if (!isEqual(nextProps.items, this.props.items)) {
            this.setState({ items: nextProps.items });
        }
    }
    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleClickApply = (event) => {
        event.preventDefault();
        const { onSortSections } = this.props;
        onSortSections(this.state.items.map((item, index) => ({...item, index})));
        this.handleRequestClose();
    }
handleClickCancel = (event) => {
    event.preventDefault();
    this.setState({
        items: this.props.items,
        open: false,
        anchorEl: event.currentTarget,
    });
}
handleSortItems = (items) => {
    this.setState({ items })
}
render() {
    return (
        <div>
            <IconButton
                tooltip="Sort sections"
                onClick={this.handleClick}
            >
                <ContentSort />
            </IconButton>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
            >
                <Card>
                    <CardTitle title="Sort Sections" />
                    <CardText>
                        <ListSection items={this.state.items} onSortEnd={this.handleSortItems} />
                    </CardText>
                    <CardActions>
                        <FlatButton label="CANCEL" onClick={this.handleClickCancel} />
                        <FlatButton label="APPLY" primary={true} onClick={this.handleClickApply} />
                    </CardActions>
                </Card>
            </Popover>
        </div>
    );
}
}