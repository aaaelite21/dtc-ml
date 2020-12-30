const assert = require("assert");
const Genes = require("../Lib/Genetic/Genes");

describe("#Genes", () => {
  describe("#Gene", () => {
    it("takes a value, min and max", () => {
      let g = new Genes.Gene(50, 0, 100);
      assert.strictEqual(g.value, 50);
      assert.strictEqual(g.min, 0);
      assert.strictEqual(g.max, 100);
    });
    describe("#mutateUniform", () => {
      it("sets the value to a random number between min and max (0-100)", () => {
        let g = new Genes.Gene(50, 0, 100);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
      it("sets the value to a random number between min and max (-50-50)", () => {
        let g = new Genes.Gene(0, -50, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
      it("sets the value to a random number between min and max (-100-0)", () => {
        let g = new Genes.Gene(-50, -100, 0);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
    });
    describe("#mutateBoundry", () => {
      it("set the value only the min and max", () => {
        let g = new Genes.Gene(0, -50, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          assert.strict(
            g.value === g.max || g.value === g.min,
            `value ${g.value} is not the min ${g.min} or the max ${g.max}`,
          );
        }
      });
      it("it selects the min", () => {
        let g = new Genes.Gene(0, -50, 50);
        let minRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.min) minRecorded = true;
          if (minRecorded) break;
        }
        assert(minRecorded === true);
      });
      it("it selects the max", () => {
        let g = new Genes.Gene(0, -50, 50);
        let maxRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.max) maxRecorded = true;
          if (maxRecorded) break;
        }
        assert(maxRecorded === true);
      });
    });
    describe("#mutate percent", () => {
      it("set the value to a random spot within += x percent of the starting value", () => {
        let g = new Genes.Gene(50, 0, 100);
        for (let i = 0; i < 1000; i++) {
          let start = 50;
          g.value = start;
          g.mutatePercent(10);
          assert.strict(
            g.value < start * 1.1 && g.value > start * 0.9,
            `value ${g.value} is not within +- 10% of the start ${start}`,
          );
        }
      });
      it("sets the calculated value to the max if the calculated value is above the max", () => {
        let g = new Genes.Gene(50, 0, 100);
        let start = 200;
        g.value = start;
        g.mutatePercent(5);
        assert.strictEqual(
          g.value,
          100,
          `value ${g.value} is not within the min and max of the gene ${g.min} ${g.max}`,
        );
      });
      it("sets the calculated value to the min if the calculated value is below the min", () => {
        let g = new Genes.Gene(50, 0, 100);
        let start = -200;
        g.value = start;
        g.mutatePercent(5);
        assert.strictEqual(
          g.value,
          0,
          `value ${g.value} is not within the min and max of the gene ${g.min} ${g.max}`,
        );
      });
    });
  });
  describe("#Int", () => {
    it("takes a value, min and max", () => {
      let g = new Genes.Int(50, 0, 100.1);
      assert.strictEqual(g.value, 50);
      assert.strictEqual(g.min, 0);
      assert.strictEqual(g.max, 100);
    });
    describe("#mutateUniform", () => {
      it("sets the value to a random number between min and max (0-100)", () => {
        let g = new Genes.Int(0, 50, 100.1);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
      it("sets the value to a random number between min and max (-50-50)", () => {
        let g = new Genes.Int(-50, 0, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
      it("sets the value to a random number between min and max (-100-0)", () => {
        let g = new Genes.Int(-100, 0, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            g.value <= g.max,
            `value ${g.value} is greater than max ${g.max}`,
          );
          assert.strict(
            g.value >= g.min,
            `value ${g.value} is less than min ${g.min}`,
          );
        }
      });
      it("only returns Int", () => {
        let g = new Genes.Int(-100, 0, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strict(
            Number.isInteger(g.value),
            `value ${g.value} is not an int`,
          );
        }
      });
    });
    describe("#mutateBoundry", () => {
      it("set the value only the min and max", () => {
        let g = new Genes.Int(50, 0, 100.1);
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          assert.strict(
            g.value === g.max || g.value === g.min,
            `value ${g.value} is not the min ${g.min} or the max ${g.max}`,
          );
        }
      });
      it("it selects the min", () => {
        let g = new Genes.Int(50, 0, 100.1);
        let minRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.min) minRecorded = true;
          if (minRecorded) break;
        }
        assert(minRecorded === true);
      });
      it("it selects the max", () => {
        let g = new Genes.Int(50, 0, 100.1);
        let maxRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.max) maxRecorded = true;
          if (maxRecorded) break;
        }
        assert(maxRecorded === true);
      });
    });
    describe("#mutate percent", () => {
      it("sets the value to an int", () => {
        let g = new Genes.Int(50, 0, 100);
        let start = 50;
        g.value = start;
        g.mutatePercent(10);
        assert.strict(
          Number.isInteger(g.value),
          `value ${g.value} is not an integer`,
        );
      });
      it("set the value to a random spot within += x percent of the starting value", () => {
        let g = new Genes.Int(50, 0, 100);
        for (let i = 0; i < 1000; i++) {
          let start = 50;
          g.value = start;
          g.mutatePercent(10);
          assert.strict(
            g.value <= start * 1.1 && g.value >= start * 0.9,
            `value ${g.value} is not within +- 10% of the start ${start}`,
          );
        }
      });
      it("sets the calculated value to the max if the calculated value is above the max", () => {
        let g = new Genes.Int(50, 0, 100);
        let start = 200;
        g.value = start;
        g.mutatePercent(5);
        assert.strictEqual(
          g.value,
          100,
          `value ${g.value} is not within the min and max of the gene ${g.min} ${g.max}`,
        );
      });
      it("sets the calculated value to the min if the calculated value is below the min", () => {
        let g = new Genes.Int(50, 0, 100);
        let start = -200;
        g.value = start;
        g.mutatePercent(5);
        assert.strictEqual(
          g.value,
          0,
          `value ${g.value} is not within the min and max of the gene ${g.min} ${g.max}`,
        );
      });
    });
  });
  describe("#bool", () => {
    it("takes a value, min and max", () => {
      let g = new Genes.Bool(50, 0, 100.1);
      assert.strictEqual(g.value, true);
      assert.strictEqual(g.min, 0);
      assert.strictEqual(g.max, 1);
    });
    describe("#mutateUniform", () => {
      it("only returns bool", () => {
        let g = new Genes.Bool(-100, 0, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutateUniform();
          assert.strictEqual(
            typeof g.value,
            "boolean",
            `value ${g.value} is not an boolean`,
          );
        }
      });
    });
    describe("#mutateBoundry", () => {
      it("set the value only the min and max", () => {
        let g = new Genes.Bool();
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          assert.strict(
            g.value === g.max || g.value === g.min,
            `value ${g.value} is not the min ${g.min} or the max ${g.max}`,
          );
        }
      });
      it("it selects the min", () => {
        let g = new Genes.Bool();
        let minRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.min) minRecorded = true;
          if (minRecorded) break;
        }
        assert(minRecorded === true);
      });
      it("it selects the max", () => {
        let g = new Genes.Bool();
        let maxRecorded = false;
        for (let i = 0; i < 1000; i++) {
          g.mutateBoundry();
          if (g.value === g.max) maxRecorded = true;
          if (maxRecorded) break;
        }
        assert(maxRecorded === true);
      });
    });
    describe("#mutatePercent", () => {
      it("only returns bool", () => {
        let g = new Genes.Bool(-100, 0, 50);
        for (let i = 0; i < 1000; i++) {
          g.mutatePercent();
          assert.strictEqual(
            typeof g.value,
            "boolean",
            `value ${g.value} is not an boolean`,
          );
        }
      });
    });
  });
});
