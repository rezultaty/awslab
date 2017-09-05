var downloadedPictures = [];
var clickedPictures = [];

class Picture {

    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

}

var viewModel = {
    pictures: ko.observable(downloadedPictures),
    choosenPictures: ko.observable(clickedPictures),
};

ko.applyBindings(viewModel);

$.ajax({
    type: "POST",
    url: "get_photos",
}).done(function (data) {
    var tempDownloadedPictures = JSON.parse(data);
    tempDownloadedPictures.forEach(function (value) {
        downloadedPictures.push(new Picture(value['name'], value['url']))
    });
    viewModel.pictures.valueHasMutated();
});

$(document).ready(function () {
    $('body').on('click', 'img', function () {
        if ($(this).css('background-color') == "rgb(255, 255, 255)")
            $(this).css('background-color', 'aqua');
        else
            $(this).css('background-color', 'white');
    })
});

function addPicture(name) {
    var removed = false;

    clickedPictures.forEach(function (element, index) {
        if (element === name) {
            clickedPictures.splice(index, 1);
            removed = true;
        }
    }, this);

    if (!removed)
        clickedPictures.push(name);

    viewModel.choosenPictures.valueHasMutated();
}

function photosToJSON() {
    var obj = new Object();
    obj.photos = clickedPictures;
    return obj;
}

function deletePhoto() {

    $.ajax({
        type: "POST",
        url: "delete_photo",
        data: photosToJSON()
    });

}

function rotatePhoto() {

    $.ajax({
        type: "POST",
        url: "rotate_photo",
        data: photosToJSON()
    });

}

function scalePhoto() {

    $.ajax({
        type: "POST",
        url: "scale_photo",
        data: photosToJSON()
    });

}

function uploadPhotos() {

    var input = document.getElementById('files');
    var file = input.files[0];
    var formData = new FormData();

    formData.append('image', file);
    
    $.ajax({
        url: 'upload_photos',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false
    });
    

}