import React from "react";
import { Route } from "react-router";

class System extends React.Component {
  render() {
    const { routes = [] } = this.props;
    return (
      <section
        className="with-tabs config"
        role="main"
        style={{ overflow: "hidden" }}
      >
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
                  muiTheme={this.props.muiTheme}
                />
              );
            }}
          />
        ))}
      </section>
    );
  }
}

export default System;
