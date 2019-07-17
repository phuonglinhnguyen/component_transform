import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import AutoResize from '../../common/layout/auto_size_decorator';
import Wrapper from '../../common/layout/wrapper';
import LayoutSeparate from '../../common/layout/layout_separate';

import Paper from 'material-ui/Paper/Paper';
import Subheader from 'material-ui/Subheader';
import GuideListProjectComponent from './guide_list_project_component'
import Loading from '../../common/loading';
import CircularProgress from 'material-ui/CircularProgress';

const GUideProjectListResize = AutoResize(GuideListProjectComponent)
class GuideComponent extends Component {
    constructor(props) {
        super(props);
        this.selectProject = this.selectProject.bind(this);
        this.downloadFile = this.downloadFile.bind(this)
        this.state = { project_selected: null }
    }

    componentWillMount() {
        this.props.actions.getListProjects(true,true)
    }
    downloadFile(projectId, fileName) {

        this.props.actions.download(
            projectId,
            fileName
        )
    }
    renderProjectGuide(project_guide) {

        const { list, is_fetching } = project_guide;
        if (is_fetching) {
            return <CircularProgress size={35} style={{ margin: 50 }} />
        }
        if (this.state.project_selected) {
            return <div>
                <Subheader> Project Guides</Subheader>
                <Paper style={{ width: '50%', margin: '16px 0 0 0px' }}>
                    {list && list.length > 0 ?
                        <GuideListComponent
                            list={list}
                            projectId={this.state.project_selected.id}
                            downloadFile={this.downloadFile}
                        />
                        : <Subheader>No Such File!!!</Subheader>
                    }
                </Paper>
            </div>
        }

    }
    selectProject(project) {
        this.setState({ project_selected: project })
        this.props.actions.getProjectGuides(project.id)
    }
    render() {

        const { project_guide, project_list } = this.props;
        const { project_selected } = this.state;
        if (project_list.is_fetching) {
            return <Loading />
        }

        return <Wrapper
            muiTheme={this.props.muiTheme}
            offset={{ top: 116 }}
            style={{ width: 'auto' }}
        >

            <LayoutSeparate

                firstStyle={{ width: 'calc(50% - 16px)' }}
                secondStyle={{ width: '50%' }}
                wrapperStyle={{
                    backgroundColor: this.props.muiTheme.palette.background1Color
                }}
                viewType={1}
                first={
                    <div>
                        <Subheader>Select Project</Subheader>
                        <Paper style={{ height: 'calc(100% - 32px)', width: 'calc(100% - 16px)', margin: '16px 0 0 16px' }}>
                            <GUideProjectListResize
                                project_list={project_list}
                                selectProject={this.selectProject}
                                project_selected={project_selected}

                            />
                        </Paper>
                    </div>

                }
                second={
                    this.renderProjectGuide(project_guide)


                }
            />
        </Wrapper>





    }

}

class GuideListComponent extends React.Component {
    render() {
        const { list, downloadFile, projectId } = this.props;
        return <List style={{ marginLeft: 16 }}>
            {
                list.map((item, index) => {
                    return <ListItem
                        onClick={() => downloadFile(projectId, item)}
                        key={index} primaryText={<a href="#">{item.file_name}</a>} />

                })
            }


        </List>
    }

}
export default GuideComponent;


