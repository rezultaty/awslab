var task = function (request, callback) {

    var Const = require("./const")
    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    var s3 = new AWS.S3();
    
    request.body['photos'].forEach(function(value) {
        var params = {  Bucket: Const.bucketName, Key: value };
        s3.deleteObject(params, function(err, data) {
            if (err) Const.putIntoLogDB(err);
        });
    });

};

exports.lab = task;
