(function chapter1 () {
  // 1.1 - With use of hash data structure
  var uniqueCharacters = function (str) {
    // Create a hash table
    // Loop through characters in str and add to hash table
      // If it doesn't already exist in hash table, set value to true
      // Else return false
    // Reaching here implies all characters are unique; return true
    // Time Complexity: O(n)

    var hash = {};
    var length = str.length;
    var i;

    for (i = 0; i < length; i += 1) {
      if ( !hash[ str[i] ] ) {
        hash[ str[i] ] = true;
      } else {
        return false;
      }
    }
    return true;
  };

  // 1.1 - Without use of additional data structure
  uniqueCharacters = function (str) {
    // Set up outer loop to loop through each character of str, starting at i
      // Set up inner loop to loop through each character of str, starting at i + 1
        // If str[i] is equal to str[i + 1], then return false
    // Reaching here implies all characters are unique; return true
    // Time Complexity: O(n^2)

    var len = str.length;
    var i, j;

    for (i = 0; i < len; i += 1) {
      for (j = i + 1; j < len; j += 1) {
        if ( str[i] === str[j] ) {
          return false;
        }
      }
    }
    return true;
  };

  // 1.2
  var reverseString = function (str) {
    // Time Complexity: O(n)
    // Space Complexity: O(n)

    var len    = str.length;
    var result = '';
    var i;

    for (i = len - 1; i >= 0; i -= 1) {
      result += str[i];
    }
    return result;

    // Below code would be possible if strings were mutable in JavaScript
    // var len   = str.length;
    // var start = 0;
    // var end   = len - 1;
    // var temp;

    // while (start <= end) {
    //   // swap
    //   temp       = str[start];
    //   str[start] = str[end];
    //   str[end]   = temp;

    //   start += 1;
    //   end   -= 1;
    // }
    // return str;
  };

  // 1.3
  var isPermutation = function (str1, str2) {
    // Create hash for str1, where key is character and value is number of times character appears
    // Loop through each character in str2
      // If character doesn't appear in hash, return false
      // Else decrement value in hash by 1
    // Loop through hash and check if all values are 0
      // If no, return false
    // Reaching here means to return true
    // Time Complexity: O(n)

    var hash = {};
    var s2Len = str2.length;
    var i, prop;

    // Build hash
    str1.split('').forEach(function (character) {
      if ( hash[character] ) {
        hash[character] += 1;
      } else {
        hash[character] = 1;
      }
    });

    for (i = 0; i < s2Len; i += 1) {
      if ( hash[ str2[i] ] ) {
        hash[ str2[i] ] -= 1;
      } else {
        return false;
      }
    }

    // All values in hash should be 0 if strings are permutations of each other
    for (prop in hash) {
      if ( hash[prop] !== 0) {
        return false;
      }
    }

    return true;
  };

  // 1.4
  var replaceInString = function (charToReplace, replaceWith, str) {
    // Time Complexity: O(n)
    var len    = str.length;
    var result = '';

    str.split('').forEach(function (character) {
      result += (character === charToReplace ? replaceWith : character);
    });

    return result;
  };

  var bound = replaceInString.bind(null, ' ', '%20');

  // 1.5
  var stringCompression = function (str) {
    // Time Complexity: O(n)
    var len = str.length;
    if ( len < 2 ) { return str; }

    var result           = '';
    var currentChar      = str[0];
    var currentCharCount = 1;
    var resultLen, i;

    for (i = 1; i < len; i += 1) {
      if ( str[i] === currentChar ) {
        currentCharCount += 1;
      } else {
        result += currentChar + currentCharCount;
        currentChar      = str[i];
        currentCharCount = 1;
      }
    }
    result += currentChar + currentCharCount;

    return (result.length >= len ? str : result);
  };

  // 1.6 - non in place solution
  var rotateClockwise90Degrees = function (matrix) {
    // assume matrix is N x N
    var n      = matrix.length;
    var result = [];
    var i, j, k;

    for (k = 0; k < n; k += 1) {
      result.push( [] );
    }

    for (i = 0; i < n; i += 1) {
      for (j = 0; j < n; j += 1) {
        result[i][j] = matrix[n - j - 1][i];
      }
    }

    return result;
  };

  // 1.6 - in place solution
  rotateClockwise90Degrees = function (matrix) {

  };

  // 1.7
  var blankOut = function (matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    var rowsWithZero = {};
    var colsWithZero = {};
    var i, j;

    // The idea here is to create a hash with rowsWithZero and colsWithZero
    for (i = 0; i < rows; i += 1) {
      for (j = 0; j < cols; j += 1) {
        if ( matrix[i][j] === 0 ) {
          rowsWithZero[i] = true;
          colsWithZero[j] = true;
        }
      }
    }

    for (i = 0; i < rows; i += 1) {
      for (j = 0; j < cols; j += 1) {
        if ( rowsWithZero[i] || colsWithZero[j] ) {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  };

  // 1.8
  var isRotation = function (str1, str2) {
    var len1 = str1.length;
    var len2 = str2.length;

    if ( len1 !== len2 ) {
      return false;
    }

    var inner = function (str1, str2, count) {
      if ( count >= len1 ) {
        return false;
      } else if ( str1 === str2 ) {
        return true;
      } else {
        count += 1;
        return inner( str1, str2.slice(1) + str2.slice(0, 1), count );
      }
    };

    return inner( str1, str2, 0 );
  };

  // Improved implementation of 1.8
  isRotation = function (str1, str2) {
    var len1 = str1.length;
    var len2 = str2.length;

    if ( len1 !== len2 ) {
      return false;
    }

    // The key here is that if str2 is a rotation of str1, then concatenating
    // str2 twice must have str1 as a substring within it.
    return (str2 + str2).indexOf(str1) !== -1;
  };
})();