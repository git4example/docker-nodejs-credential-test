'use strict';

var AWS = require('aws-sdk');

console.log("Hi there");

var aws_region  = process.env['AWS_REGION'] ? process.env['AWS_REGION'] : 'ap-southeast-2'
var aws_profile = process.env['AWS_PROFILE'] ?  process.env['AWS_PROFILE'] : 'default'

AWS.CredentialProviderChain.defaultProviders = [
  function () { return new AWS.EnvironmentCredentials('AWS'); },
  function () { return new AWS.EnvironmentCredentials('AMAZON'); },
  function () { return new AWS.SharedIniFileCredentials(); },
  function () { return new AWS.ECSCredentials(); },
  function () { return new AWS.ProcessCredentials(); },
  function () { return new AWS.TokenFileWebIdentityCredentials(); },
  function () { return new AWS.EC2MetadataCredentials() }
];

var chain = new AWS.CredentialProviderChain();

chain.resolve((err, cred)=>{
  AWS.config.credentials = cred;
  //console.log("Heres your credentials : ");
  console.log(cred);
}, (err) => {
  console.log(err);
});

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

// console.log("CredentialProviderChain: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EnvironmentCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EnvironmentCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EnvironmentCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EnvironmentCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EC2MetadataCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EC2MetadataCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.ECSCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("ECSCredentials : ");
// console.log(AWS.config.credentials );