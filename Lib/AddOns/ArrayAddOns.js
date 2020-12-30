if (!Array.prototype.less) {
  Array.prototype.less = function (arr) {
    var a = [],
      diff = [];
    if (arr.length > 0) {
      //todo handle type of array
      switch (typeof arr[0]) {
        default:
          break;
      }

      for (var i = 0; i < this.length; i++) {
        a[this[i]] = true;
      }
      for (var i = 0; i < arr.length; i++) {
        if (a[arr[i]]) {
          delete a[arr[i]];
        } else {
          a[arr[i]] = true;
        }
      }

      Object.keys(a).forEach((k) => {
        diff.push(k);
      });
    } else {
      diff = this;
    }
    return diff;
  };
}

if (!Array.prototype.rms) {
  Array.prototype.rms = function () {
    //start RMS
    let array = this;
    let total = array.sum(),
      mean = total / array.length,
      squareTotal = 0;
    array.forEach((value) => {
      squareTotal += Math.pow(value - mean, 2);
    });

    let squaredMean = squareTotal / array.length;
    let rms = Math.sqrt(squaredMean);
    //end RMS
    return rms;
  };
}

if (!Array.prototype.bbands) {
  Array.prototype.bbands = function (stdv = 2) {
    //start RMS
    let array = this;
    let total = array.sum(),
      mean = total / array.length,
      squareTotal = 0;
    array.forEach((value) => {
      squareTotal += Math.pow(value - mean, 2);
    });

    let squaredMean = squareTotal / array.length;
    let rms = Math.sqrt(squaredMean);
    //end RMS
    return {
      upperLimit: mean + 2 * rms,
      mean: mean,
      lowerLimit: mean + -2 * rms,
    };
  };
}

if (!Array.prototype.sum) {
  /**
   *
   * @param {Array of Numbers} array
   */
  Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
  };
}

if (!Array.prototype.average) {
  /**
   *
   * @param {Array of Numbers} array
   */
  Array.prototype.average = function () {
    return this.sum() / this.length;
  };
}

if (!Array.prototype.indexOfMax) {
  Array.prototype.indexOfMax = function () {
    if (this.length === 0) {
      return -1;
    }

    var max = this[0];
    var maxIndex = 0;

    for (var i = 1; i < this.length; i++) {
      if (this[i] > max) {
        maxIndex = i;
        max = this[i];
      }
    }

    return maxIndex;
  };
}

if (!Array.prototype.nthLargest) {
  Array.prototype.nthLargest = function (nth = 1) {
    let ret = 0;
    if (nth <= this.length) {
      let arr = [...this];
      arr.sort((a, b) => b - a);
      ret = arr[nth - 1];
    }
    return ret;
  };
}
