var task = function (request, callback) {

    var Const = require("./const");

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

    Const.sendMessage(params);

};

exports.lab = task;
