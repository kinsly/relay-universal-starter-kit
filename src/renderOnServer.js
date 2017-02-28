import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';
import config from "../config/config.js"
import SyncRequest from "sync-request";
import Helmet from "react-helmet"

const GRAPHQL_URL = config.QL_SERVER_FULL;

const CURLANG = config.REST_API_CURLANG;
const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);

function getLanguage(string){
  var array = string.split("/")
  return array[0]
}

export default (req, res, next) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps,
        new Relay.DefaultNetworkLayer(GRAPHQL_URL, {
           headers: { cookie: req.headers.cookie, credentials: 'same-origin'}
        })
      ).then(render, function(){
        //Run this if server side exception occured
        res.status(404).render(path.resolve(__dirname, '..', 'views', '404.ejs'));});

    } else {
      //res.status(404).send('Not Found');
      res.status(404).render(path.resolve(__dirname, '..', 'views', '404.ejs'), {});
    }

    function render({ data, props }) {
      const reactOutput = ReactDOMServer.renderToString(IsomorphicRouter.render(props));
      const helmet = Helmet.rewind();
      res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
        preloadedData: data,
        reactOutput,
        title: helmet.title
      });
    }
  });
};
