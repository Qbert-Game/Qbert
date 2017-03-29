var path = require('path');
var fs = require('fs');

var GenerateIndex = function () { };

GenerateIndex.prototype.apply = function (compiler) {
    var startingPath = path.join(compiler.context, 'src/app');

    var callback = (entryPath) => {
        entryPath = entryPath || startingPath;
        var dir = fs.readdirSync(entryPath);

        for (var file of dir) {
            var filePath = path.join(entryPath, file);

            if (fs.statSync(filePath).isDirectory()) {
                var dir = fs.readdirSync(filePath);

                var src = '';

                var indexJsIndex = dir.indexOf('index.js');

                if (indexJsIndex !== -1) {
                    dir.splice(indexJsIndex, 1);
                }

                var modules = dir.map(fileName => {
                    var name = fileName.split('.')[0];
                    return { name: name, file: fileName };
                });

                for (var module of modules) {
                    src += `import ${module.name} from './${module.file}';\n`;
                }

                src += `export default { ${modules.map(module => module.name)} };\n`;

                fs.writeFileSync(path.join(filePath, 'index.js'), src);

                callback(filePath);
            }
        }
    };

    compiler.plugin('environment', callback);
};

module.exports = GenerateIndex;