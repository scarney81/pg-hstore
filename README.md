node-hstore
===========

A node package for serializing and deserializing JSON data to hstore format

## Install node-hstore

     ```$ npm install node-hstore```

## Usage
### stringify

     var hstore = require('node-hstore');
     var source = { foo: "oof", bar: "rab", baz: "zab" };
     hstore.stringify(source, function(result) {
       ...
       // result = '"foo"=>"oof", "bar"=>"rab", "baz"=>"zab"'
       ...
     });

### parse

     var hstore = require('node-hstore');
     var source = '"foo"=>"oof", "bar"=>"rab", "baz"=>"zab"';
     hstore.stringify(source, function(result) {
       ...
       // result = { foo: "oof", bar: "rab", baz: "zab" } 
       ...
     });