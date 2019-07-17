import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderInfoComponent from '../component/layout_header_information_component';

import { getHeaderTitle,resetState } from '../actions'
import muiThemeable from 'material-ui/styles/muiThemeable';

const HeaderInfoContainer = props =>
    <HeaderInfoComponent {...props}/>

const mapStateToProps = state => {


    return {
        layout_header_information: state.layout_header_information,
        project_name:state.project.project_item.project&&state.project.project_item.project.name,
        is_error:state.project.project_item.is_error
      
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getHeaderTitle,
            resetState
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(
    muiThemeable()(HeaderInfoContainer)
);
