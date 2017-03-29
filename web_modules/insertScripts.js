var path = require('path');
var fs = require('fs');

var InsertScripts = function (options) {
    this.entry = options.entry;
    this.scripts = options.scripts;
    this.output = options.output;
    this.styles = options.styles;
};

InsertScripts.prototype.apply = function (compiler) {
    var entry = this.entry;
    var output = path.join(compiler.context, this.output);
    var scripts = this.scripts;
    var styles = this.styles;

    var createDirectory = function (filePath) {
        var dirname = path.dirname(filePath);

        if (fs.existsSync(dirname)) {
            return true;
        }

        createDirectory(dirname);
        fs.mkdirSync(dirname);
    };

    var generateScriptsHtml = function (scripts) {
        var htmlScripts = '';

        for (var x of scripts) {
            htmlScripts += `<script src="${x}" type="text/javascript"></script>\n\t`;
        }

        return htmlScripts;
    };

    var generateStylesHtml = function (styles) {
        var htmlStyles = '';

        for (var x of styles) {
            htmlStyles += `<link rel="stylesheet" href="${x}">\n\t`;
        }

        return htmlStyles;
    };

    compiler.plugin('compile', () => {
        var content = fs.readFileSync(entry, 'utf-8');

        var htmlScripts = generateScriptsHtml(scripts);
        content = content.replace('%INSERT-SCRIPTS%', htmlScripts);

        var htmlStyles = generateStylesHtml(styles);
        content = content.replace('%INSERT-STYLES%', htmlStyles);

        createDirectory(output);
        fs.writeFileSync(output, content);
    });
};

module.exports = InsertScripts;