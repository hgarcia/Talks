class User {
  constructor(name, weight, height) {
    this._name = name;
    this._weight = weight;
    this._height = height;
    this._bmiRequested = false;
  }

  calculateBmi(bmiCalculator) {
    this._bmiRequested = true;
    return bmiCalculator.calculate(this._weight, this._height);
  }
}

class BmiCalculator {
  calculate() {
    throw new Error("I'm evil");
  }
}

const u = new User("HG", 180, 47);

console.log(u);

try {
  u.calculateBmi(new BmiCalculator());
} catch (e) {
  console.log(e);
}

console.log(u);