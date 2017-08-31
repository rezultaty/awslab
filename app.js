var lab1_1 = require("./modules/lab1_1").lab;
var deletePhoto = require("./modules/delete_photo").lab;
var rotatePhoto = require("./modules/rotate_photo").lab;

var urlMap = [
	{path: "/", action:__dirname + "/static/index.html"},
	{path: "/digest", action: lab1_1},
	{path: "/delete_photo", action: deletePhoto},
	{path: "/rotate_photo", action: rotatePhoto}
	];

var service = require("./lib/service").http(urlMap);

var PORT = 80;
service(PORT);