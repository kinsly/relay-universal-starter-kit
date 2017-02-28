import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';
import config from "../config/config.js"

const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer(config.CLIENT_QL_URL,{credentials: 'same-origin',headers:{}}));

const data = JSON.parse(document.getElementById('preloadedData').textContent);
IsomorphicRelay.injectPreparedData(environment, data);
const rootElement = document.getElementById('root');

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
    ReactDOM.render(
      <Router
        {...props}
        onUpdate={e => fireTracking(e, props, redirectLocation, renderProps)}
        />,
      rootElement
    );
  });
});

function fireTracking(e, props,redirectLocation,renderProps){
  window.scrollTo(0, 0);
}
