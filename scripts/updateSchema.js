import config from "../config/config.js"
import fs from "fs"
//var babelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var url = config.QL_SERVER_FULL;

var response = request('POST', url, {
   qs: {
      query: introspectionQuery
   }
});

var schema = JSON.parse(response.body.toString('utf-8'));
var successData = JSON.stringify(schema, null,2)
fs.writeFileSync(__dirname+"/../data/schema.json",successData, 'utf8');
