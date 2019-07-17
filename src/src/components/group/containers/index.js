import React from 'react';
import { Route } from 'react-router';

class Groups extends React.Component {
  render() {
    const { routes = [] } = this.props;

    return (
      <section
        className="without-tabs"
        role="main"
        style={{
          overflow: 'hidden',
          padding: '64px 1px 1px 1px'
        }}
      >
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={props => (
              <route.component
                {...props}
                routes={route.routes}
                muiTheme={this.props.muiTheme}
              />
            )}
          />
        ))}
      </section>
    );
  }
}

export default Groups;
