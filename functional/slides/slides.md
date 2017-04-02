press C to clone and press P for presenter notes

/*split*/
# SOLID OO <span class="highlight">|></span> FUNCTIONAL


>- SOLID nos lleva a pequeñas clases con uno o dos metodos.
- Separación de data y comportamiento.
- Composición en lugar de herencia.
- Mas facil de mantener, extender y testear.

/*split*/
# una <span class="highlight">S</span>ola responsabilidad
#### single responsibility principle


>S: Evitar classes GOD (or DIOSES) ex: Manager clase.
expand

/*split*/
# abiert<span class="highlight">O</span>/cerrado
#### open/close principle

> O: Abierto para extender/cerrado para modificar.

/*split*/

  # substitución de <span class="highlight">L</span>iskovs
  #### liskovs substitution principle


> L: Un metodo que acepta una clase A debe trabajar con subclases de A

/*split*/

  # segregación de <span class="highlight">I</span>nterfaces
  #### interface segregation principle


> I: Interfaces que son largas y complejas deben separarse en mas chicas (ex: GOD)

/*split*/

  # inversión de <span class="highlight">D</span>ependencias
  #### dependency inversion principle  


> D: Dependemos en abstracciones y no en clases concreatas, o sea que esperamos que la dependencias implemente una interface X... Por extension nunca un 'new' adentro de una clase

/*split*/
# Qué tiene esto que ver con <span class="highlight">FP</span>?

> El argumento es que estos principios que consideramos buenos para desarrollar software en OO y que tenemos que "pensar" en implementarlos, ocurren naturalmente cuando empezamos a pensar de manera funcional.

/*split*/

# Promos

* Cada promo tiene un codigo unico
* La misma promo (codigo) tiene diferentes reglas
* Las reglas son chequeadas contra un ticket
* La primera regla que encontramos es la que usamos


> Nuestro sistema de venta de tickets tiene un sistema de promos que sigue las reglas siguientes.

/*split*/

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