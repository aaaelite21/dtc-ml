# dtc-machiene-learning

A light weigh JS utility for basic and quick ML problems produced by [DownToCrypto](https://downtocrypto.com)

# Motovation

I was looking to create a simple ans easy to use utility for AI to aid in automated trading.

# Tech

Node JS palne and simple

#Install
```npm i dtc-ml```

# Features

At this point it is still in its infancy. As such it is simply an easy to use genetic optomization tool. More NL and deep learning is to come.

# Examples

## Genetic Optomization

### Gene Types

- GeneTypes.int: any real integer value
- GeneTypes.float: any real float value
- GeneTypes.bool: true or false

GeneTypes.int and GeneTypes.float have a default min and max of +/-10

### Mutation Types

- MutationTypes.uniform: sets the gene to a random number between the min and max inclusivly
- MutationTypes.boundry: sets the gene to the max or min at random
- MutationTypes.percent: changes the value to within +/- the specafied percent of the current value at random

### Putting it all together

Alaways start with

```
const {
  Population,
  MutationTypes,
  GeneTypes,
} = require("dtc-ml").Genetic;
```

Making the Organisms

```
const buildingblocks = [
{ type: GeneTypes.int, min: 0, max: 10 },
{ type: GeneTypes.int, min: 0, max: 10 },
];
```

Making the fitness test for the population

```
function FitnessTest(individual) {
  return individual[0].value * individual[1].value;
}
```

Making a population of 100 organisms out of the building blocks

```
const populationSize = 100;
let population = new Population(populationSize, buildingblocks, FitnessTest);
```

Randomizes all of the genes for a population

```
population.randomize();
```

Running the fitness test and score all individuals

```
population.runFitnessTests();
```

Cache any individuals to save time down the road. This is optional

```
population.saveFamilyTree();
```

Determin breeding pool based off individual scores

```
population.selection();
```

Breed next generation and determine what percentage of the top performers carry over to the next generation

```
population.breed(0.05);//top 5% stay till next generation
```

Mutate the population based on the selected method and percentage rate

```
population.mutate(MutationTypes.uniform, 0.05);
```

The "transitionToNextGeneration" method rolls selection, breed and mutate into 1 call.

```
population.transitionToNextGeneration(0, MutationTypes.uniform, 0.05);
```

Here is it all together with some periferals to record the findings

```
const {
  Population,
  MutationTypes,
  GeneTypes,
} = require("dtc-ml");

const buildingblocks = [
  { type: GeneTypes.int, min: 0, max: 10 },
  { type: GeneTypes.int, min: 0, max: 10 },
];

function FitnessTest(individual) {
  return individual[0].value * individual[1].value;
}

const populationSize = 100;

let population = new Population(populationSize, buildingblocks, FitnessTest);

population.randomize();

const generations = 10;

for (let i = 1; i <= generations; i++) {
  population.runFitnessTests();
  population.saveFamilyTree();
  if (i !== generations) {
    population.transitionToNextGeneration(0.1, MutationTypes.uniform, 0.05);
  }
}

console.log(population.getFittest());

```

The outshould be the below. Note there is some randomness involved so you may get a gene that has a value of 9. If you do just run it again.

```
Individual(2) [
  Int { min: 0, max: 10, value: 10 },
  Int { min: 0, max: 10, value: 10 },
  fitness: 100,
  id: 46724426
]
```

# Coming Soon

- Built in exit conditions for genetic learning
- "runGenerations" method to contain for loop internally to the population class
- Neurons
