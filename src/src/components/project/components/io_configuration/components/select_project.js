import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
export default class SelectProject extends Component {
  componentWillMount() {
    const { projectsActions, projects } = this.props;
    projectsActions.fetchListIfNeeded({projects})
  }
  componentWillReceiveProps(nextProps) {
    const { projectsActions, projects } = nextProps;
    projectsActions.fetchListIfNeeded({projects})
  }
  componentDidMount() {
    const { projectsActions, projects } = this.props;
    projectsActions.fetchListIfNeeded({projects})
  }

  handleChange = (event, index, value) => this.props.projectsActions.selectProject(value);
  render() {
    const { projects } = this.props;
    let items = projects.items||[]
    
    return (
      <SelectField
        floatingLabelText="Project"
        value={projects.projectId||''}
        onChange={this.handleChange}
      >                                                                                   
        {items.map(item=>
          <MenuItem  key={`item-project-${item.id}`} value={item.id} primaryText={item.name} />
        )}
      </SelectField>
    );
  }
}