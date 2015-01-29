(function chapter18 () {
  /*
   * Chapter 18: Hard
  */

  // 18.4
  var numTwos = function (num) {
    var string = '';
    var i;

    for (i = 0; i <= num; i += 1) {
      string += '' + i;
    }

    return string
      .split('')
      .reduce(function (a, c) {
        return c === '2' ? a + 1 : a;
      }, 0);
  };
})();