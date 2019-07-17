import React from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';
import { isEqual } from 'lodash'
import { getDataObject } from '@dgtx/coreui'
import { Close as CloseIcon } from '@material-ui/icons'
import {
    IconButton,
    Button,
    Switch,
    TextField,
    SelectField,
    MenuItem,
    AutoComplete,
    Card,
    CardContent,
    Typography,
    CardActions,
    FormControlLabel,
} from '@material-ui/core'

import { DashBoardCard } from '../dashboardCard'

class ProjectFunctions extends React.Component {
    handleClickFunc = (item) => {
        const {
            project,
            onClickItem =()=>{}
        } = this.props;
         onClickItem(item, project)
    }
    render() {
        const {
            project,
            functions,
            onClose,
            onClickItem
        } = this.props;

        return (
            <React.Fragment>
                <CardContent>
                    <div style={{ position: 'absolute', top: 8, right: 16, zIndex: 1000 }}>
                        <IconButton
                            style={{ margin: 8 }}
                            tooltip='Close'
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Typography gutterBottom variant="headline" component="h2">
                        DESIGNER FUNCTIONS
                    </Typography>
                    <Typography style={{ marginBottom: 12 }} variant="headline" color="textSecondary">
                        {`Project:${project.name}`}
                    </Typography>
                    <DashBoardCard
                        datas={functions}
                        onClickItem={this.handleClickFunc}
                    />

                </CardContent>
            </React.Fragment>
        );
    }
}


export default ProjectFunctions;