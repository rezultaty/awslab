module.exports = {

    getUniqueSQSName: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    sendMessage: function (params) {
        var AWS = require('aws-sdk');
        AWS.config.loadFromPath('./config.json');
        var sqs = new AWS.SQS({apiVersion: this.API_VERSION});

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });


    },
    prepareMessage: function (type, data) {

        var Const = require("./const");

        data.forEach(function (value) {
            var params = {
                DelaySeconds: 10,
                MessageAttributes: {
                    "MessageType": {
                        DataType: "Number",
                        StringValue: type
                    }
                },
                MessageBody: JSON.stringify(value),
                QueueUrl: Const.messageQueue
            };

            Const.sendMessage(params);
        });

    },
    putIntoLogDB: function (message) {

        var AWS = require('aws-sdk');
        AWS.config.loadFromPath('./config.json');
        var dynamodb = new AWS.DynamoDB();

        var params = {
            Item: {
                "GUID": {
                    S: this.getUniqueSQSName()
                },
                "timestamp": {
                    S: String(Date.now())
                },

                "Message": {
                    S: "Worker; " + message
                }
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: this.logTableName
        };
        dynamodb.putItem(params, function (err, data) {
        });

    },
    bucketName: "psoirphotobucket",
    messageQueue: "https://sqs.eu-west-2.amazonaws.com/953234601553/RutkowskiQueue",

    UPLOAD_DIR: '/uploads',

    /*SQS values*/
    DELETE_TYPE: "1",
    ROTATE_TYPE: "2",
    SCALE_TYPE: "3",
    API_VERSION: "2017-08-30"

};