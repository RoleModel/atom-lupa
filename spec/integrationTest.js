var test = require('tape')
var plugin = require('../lib/plugin');

var count = 0;

test('mock.js', function (t) {
  plugin.analyze('mock.js', function (state) {
    count++;
    t.assert(count<4);
    t.equal(state.files.length, 1);
    t.equal(state.files[0].path, 'mock.js')
    t.assert(state.files[0].metadata.length)
  });
  t.end()
});
