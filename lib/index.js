var sanitize_input = function(input, skipSanitization) {
  if (skipSanitization) {
    return input;
  }
  // http://www.postgresql.org/docs/9.0/static/sql-syntax-lexical.html [4.1.2.1-4.1.2.2]
  // single quotes (') must be replaced with double single quotes ('')
  input = input.replace(/'/g, '\'\'');
  // backslashes (\) must be replaced with double backslashes (\\)
  input = input.replace(/\\/g, '\\\\');
  // double quotes (") must be replaced with escaped quotes (\\")
  input = input.replace(/"/g, '\\"');
  return input;
};

var to_string = function(input, skipSanitization) {
  switch(typeof input) {
    case 'boolean':
    case 'number':
      return String(input);
    case 'string':
      return sanitize_input(input, skipSanitization);
    default:
      return '';
  }
};

module.exports = {
  stringify: function (data, callback, skipSanitization) {
    var hstore = Object.keys(data).map(function (key) {
      if (data[key] === null) {
        return '"'+to_string(key, skipSanitization)+'"=>NULL';
      } else {
        return '"'+to_string(key, skipSanitization)+'"=>"'+to_string(data[key], skipSanitization)+'"';
      }
    });
    var joined = hstore.join();
    if (!callback || callback === null) return joined;
    callback(joined);
  },

  parse: function(value, callback) {
    var result = {};
    var ke = value.length,
      vs = value.length,
      ve = value.length,
      key, val;
    var buf = '';
    var i = value.length;
    //work backwards through string
    while (i > -1) {
      buf = value.slice(i - 2, i);
      if (buf == '=>' || i === 0) {
        vs = i;
        ve = (value.lastIndexOf(',') == -1) ? value.length : value.lastIndexOf(',');
        if (i === 0) {
          ke = value.indexOf('=>');
          ve = -1;
        }
        if (val) {
          key = value.slice(ve + 1, ke).trim().slice(1, - 1);
          value = value.slice(0, ve);
          result[key] = val;
        }
        val = value.slice(vs, value.length).trim().slice(1, - 1);
        ke = i - 2;
      }
      i--;
    }
    if (!callback || callback === null) return result;
    callback(result);
  }
};
