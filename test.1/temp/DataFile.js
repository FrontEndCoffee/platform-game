"use strict";
var DataFile = (function () {
    function DataFile(fileURI, callback) {
        var _this = this;
        this.callback = callback;
        this.fileType = this.getFileType(fileURI);
        var request = new XMLHttpRequest();
        var context = this;
        request.onload = function (req) {
            _this.onDataFileLoaded(req, context);
        };
        request.open('GET', fileURI, true);
        request.send();
    }
    DataFile.prototype.getFileType = function (file) {
        var temp = file.split('.');
        if (temp.length < 2) {
            throw 'Invalid File ' + file;
        }
        return temp[temp.length - 1].toLowerCase();
    };
    DataFile.prototype.onDataFileLoaded = function (file, context) {
        context.fileContents = context.parseDataFile(file.target.responseText);
        context.callback(context.fileContents);
    };
    DataFile.prototype.parseDataFile = function (rawFileContents) {
        switch (this.fileType) {
            case 'json':
                return JSON.parse(rawFileContents);
            default:
                return rawFileContents;
        }
    };
    return DataFile;
}());
exports.DataFile = DataFile;
