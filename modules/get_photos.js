class Picture {

    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

}

var task = function (request, callback) {

    var Const = require("./const")
    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');

    var imageIterator = 0;
    var downloadedPictures = [];
    
    var s3 = new AWS.S3();
    var params = { Bucket: Const.bucketName };
    s3.listObjects(params, function (err, data) {
        var bucketContents = data.Contents;

        for (var i = 0; i < bucketContents.length; i++) {
            var urlParams = { Bucket: Const.bucketName, Key: bucketContents[i].Key};
            s3.getSignedUrl('getObject', urlParams, function (err, url) {
                downloadedPictures.push(new Picture(bucketContents[imageIterator].Key, url));

                imageIterator++;

                if (imageIterator == bucketContents.length)
                    callback(null, JSON.stringify(downloadedPictures));

            });
        }
    });

};

exports.lab = task;
