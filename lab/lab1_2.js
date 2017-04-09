//stub for lab 1_2
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');
var ec2 = new AWS.EC2();

var params = {
    DryRun: false,
    InstanceIds: [
        'i-092aa9e9b4a7959c3'
    ]
};
var task = function (request, callback) {
    ec2.describeInstances(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else callback(null, data);           // successful response
    });
}

    exports.lab = task;