const MutationTypes = require("./MutationTypes");
const Individual = require("./Individual");
const GeneTypes = require("./GeneTypes");
require("../AddOns/ArrayAddOns");

class Population {
  constructor(
    _numberOfIndividuals = 20,
    _buildingblocks = [{ type: GeneTypes.int }, { type: GeneTypes.int }],
    _fitnessTetst = () => {
      return 1;
    },
  ) {
    this.individuals = [];
    this.breedingPool = [];
    this.fitnessTest = _fitnessTetst;
    this.buildingblocks = _buildingblocks;
    this.ancestors = new Map();
    for (let i = 0; i < _numberOfIndividuals; i++) {
      this.individuals.push(new Individual(this.buildingblocks));
    }
  }

  getFittest() {
    let max = -Infinity,
      indexOfMax = 0;
    this.individuals.forEach((ind, indx) => {
      if (ind.fitness > max) {
        max = ind.fitness;
        indexOfMax = indx;
      }
    });
    return this.individuals[indexOfMax];
  }

  runFitnessTests() {
    this.individuals.forEach((indv, index) => {
      this.checkIfInAncestors(index);
      if (indv.fitness === null) {
        this.individuals[index].fitness = this.fitnessTest(indv);
      }
    });
  }

  async runFitnessTestsAsync(_batchsize = this.individuals.length) {
    do {
      let promises = [];
      let i = 0;
      while (promises.length < _batchsize && i < this.individuals.length) {
        this.checkIfInAncestors(i);

        if (this.individuals[i].fitness === null) {
          let p = new Promise((resolve, reject) => {
            try {
              this.fitnessTest(this.individuals[i], i, resolve, reject);
            } catch (e) {
              reject("Error running fitness test: " + e);
            }
          });
          promises.push(p);
        }
        i++;
      }

      await Promise.all(promises)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            this.individuals[data[i].index].fitness = data[i].score;
          }
        })
        .catch((ex) => {
          console.log("Error in async fitness test: " + ex);
        });
    } while (this.individuals.map((indv) => indv.fitness).indexOf(null) !== -1);
  }

  selection() {
    this.breedingPool = [];
    let fitnesses = this.individuals.map((indv) => indv.fitness);
    let sum = fitnesses.sum();

    let breedingpoolsize =
      this.individuals.length > 50 ? this.individuals.length * 2 : 100;

    this.individuals.forEach((indv, index) => {
      let count = Math.round((breedingpoolsize * indv.fitness) / sum);
      for (let i = 0; i < count; i++) {
        this.breedingPool.push(index);
      }
    });
  }

  breed(carryover = 0.1) {
    if (this.breedingPool.length > 1) {
      //initizlize replacement population
      let temp = [];

      let individualsByFitness = [...this.individuals];
      individualsByFitness.sort((a, b) => b.fitness - a.fitness);

      //top % are saved
      for (let i = 0; i < Math.ceil(this.individuals.length * carryover); i++) {
        temp.push(individualsByFitness[i]);
      }

      //crossover breed the rest
      while (temp.length < this.individuals.length) {
        let offspring1 = new Individual(this.buildingblocks);
        let offspring2 = new Individual(this.buildingblocks);

        //randomly select parent 1
        let parent1Index = this.breedingPool[
          Math.floor(Math.random() * this.breedingPool.length)
        ];
        let parent1 = this.individuals[parent1Index];

        //randomly select parent 1 with replacement
        let parent2Index;
        do {
          parent2Index = this.breedingPool[
            Math.floor(Math.random() * this.breedingPool.length)
          ];
        } while (parent2Index !== parent1Index);
        let parent2 = this.individuals[parent2Index];

        //select crossover point & random TODO: two points to get not split at the midline
        let xOverPoint = Math.floor(Math.random() * (parent1.length - 1));
        for (let i = 0; i < parent1.length; i++) {
          if (i <= xOverPoint) {
            offspring1[i] = Object.assign(offspring1[i], parent1[i]);
            offspring2[i] = Object.assign(offspring2[i], parent2[i]);
          } else {
            offspring1[i] = Object.assign(offspring1[i], parent2[i]);
            offspring2[i] = Object.assign(offspring2[i], parent1[i]);
          }
        }
        temp.push(offspring1);
        if (temp.length < this.individuals.length) temp.push(offspring2);
      }

      //set repalcement population to actual population
      this.individuals = temp;
    }
  }

  mutate(_method = MutationTypes.uniform, _rate = 0.1, _input = 5) {
    for (let i = 0; i < this.individuals.length; i++) {
      let doMutate = Math.random() < _rate;
      if (doMutate && this.individuals[i].fitness === null) {
        let gene = Math.floor(Math.random() * this.individuals[i].length);
        switch (_method) {
          case MutationTypes.boundry:
            this.individuals[i][gene].mutateBoundry();
            break;
          case MutationTypes.percent:
            this.individuals[i][gene].mutatePercent(_input);
            break;
          case MutationTypes.uniform:
          default:
            this.individuals[i][gene].mutateUniform();
            break;
        }
      }
    }
  }

  getBioDiversity() {
    let map = new Map();
    for (let i = 0; i < this.individuals.length; i++) {
      if (this.individuals[i].id === null) {
        this.individuals[i].setId();
      }
      if (!map.has(this.individuals[i].id)) map.set(this.individuals[i].id, i);
    }
    return map.size / this.individuals.length;
  }

  saveFamilyTree() {
    for (let i = 0; i < this.individuals.length; i++) {
      this.individuals[i].setId();
      if (this.individuals[i].fitness !== null) {
        if (!this.ancestors.has(this.individuals[i].id))
          this.ancestors.set(this.individuals[i].id, {
            fitness: this.individuals[i].fitness,
            genes: this.individuals[i].map((gene) => gene.value),
          });
      }
    }
  }

  checkIfInAncestors(index) {
    if (this.ancestors.has(this.individuals[index].id)) {
      this.individuals[index].fitness = this.ancestors.get(
        this.individuals[index].id,
      ).fitness;
    }
  }

  randomize() {
    for (let i = 0; i < this.individuals.length; i++) {
      for (let j = 0; j < this.individuals[i].length; j++) {
        this.individuals[i][j].mutateUniform();
      }
    }
  }

  transitionToNextGeneration(
    carryOver,
    mutationType,
    mutationRate,
    optionalMutationSetting = 0.05,
  ) {
    this.selection();
    this.breed(carryOver);
    this.mutate(mutationType, mutationRate, optionalMutationSetting);
  }
}

module.exports = Population;
