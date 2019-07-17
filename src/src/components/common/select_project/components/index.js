import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
class SelectProjectComponent extends Component {
    componentWillUnmount() {
        this.props.actions.resetStateSelectProject();
    }
    componentWillMount() {
        this.props.actions.getList();
    }
    handleChange(event, index, value) {
        const { projects } = this.props.select_project;
        const selected_project = projects.find(item => item.id === value);
        this.props.actions.selectProjectItem(selected_project);
    }

    render() {
        const { projects, selected_project } = this.props.select_project;
        return (<GridList cols={12}>
            <GridTile cols={5}></GridTile>
            <GridTile>  <Subheader>Select Project</Subheader></GridTile>
            <GridTile cols={4}> <SelectField
                onChange={this.handleChange.bind(this)}
                value={selected_project && selected_project.id}

            >
                {projects.map(item => {
                    return <MenuItem
                        key={item.id}
                        value={item.id}
                        primaryText={item.name} />
                })}


            </SelectField></GridTile>


        </GridList>



        );
    }

}


export default SelectProjectComponent;
