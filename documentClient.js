const AWS            = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

modules.export = documentClient;