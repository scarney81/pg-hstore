var sanitize_input = function(input) {
  // http://www.postgresql.org/docs/9.0/static/sql-syntax-lexical.html [4.1.2.1-4.1.2.2]
  // single quotes (') must be replaced with double single quotes ('')
  input = input.replace(/'/g, '\'\'');
  // backslashes (\) must be replaced with double backslashes (\\)
  input = input.replace(/\\/g, '\\\\');
  // double quotes (") must be replaced with escaped quotes (\\")
  input = input.replace(/"/g, '\\"');
  // colons (:) must be replaced with escaped colons (\\:)
  input = input.replace(/:/g, '\\:');
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
      if (data[key] === null) {
        return '"'+to_string(key)+'"=>NULL';
      } else {
        return '"'+to_string(key)+'"=>"'+to_string(data[key])+'"';
      }
    });
    var joined = hstore.join();
    if (!callback || callback === null) return joined;
    callback(joined);
  },

  parse: function(value, callback) {
    var result = {},
        r = /(["])(?:\\\1|.)*?\1/g,
        matches = value.match(r),
        i,
        l,
        clean = function (value) {
            // Remove leading double quotes
            value = value.replace(/^\"|\"$/g, "");
            // Unescape quotes
            return value.replace(/\\"/g, "\"");
        };

    for (i = 0, l = matches.length; i < l; i+= 2) {
        result[clean(matches[i])] = clean(matches[i + 1]);
    }
    if (!callback || callback === null) return result;
    callback(result);
  }
};
