const assert = require("assert");
const MutationTypes = require("../Lib/Genetic/MutationTypes");
const Population = require("../Lib/Genetic/Population");
const GeneTypes = require("../Lib/Genetic/GeneTypes");
const DefaultBuildingBlocks = [
  { type: GeneTypes.int },
  { type: GeneTypes.int },
];
describe("#Population", () => {
  describe("#constructor", () => {
    it("has an array of individuals equal to the number of individuals parameter", () => {
      let p = new Population();
      assert.strictEqual(p.individuals.length, 20);
    });
  });
  it("has an array of individuals equal to the number of individuals paramets ", () => {
    let p = new Population(10);
    assert.strictEqual(p.individuals.length, 10);
  });
  describe("#getFittest", () => {
    it("returns the fittest individual", () => {
      let p = new Population();
      p.individuals[5].fitness = 10;
      assert.strictEqual(
        p.getFittest().fitness,
        10,
        "Wrong max fitness score returned",
      );
    });
  });
  describe("#runFitnessTest", () => {
    it("runs the fitness test for its individuals", () => {
      let x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      assert.strictEqual(x, 10, "fitness test not run enough times");
    });
    it("sets all of the fitnesses to the returned value", () => {
      let x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      for (let index = 0; index < p.individuals.length; index++) {
        assert.strictEqual(
          p.individuals[index].fitness,
          index + 1,
          `fitness scores are incorrect: got ${
            p.individuals.fitness
          }, was expecting ${index + 1}`,
        );
      }
    });
    it("runs the fitness test for its individuals who do not have a fitness", () => {
      let x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.individuals[5].fitness = 1;
      p.runFitnessTests();
      assert.strictEqual(
        x,
        9,
        "fitness was not run teh correct number of times",
      );
    });
    it("runs the fitness test for its individuals who do not have a fitness allready recorded", () => {
      let x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.randomize();
      p.individuals[5].fitness = 1;
      p.individuals[4].fitness = 1;
      p.saveFamilyTree();
      p.individuals[5].fitness = null;
      p.individuals[4].fitness = null;
      p.runFitnessTests();

      assert.strictEqual(
        x,
        8,
        "fitness was not run the correct number of times",
      );
    });
    it("runs sets the fitness of the individuals to that which is allready recorded", () => {
      let x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.individuals[4].fitness = 99;
      p.saveFamilyTree();
      p.individuals[4].fitness = null;
      p.runFitnessTests();

      assert.strictEqual(
        p.individuals[4].fitness,
        99,
        "fitness of known individuals is not set",
      );
    });
  });
  describe("#runFitnessTestAsync", () => {
    it("runs the fitness test for its individuals all at once", async () => {
      let x = 0;
      let p = new Population(
        10,
        DefaultBuildingBlocks,
        async (indv, indx, res, rej) => {
          x++;
          res({ index: indx, score: x });
        },
      );
      await p.runFitnessTestsAsync();
      assert.strictEqual(x, 10, "fitness test not run enough times");
    });
    it("sets all fo the fitnesses to the returned value", async () => {
      let x = 0;
      let p = new Population(
        10,
        DefaultBuildingBlocks,
        async (indv, indx, res, rej) => {
          res({ index: indx, score: ++x });
        },
      );
      await p.runFitnessTestsAsync();
      for (let index = 0; index < p.individuals.length; index++) {
        assert.strictEqual(
          p.individuals[index].fitness,
          index + 1,
          `fitness scores are incorrect: got ${
            p.individuals.fitness
          }, was expecting ${index + 1}`,
        );
      }
    });
    it("runs the fitness test for its individuals who do not have a fitness", async () => {
      let x = 0;
      let p = new Population(
        10,
        DefaultBuildingBlocks,
        async (indv, indx, res, rej) => {
          res({ index: indx, score: ++x });
        },
      );
      p.individuals[5].fitness = 1;
      await p.runFitnessTestsAsync();
      assert.strictEqual(
        x,
        9,
        "fitness was not run teh correct number of times",
      );
    });
    it("runs the fitness test for its individuals who do not have a fitness allready recorded", async () => {
      let x = 0;
      let p = new Population(
        10,
        DefaultBuildingBlocks,
        async (indv, indx, res, rej) => {
          res({ index: indx, score: ++x });
        },
      );
      p.randomize();
      p.individuals[5].fitness = 1;
      p.individuals[4].fitness = 1;
      p.saveFamilyTree();
      p.individuals[5].fitness = null;
      p.individuals[4].fitness = null;
      await p.runFitnessTestsAsync();

      assert.strictEqual(
        x,
        8,
        "fitness was not run the correct number of times",
      );
    });
    it("runs sets the fitness of the individuals to that which is allready recorded", async () => {
      let x = 0;
      let p = new Population(
        10,
        DefaultBuildingBlocks,
        async (indv, indx, res, rej) => {
          res({ index: indx, score: ++x });
        },
      );
      p.individuals[4].fitness = 99;
      p.saveFamilyTree();
      p.individuals[4].fitness = null;
      await p.runFitnessTestsAsync();

      assert.strictEqual(
        p.individuals[4].fitness,
        99,
        "fitness of known individuals is not set",
      );
    });
  });
  describe("#selection", () => {
    it("creates an array of the indexes of the individules seeded by fitness", () => {
      x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      p.selection();
      assert.strictEqual(p.breedingPool.length, 100);
    });
    it("creates an array of the indexes of the individules seeded by fitness 2x the size of the pop", () => {
      x = 0;
      let p = new Population(200, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      p.selection();
      assert.strictEqual(p.breedingPool.length, 400);
    });
    it("clears the breeding pool every time", () => {
      x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      p.selection();
      p.selection();
      assert.strictEqual(p.breedingPool.length, 100);
    });
  });
  describe("#mutation", () => {
    it("mutates a number of individuals pourponate to the mutation rate", () => {
      let p = new Population();
      let old = [];
      p.individuals.forEach((indv) => {
        old.push([indv[0].value, indv[1].value]);
      });
      p.mutate(MutationTypes.uniform, 1); //mutate all
      p.individuals.forEach((indv, i) => {
        assert(
          indv[0].value !== old[i][0] || indv[1].value !== old[i][1],
          "no mutations were run",
        );
      });
    });
  });
  describe("#breed", () => {
    it("#keeps the top 10% of individuals", () => {
      x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      p.runFitnessTests();
      let temp = p.getFittest();
      p.selection();
      p.breed();
      assert.deepStrictEqual(
        temp,
        p.individuals[0],
        "the top 10% were not preserved",
      );
    });
    it("#keeps the population the same size", () => {
      x = 0;
      let p = new Population(10, DefaultBuildingBlocks, () => {
        return ++x;
      });
      let target = p.individuals.length;
      p.runFitnessTests();
      p.selection();
      p.breed();
      assert.deepStrictEqual(
        p.individuals.length,
        target,
        "the population size is not the same after breeding",
      );
    });
  });
  describe("#getBiodiversity", () => {
    it("returns the number of different individuals over the total", () => {
      let p = new Population(20);
      p.randomize();
      assert.strictEqual(p.getBioDiversity(), 1);
    });
  });
  describe("#ancestors list", () => {
    it("starts out as an empty list", () => {
      let p = new Population(5);
      assert.strictEqual(p.ancestors.size, 0);
    });
    it("populates the list with only the individuals with scores", () => {
      let p = new Population();
      p.individuals[1].fitness = 4;
      p.saveFamilyTree();
      assert.strictEqual(p.ancestors.size, 1);
    });
  });
});
