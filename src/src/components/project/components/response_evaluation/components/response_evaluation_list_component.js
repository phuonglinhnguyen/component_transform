import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import DashboardCard from '../../../../common/dashboard/chip';
import Loading from '../../../../common/loading';


import * as response_evaluation_constants from '../constants/response_evaluation_constants';

class ProjectResponseEvaluationList extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.projectid;
    this.props.actions.getList(projectId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateResponseEvaluationList();
    this.props.actions.closeSnackbar();
  }

  goToPageResponseEvaluationItem(data) {
    this.props.history.push(
      `${this.props.match.url}/${data ? data.id : 'new'}`
    );
  }

  render() {
    const {
      is_fetching,
      I18n,
      Translate,
      response_evaluations,
      muiTheme
    } = this.props;

    if (is_fetching) {
      return <div > <Loading /></div>
    }

    return (
      <DashboardCard
        key_value={
          response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_NAME
        }
        label_total="project.response_evaluation.response_evaluations_available"
        label_text_add="project.response_evaluation.response_evaluation_add_name"
        label_text_search="commons.hint_text.search"
        hint_text_add="project.response_evaluation.press_enter_to_add_response_evaluation"
        label_button_add="project.response_evaluation.create_new_response_evaluation"
        addItem={this.goToPageResponseEvaluationItem.bind(this)}
        editItem={this.goToPageResponseEvaluationItem.bind(this)}
        datas={response_evaluations}
        I18n={I18n}
        muiTheme={muiTheme}
        Translate={Translate}
      />
    );
  }
}
ProjectResponseEvaluationList.propTypes = {
  I18n: PropTypes.object,
  Translate: PropTypes.func,

  response_evaluations: PropTypes.array
};


export default withRouter(ProjectResponseEvaluationList);
