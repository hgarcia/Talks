## Bad OO class

```javascript-c1
class Promo {

  constructor() {
    this._name = "";
    this._code = "";
    this._rules = [];
  }

  set code(value) {
    this._code = value;
  }

  set name(value) {
    this._name = value;
  }

  addRule(rule) {
    this._rules.push(rule);
  }

  toString() {
    return `${this._code} ${this._name} rules: ${this._rules.length}`;
  }
}

// create a new promo
const p = new Promo();

// set the code and name
p.code = "123";
p.name = "Promo"

//check it out
p.toString();
```