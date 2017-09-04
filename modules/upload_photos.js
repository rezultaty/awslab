var task = function (request, callback) {

    var AWS = require('aws-sdk');
    var fs = require('fs');

    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var stringJSON = JSON.stringify(request.body);
    console.log(stringJSON);
    console.log(stringJSON.slice(0, 23).slice(stringJSON.length-2, stringJSON.length-1));
    var matches = stringJSON.match(regex);

    var ext = matches[1];
    var data = matches[2];
    var buffer = new Buffer(data, 'base64');

    const bucketName = "psoirphotobucket";


    var s3Bucket = new AWS.S3({params: {Bucket: bucketName}});
    var data = {Key: "testtest.jpg", Body: buffer};
    s3Bucket.putObject(data, function (err, data) {
            if (err) {
                console.log('Error uploading data: ', data);
            }
        }
    );


};

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

function convertURIToImageData(URI) {
    return new Promise(function (resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
        image.addEventListener('load', function () {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = URI;
    });
}

exports.lab = task;
