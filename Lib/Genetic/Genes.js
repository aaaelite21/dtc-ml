class Gene {
  constructor(value, min, max) {
    this.min = min;
    this.max = max;
    this.value = value;
  }

  mutateUniform() {
    this.value = Math.random() * (this.max - this.min) + this.min;
  }

  mutateBoundry() {
    this.value = Math.random() >= 0.5 ? this.min : this.max;
  }

  mutatePercent(_percent = 5) {
    let min = this.value * (1 - _percent / 100),
      max = this.value * (1 + _percent / 100);
    let val = Math.random() * (max - min) + min;
    if (val > this.max) val = this.max;
    else if (val < this.min) val = this.min;

    this.value = val;
  }
}

class Int extends Gene {
  constructor(value = 0, min = 0, max = 100) {
    super(Math.round(value), Math.round(min), Math.round(max));
  }

  mutateUniform() {
    this.value = Math.round(Math.random() * (this.max - this.min) + this.min);
  }

  mutatePercent(_percent = 5) {
    let min = this.value * (1 - _percent / 100),
      max = this.value * (1 + _percent / 100);
    let val = Math.floor(Math.random() * (max - min + 1) + min);
    if (val > this.max) val = this.max;
    else if (val < this.min) val = this.min;

    this.value = val;
  }
}

class Float extends Gene {
  constructor(value = 0, min = 0, max = 100) {
    super(value, min, max);
  }
}

class Bool extends Gene {
  constructor(value = true) {
    value = value > 0 ? true : false;
    super(value, 0, 1);
  }

  mutateUniform() {
    this.value = Math.random() >= 0.5 ? true : false;
  }

  mutatePercent(_percent = 5) {
    this.mutateUniform();
  }
}

module.exports = {
  Gene: Gene,
  Int: Int,
  Float: Float,
  Bool: Bool,
};
