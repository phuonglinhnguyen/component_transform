import React, { Component } from 'react';
import { CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import FieldsContainer from './fields_containers'
import LayoutsContainer from './layouts_container'
// import AcquisitionListContainer from '../../acquisitions/containers/acquisition_list_container'
import ProjectItemContainer from '../../../containers/project_item_container'
import BatchPriorityContainer from './batch_priority_container'
import muiThemeable from 'material-ui/styles/muiThemeable';
import CommonProcessing from '../../../../common/snackbars/containers/common_processing_container';
import { Translate } from 'react-redux-i18n';
import ExportContainer from '../../io_configuration/containers/export_configuration_container';
import ImportContainer from '../../io_configuration/containers/import_configurations_container';


class DetailsSourcesContainer extends Component {
    render() {
        return (
            <div style={{width:'100%',    
            }}>

                <CommonProcessing muiTheme={this.props.muiTheme} Translate={Translate} />
                <GridList style={{ backgroundColor: this.props.muiTheme.palette.backgroundColor }}
                    cellHeight="auto"
                    cols={12}>
                    <GridTile cols={3} ></GridTile>
                    <GridTile cols={6} >
                        <CardText>
                            <ImportContainer {...this.props} />
                        </CardText>
                        <CardText>
                            <ExportContainer {...this.props} />
                        </CardText>
                        <CardText>
                            <FieldsContainer {...this.props} />
                        </CardText>
                        <CardText>
                            <LayoutsContainer {...this.props} />
                        </CardText>
                    </GridTile>
                    <GridTile cols={3} ></GridTile>
                </GridList>
            </div>

        );

    }
}
export default (muiThemeable()(DetailsSourcesContainer));
