var task = function (request, callback) {

    var Const = require("./const");
    Const.prepareMessage(Const.SCALE_TYPE, request.body['photos']);

};

exports.lab = task;
    