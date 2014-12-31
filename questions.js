(function questions () {
  /*
   * Chapter 1
  */

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
})();