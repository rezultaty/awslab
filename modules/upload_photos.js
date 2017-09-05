var task = function (request, callback) {

    var path = require('path');
    var formidable = require('formidable');
    var fs = require('fs');
    var AWS = require('aws-sdk');
    var Jimp = require("jimp");

    var bucketName = "psoirphotobucket";

    var form = new formidable.IncomingForm();
    var fileName;
    
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/uploads');

    form.on('file', function (field, file) {
        fileName = generateUUID();
        fs.rename(file.path, path.join(form.uploadDir, fileName));
    });

    form.on('end', function () {
        Jimp.read(path.join(__dirname, '/uploads/', fileName), function (err, image) {
            if (err)
                throw err;
            image.getBuffer(image.getMIME(), (err, buffer) => {
                var s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });
                var data = { Key: fileName, Body: buffer };
                s3Bucket.putObject(data, function (err, data) {
                    if (err) 
                        console.log('Error uploading data: ', data);
                    fs.unlink(__dirname + '/uploads/' + fileName);
                });

            });
        });
    });
    
    form.parse(request);

};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

exports.lab = task;
