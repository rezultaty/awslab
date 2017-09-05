var task = function (request, callback) {

    var Const = require("./const");

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "MessageType": {
                DataType: "Number",
                StringValue: Const.ROTATE_TYPE
            }
        },
        MessageBody: JSON.stringify(request.body),
        QueueUrl: Const.messageQueue
    };

    Const.sendMessage(params);

};

exports.lab = task;
