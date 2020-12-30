const Individual = require("../Lib/Genetic/Individual");
const Genes = require("../Lib/Genetic/Genes");
const assert = require("assert");
const GeneTypes = require("../Lib/Genetic/GeneTypes");

describe("#Individual", () => {
  describe("#constructor", () => {
    it("defaults to an array of 2 genes", () => {
      let indv = new Individual();
      assert.strictEqual(
        indv.length,
        2,
        "not the right number of genes for default",
      );
    });
    it("default genes are ints", () => {
      let indv = new Individual();
      assert(indv[0] instanceof Genes.Int, "first gene is not an int");
      assert(indv[1] instanceof Genes.Int, "second gene is not an int");
    });
    it("default genes mins are 0", () => {
      let indv = new Individual();
      assert.strictEqual(indv[0].min, 0, "first gene min is not 0");
      assert.strictEqual(indv[1].min, 0, "second gene min is not 0");
    });
    it("default genes maxes are 250", () => {
      let indv = new Individual();
      assert.strictEqual(indv[0].max, 250, "first gene max is not 250");
      assert.strictEqual(indv[1].max, 250, "second gene max is not 250");
    });
    it("will take an array of object of the float type", () => {
      let indv = new Individual([{ type: GeneTypes.float }]);
      assert(
        indv[0] instanceof Genes.Float,
        "the individual should have a Float Gene",
      );
    });
    it("will take an array of object of the bool type", () => {
      let indv = new Individual([{ type: GeneTypes.bool }]);
      assert(
        indv[0] instanceof Genes.Bool,
        "the individual should have a Bool Gene",
      );
    });
    it("will take an array of object of the int type", () => {
      let indv = new Individual([{ type: GeneTypes.int }]);
      assert(
        indv[0] instanceof Genes.Int,
        "the individual should have a Int Gene",
      );
    });
    it("will take an array of object and make only that many genes", () => {
      let indv = new Individual([{ type: GeneTypes.int }]);
      assert.strictEqual(
        indv.length,
        1,
        "the individual should have 1 Int Gene",
      );
    });
    it("will default a float to a min of 0", () => {
      let indv = new Individual([{ type: GeneTypes.float }]);
      assert.strictEqual(indv[0].min, 0, "default min for floats is not 0");
    });
    it("will default a float to a max of 250", () => {
      let indv = new Individual([{ type: GeneTypes.float }]);
      assert.strictEqual(indv[0].max, 250, "default min for floats is not 250");
    });
    it("will accept the specafied min value for a float", () => {
      let indv = new Individual([{ type: GeneTypes.float, min: -50, max: 50 }]);
      assert.strictEqual(
        indv[0].min,
        -50,
        "default min for floats is not taking input",
      );
    });
    it("will accept the specafied max value for a float", () => {
      let indv = new Individual([{ type: GeneTypes.float, min: -50, max: 50 }]);
      assert.strictEqual(
        indv[0].max,
        50,
        "default max for floats is not taking input",
      );
    });
  });
  describe("setid", () => {
    it("sets the id for the indv", () => {
      let indv = new Individual();
      indv.setId();
      assert(indv.id !== null, "id did not generate");
    });
  });
});
