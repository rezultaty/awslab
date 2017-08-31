var downloadedPictures = [];
var clickedPictures = [];

class Picture {

    constructor(name) {
        this.name = name;
        this.url = "https://s3.eu-west-2.amazonaws.com/psoirphotobucket/" + name;
    }

}

var viewModel = {
    pictures: ko.observable(downloadedPictures),
    choosenPictures: ko.observable(clickedPictures),
};

ko.applyBindings(viewModel);

$.ajax({
    url: "http://psoirphotobucket.s3.eu-west-2.amazonaws.com/"
}).done(function (data) {

    var json = JSON.parse(xml2json(data, ""));

    $.each(json.ListBucketResult.Contents, function (index, value) {
        downloadedPictures.push(new Picture(value.Key));
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
        data: clickedPictures
    });

}

function scalePhoto() {

    $.ajax({
        type: "POST",
        url: "scale_photo",
        data: clickedPictures
    });

}