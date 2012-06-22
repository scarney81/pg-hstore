var sanitize_input = function(input) {
  // http://www.postgresql.org/docs/9.0/static/sql-syntax-lexical.html [4.1.2.1-4.1.2.2]
  // single quotes (') must be replaced with double single quotes ('')
  input = input.replace(/'/, '\'\'');
  // backslashes (\) must be replaced with double backslashes (\\)
  input = input.replace(/\\/, '\\\\');
  return input;
};

var to_string = function(input) {
  switch(typeof input) {
    case 'boolean':
    case 'number':
      return String(input);
    case 'string':
      return sanitize_input(input);
    default:
      return '';
  }
};

module.exports = {
  stringify: function (data, callback) {
    var hstore = Object.keys(data).map(function (key) {
      return '"'+key+'"=>"'+to_string(data[key])+'"';
    });
    callback(hstore.join());
  },

  parse: function(value, callback) {
    var result = {};
    var hstore = value.split(',').forEach(function(pair) {
      var split = pair.split('=>');
      var key = split[0].replace(/"/g, '').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      var value = split[1].replace(/"/g, '');
      result[key] = value;
    });
    callback(result);
  }
};