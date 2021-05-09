const fs = require('fs');
var handlebars = require('handlebars');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};

module.exports = function Read(path, replacements,  callback) {
    readHTMLFile(__dirname + path, function(err, html) {
        var template = handlebars.compile(html);
        var htmlToSend = template(replacements)
        callback(htmlToSend)
    })
}