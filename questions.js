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

  };
})();