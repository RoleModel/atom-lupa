var PATH = '/Users/lukasz/sandbox/lupa41/src/**/*.js'
var vfs = require('vinyl-fs');
var fs = require('fs');
var through = require('through2');
var Path = require('path');

var lupa = require('lupa').lupaStreams.lupa;
var File = require('vinyl');

var MAX_LISTENERS = 10000000;



function findVariables(file, enc, cb) {
    // this is example lupa plugin

    var body = file.ast.program.body;

    // analyze AST
    var variables = body.filter(function (node) {
        return node.type == 'VariableDeclaration'
    }).reduce(function (vars, node) {
        return vars.concat(node.declarations.map(function (decl) {
            return decl.id.name;
        }));
    }, []);

    var result = file.clone();
    result.metadata = [{name: 'variables', data: variables}]; // add metadata
    cb(null, result);
}



var fileInfo = require('lupa/src/plugins/FileInfo')();
lupa.plugin(function (file, enc, cb) {
    var result = file.clone();
    var contents = file.contents + '';
    var info = fileInfo(contents, file.path);
    result.metadata = [
        {name: 'lines', data: [info.lines] }
    ]
    cb(null, result);
}, function () { return true;});



lupa.plugin(findVariables);

// console.log("pluginek", require('lupa/plugins/React/components.js').getComponents);
// lupa.plugin(require('lupa/plugins/React/components.js').getComponents);

//require('lupa/plugins/React/components')

module.exports = {
    lupa: lupa,
    analyze: lupa.analyis.process
}
