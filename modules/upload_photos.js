var task = function (request, callback) {

    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    console.log( request.body);

    const bucketName = "psoirphotobucket";

    var s3Bucket = new AWS.S3({params: {Bucket: bucketName}});
    var data = {Key: "testtest.jpg", Body: request.body};
    s3Bucket.putObject(data, function (err, data) {
        if (err)
            console.log('Error uploading data: ', data);
    });

};

exports.lab = task;
