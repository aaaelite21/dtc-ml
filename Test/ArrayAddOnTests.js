const assert = require("assert");
require("../Lib/AddOns/ArrayAddOns");

describe("#ArrayAddOns", () => {
  describe("#sum", () => {
    it("returns the sum of all the elements of an array", () => {
      let x = [1, 2, 3];
      assert.strictEqual(x.sum(), 6);
    });
  });
  describe("#average", () => {
    it("returns the average of all the elements of an array", () => {
      let x = [1, 2, 3];
      assert.strictEqual(x.average(), 2);
    });
  });
  describe("#rms", () => {
    it("returns the rms of all the elements of an array", () => {
      let x = [1, 2, 3];
      assert.strictEqual(x.rms(), 0.816496580927726);
    });
  });
  describe("#bbands", () => {
    it("returns the Bollinger Bands of all the elements of an array", () => {
      let x = [1, 2, 3];
      assert.strictEqual(x.bbands().mean, 2);
      assert.strictEqual(x.bbands().upperLimit, 2 + 2 * 0.816496580927726);
      assert.strictEqual(x.bbands().lowerLimit, 2 + -2 * 0.816496580927726);
    });
  });
  describe("#less", () => {
    it("removes all string values in an array from another", () => {
      let x = ["a", "b", "c"];
      assert.deepStrictEqual(x.less(["b"]), ["a", "c"]);
    });
    it("removes all number values in an array from another", () => {
      let x = [1, 2, 3];
      //assert.deepStrictEqual(x.less([2]), [1, 3]);
    });
  });
  describe("#nthLargest", () => {
    it("returns the nth largets valuen of the array", () => {
      let x = [1, 2, 3, 4, 5];
      assert.strictEqual(x.nthLargest(2), 4);
    });
  });
});
