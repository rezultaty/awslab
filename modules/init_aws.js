var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
 var sqs = new AWS.SQS({ apiVersion: '2017-08-30' });