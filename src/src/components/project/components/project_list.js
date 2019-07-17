import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ProjectItem from './project_item';
import Loading from '../../common/loading';

class ProjectList extends React.Component {
  componentWillUnmount() {
    this.props.actions.resetStateProjectList();
  }
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      nameData: '',
      visibleAddInput: false,
      datas: props.project_list.projects
    };

    this.handleAdd = this.handleAdd.bind(this);


  }
  componentDidMount(prevProps, prevState) {
    this.props.actions.getList();
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
  handleAdd(event) {
    this.props.actions.startModifyProject();
  }
  handleEdit(project) {
    this.props.actions.startModifyProject(project);
  }
  handleSave(project_info) {
    if (project_info.id) {
      this.props.actions.updateProject(project_info);
    } else {
      this.props.actions.insertProject(project_info);
    }
  }
  renderNewItem(dataModify) {
    if (dataModify && dataModify.id === '0') {
      return (
        <GridList cellHeight="auto" cols={4} padding={30}>
          <ProjectItem
            dataModify={dataModify}
            {...this.props}
            key={dataModify.id}
            data={dataModify}
          />
        </GridList>
      );
    }
  }

  render() {

    const { is_fetching } = this.props.project_list;
    if (is_fetching) {
      return <Loading />
    }
    const { project_item } = this.props;
    const canAdd = this.props.project_list.canAdd;
    var datas_show = this.state.datas.filter(function (data) {
      return !data.hidden;
    });
    const dataModify = project_item.project_modify;
    return (
      <div style={{ margin: '1%' }}>
        <GridList cols={6} cellHeight="auto">
          <GridTile cols={5}>
            {canAdd ? <FloatingActionButton
              onClick={this.handleAdd}
              mini={true}
              secondary={true}
            >
              <ContentAdd />
            </FloatingActionButton>
              : <div></div>
            }
          </GridTile>

          <GridTile>
            <TextField
              onChange={this.handleSearchChange.bind(this)}
              value={this.state.searchInput}
              hintText="Search by Name"
              ref={input => {
                this.searchInput = input;
              }}
              fullWidth={true}

              name="search"
            />
          </GridTile>
        </GridList>
        {this.renderNewItem(dataModify)}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {datas_show.map((data, i) =>
            <ProjectItem
              dataModify={dataModify}

              handleEdit={this.handleEdit.bind(this, data)}
              {...this.props}
              key={data.id}
              data={data}
            />
          )}
        </div>
      </div>
    );
  }
}
ProjectList.propTypes = {
  showSubNav: PropTypes.bool,

  Translate: PropTypes.func
};
export default ProjectList;
