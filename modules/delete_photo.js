var task = function (request, callback) {

    var AWS = require('aws-sdk');
    var Const = require("./const");
    AWS.config.loadFromPath('./config.json');
    var sqs = new AWS.SQS({ apiVersion: '2017-08-30' });

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "MessageType": {
                DataType: "Number",
                StringValue: Const.DELETE_TYPE
            }
        },
        MessageBody: JSON.stringify(request.body['photos']),
        QueueUrl: Const.messageQueue
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });

};

exports.lab = task;
