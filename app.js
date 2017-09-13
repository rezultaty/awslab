var deletePhoto = require("./modules/delete_photo").lab;
var rotatePhoto = require("./modules/rotate_photo").lab;
var scalePhoto = require("./modules/scale_photo").lab;
var getPhotos = require("./modules/get_photos").lab;
var uploadPhotos = require("./modules/upload_photos").lab;

var urlMap = [
	{path: "/", action:"/static/index.html"},
	{path: "/delete_photo", action: deletePhoto},
	{path: "/rotate_photo", action: rotatePhoto},
	{path: "/scale_photo", action: scalePhoto},
	{path: "/get_photos", action: getPhotos},
	{path: "/upload_photos", action: uploadPhotos}
	];

var service = require("./lib/service").http(urlMap);

var PORT = 8080;
service(PORT);