import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_list: []
    };
  }
  componentDidMount() {
    this.generateData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.generateData(nextProps);
  }
  generateData(prop) {
    this.setState({ project_list: prop.project_list.projects });
  }

  render() {
    const { routes = [], muiTheme } = this.props;
    return (
      <div style={{ height: "100%", width: "100%" , overflowY : 'auto' , overflowX  :'auto'}}>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={props => {
              return (
                <route.component
                  {...props}
                  routes={route.routes}
                  muiTheme={muiTheme}
                />
              );
            }}
          />
        ))}
      </div>
    );
  }
}

export default Project;
