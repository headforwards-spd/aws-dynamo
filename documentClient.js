const AWS            = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = documentClient;
