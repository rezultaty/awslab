var task = function (request, callback) {

    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    var sqs = new AWS.SQS({apiVersion: '2017-08-30'});

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "MessageType": {
                DataType: "Number",
                StringValue: "2"
            }
        },
        MessageBody: JSON.stringify(request.body),
        QueueUrl: "https://sqs.eu-west-2.amazonaws.com/953234601553/RutkowskiQueue"
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
