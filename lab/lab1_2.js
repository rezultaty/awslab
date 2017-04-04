//stub for lab 1_2
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');


var task =  function(request, callback){
    var ec2 = new AWS.EC2();

    var params = {
  DryRun: true,
  Filters: [
    {
      Name: 'patrykrutkowski',
      Values: [
      ]
    },
    /* more items */
  ],
  InstanceIds: [
    'i-092aa9e9b4a7959c3',
    /* more items */
  ],
  MaxResults: 1,
  NextToken: 'STRING_VALUE'
};
ec2.describeInstances(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
	
}

exports.lab = task