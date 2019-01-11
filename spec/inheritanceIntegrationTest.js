var test = require('tape')
var lupa = require('lupa');
var { readFileAsVinyl } = require('lupa/src/helpers')
const getComponents = require('lupa/plugins/javascript')({ namespaces: [] })
const parse = require('lupa/parsers/parsers')

var count = 0;

//TODO get this value from plugin itself
// var pluginCount = 3;


test('bar.js', function (t) {
  const file = readFileAsVinyl('bar.js')
  getComponents(parse(file), 'utf-8', (err, fileWithMetadata) => {
    const metadata = fileWithMetadata.metadata
    const classData = metadata.filter(datum => datum.type === 'class')
    const methodData = metadata.filter(datum => datum.type === 'function')
    t.equal(classData.length, 1)
    t.equal(classData[0].name, 'Bar')
    t.equal(classData[0].superClass.name, 'Foo')
    t.equal(methodData.length, 2)
    t.equal(methodData[0].name, 'foo')
    t.equal(methodData[1].name, 'bar')
  })
  t.end()
});
