var task = function (request, callback) {

    var path = require('path');
    var formidable = require('formidable');
    var fs = require('fs');
    var AWS = require('aws-sdk');
    var Jimp = require("jimp");
    var Const = require("./const");

    var form = new formidable.IncomingForm();
    var fileName;
    
    form.multiples = true;
    form.uploadDir = path.join(__dirname, Const.UPLOAD_DIR);

    form.on('file', function (field, file) {
        fileName = Const.getUniqueSQSName();
        fs.rename(file.path, path.join(form.uploadDir, fileName));
    });

    form.on('end', function () {

        var Const = require("./const");

        Jimp.read(path.join(__dirname, Const.UPLOAD_DIR, fileName), function (err, image) {
            if (err) {
                Cont.putIntoLogDB(err);
                throw err;
            }
            image.getBuffer(image.getMIME(), (err, buffer) => {
                var s3Bucket = new AWS.S3({ params: { Bucket: Const.bucketName } });
                var data = { Key: fileName, Body: buffer };
                s3Bucket.putObject(data, function (err, data) {
                    if (err)
                        Cont.putIntoLogDB(err);
                    fs.unlink(__dirname + Const.UPLOAD_DIR + "/" + fileName);
                });

            });
        });
    });
    
    form.parse(request);

};

exports.lab = task;
