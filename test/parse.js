/*globals it, describe */
var mocha  = require('mocha'),
    should = require('should'),
    hstore = require('../lib/index.js');

describe('node-hstore.parse', function() {
  it('should hstore parse an hstore string', function(done) {
    var source = '"foo"=>"bar"';
    hstore.parse(source, function(target) {
      should.exist(target);
      target.foo.should.equal('bar');
      done();
    });
  });

  it('should hstore parse an hstore string with multiple values', function(done) {
    var source = '"foo"=>"oof","bar"=>"rab","baz"=>"zab"';
    hstore.parse(source, function(target) {
      should.exist(target);
      target.foo.should.equal('oof');
      target.bar.should.equal('rab');
      target.baz.should.equal('zab');
      done();
    });
  });
});