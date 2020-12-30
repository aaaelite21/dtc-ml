const Genes = require("./Genes");
const GeneTypes = require("./GeneTypes");

class Individual extends Array {
  constructor(
    buildingblocks = [{ type: GeneTypes.int }, { type: GeneTypes.int }],
  ) {
    super();
    for (let i = 0; i < buildingblocks.length; i++) {
      switch (buildingblocks[i].type) {
        case GeneTypes.float:
          this.push(
            new Genes.Float(
              buildingblocks[i].value || 0,
              buildingblocks[i].min || 0,
              buildingblocks[i].max || 250,
            ),
          );
          break;
        case GeneTypes.bool:
          this.push(new Genes.Bool(buildingblocks[i].value || true));
          break;
        case GeneTypes.int:
        default:
          this.push(
            new Genes.Int(
              buildingblocks[i].value || 0,
              buildingblocks[i].min || 0,
              buildingblocks[i].max || 250,
            ),
          );
          break;
      }
    }
    this.fitness = null;
    this.id = null;
  }

  setId() {
    if (this.id === null) {
      let s = "";
      for (let i = 0; i < this.length; i++) {
        if (i !== 0) s += "*";
        s += `${this[i].value}`;
      }
      this.id = s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    }
  }
}

module.exports = Individual;
