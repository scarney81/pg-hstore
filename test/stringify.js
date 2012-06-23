/*globals it, describe */
var mocha  = require('mocha'),
    should = require('should'),
    hstore = require('../lib/index.js');

describe('pg-hstore.stringify', function() {
  it('should hstore encode a string', function(done) {
    var source = { foo: "bar" };
    hstore.stringify(source, function(target) {
      should.exist(target);
      target.should.equal('"foo"=>"bar"');
      console.log(target);
      done();
    });
  });

  it('should hstore encode a number', function(done) {
    var source = { foo: 1000 };
    hstore.stringify(source, function(target) {
      should.exist(target);
      target.should.equal('"foo"=>"1000"');
      done();
    });
  });

  it('should hstore encode a boolean', function(done) {
    var source = { foo: true };
    hstore.stringify(source, function(target) {
      should.exist(target);
      target.should.equal('"foo"=>"true"');
      done();
    });
  });

  it('should hstore encode a null value', function(done) {
    var source = { foo: null };
    hstore.stringify(source, function(target) {
      should.exist(target);
      target.should.equal('"foo"=>""');
      done();
    });
  });
});