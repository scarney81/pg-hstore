/*globals it, describe */
var mocha  = require('mocha'),
    should = require('should'),
    hstore = require('../lib/index.js');

describe('pg-hstore.parse', function() {
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

  it('should hstore parse an escaped quoted string with quotes', function(done) {
    var source = '"foo"=>"\\"bar\\""';
    hstore.parse(source, function(target) {
      should.exist(target);
      target.foo.should.equal('"bar"');
      done();
    });
  });

  it('should hstore parse a string with commas', function(done) {
    var source = '"foo"=>"bar,foo,bar"';
    hstore.parse(source, function(target) {
      should.exist(target);
      target.foo.should.equal('bar,foo,bar');
      done();
    });
  });

  it('should hstore parse a string with advanced types', function(done) {
    var source = '"foo"=>"{\\"key\\":\\"value\\",\\"key2\\":\\"value\\"}"';
    hstore.parse(source, function(target) {
      should.exist(target);
      target.foo.should.equal('{"key":"value","key2":"value"}');
      done();
    });
  });
});
