import React from 'react';

import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import wrapState from '../../common/selectable_list_new';

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);




class GuideListProjectComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      datas: props.project_list.projects
    };
    this.handleSelectProject = this.handleSelectProject.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.project_list.is_fetching) {
      this.setState({
        datas: nextProps.project_list.projects
      });
    }
  }
  handleSearchChange(e) {
    this.setState({
      searchInput: e.target.value
    });
    this.filterDatas('name', e.target.value, this.state.datas);
  }
  filterDatas(data_label, key, datas) {
   
    datas.forEach(
    
      data => (data.hidden = !data[data_label].toLowerCase().includes(key))
    );
    this.setState({
      datas: datas
    });
  }

  handleSelectProject(project) {
    this.props.selectProject(project)
  }

  render() {

    const { project_selected, height } = this.props;
    var datas_show = this.state.datas.filter(function (data) {
      return !data.hidden;
    });
    const project_selected_id = project_selected && project_selected.id;
    return (
      <div>
        {
          (!datas_show||datas_show.length===0)?<Subheader>No Project Available</Subheader>:
          <div style={{ height: height, overflow: 'auto' }}>
            <TextField
              onChange={this.handleSearchChange.bind(this)}
              value={this.state.searchInput}
              hintText="Project Name"
              ref={input => {
                this.searchInput = input;
              }}
              fullWidth={false}
              style={{ float: 'right', }}
              name="search"
            />
            <div style={{ clear: 'both' }}>
              <SelectableList defaultValue={-1}>
                {
                  datas_show.map((data, index) => {

                    let backgroundColor = data.id === project_selected_id ? 'rgba(0, 0, 0, 0.2)' : ''
                    return <ListItem
                      initiallyOpen={true}
                      innerDivStyle={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        backgroundColor: backgroundColor,
                        color: 'blue'
                      }}

                      key={'list-item-' + index}
                      value={data.id}
                      primaryText={data.name}
                      onClick={() => this.handleSelectProject(data)}
                    />
                  })
                }
              </SelectableList>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default GuideListProjectComponent;
