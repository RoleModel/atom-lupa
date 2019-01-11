const Foo = require('./foo')

class Bar extends Foo {
  foo() {
    return super() + 'foo'
  }

  bar() {

    
  }
}

module.exports = Bar
