// 1.2
var reverseString = function (string) {
  var len    = string.length;
  var result = '';
  var i;

  for (i = len - 1; i >= 0; i -= 1) {
    result += string[i];
    console.log('result', result);
  }

  return result;
};

reverseString = function (string) {
  var len = string.length;
  if (len === 0) return string;
  return string[len - 1] + reverseString( string.slice(0, len - 1) );
};

// 1.5
var compress = function (sameCharacterString) {
  var len = sameCharacterString.length;
  var compressed;

  if (len === 0) return sameCharacterString;
  compressed = sameCharacterString[0] + len;
  return compressed.length <= len ? compressed : sameCharacterString;
};

var compression = function (string) {
  var len = string.length;
  if (len === 0) return string;

  var i = 0;
  while (string[i] === string[i + 1]) {
    i += 1;
  }

  return compress(string.slice(0, i + 1)) + compression(string.slice(i + 1));
};

// 1.7
// O(n ^ 2)
var createBooleanHash = function (matrix) {
  var numRows = matrix.length;
  var numCols = matrix[0].length;
  var hash = {};
  var value, i, j;

  for (i = 0; i < numRows; i += 1) {
    for (j = 0; j < numCols; j += 1) {
      value = matrix[i][j];
      hash['r' + i] = hash['r' + i] || value === 0;
      hash['c' + j] = hash['c' + j] || value === 0;
    }
  }

  return hash; // i.e. { r0: true, r1: false, c0: false } means row 0 has a zero in it
};

var transformMatrix = function (matrix) {
  var numRows  = matrix.length;
  var numCols  = matrix[0].length;
  var boolHash = createBooleanHash(matrix); // O(n ^ 2)
  var i, j;

  // O(n ^ 2)
  for (i = 0; i < numRows; i += 1) {
    for (j = 0; j < numCols; j += 1) {
      if (boolHash['r' + i] || boolHash['c' + j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};