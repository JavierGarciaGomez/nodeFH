// l16 const var let

var variable = "variable";
console.log("variable", variable);
if (true) {
  var variable = "variable en if";
}
console.log(variable);

let nombre = "nombre";
console.log(nombre);
if (true) {
  let nombre = "nombre en if";
  console.log(nombre);
}
console.log(nombre);

const constante = "constante";
console.log(constante);
if (true) {
  const constante = "constante en if";
  console.log(constante);
}
console.log(constante);
console.log(nombre, variable, constante);

console.log("*****************17 template literals***********");
const template = `hola, mi nombre es ${nombre}`;
console.log(template);

console.log("*****************18 destructuración de objetos***********");

const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "regeneración",
  getNombre() {
    return `El nombre de este gallo es: ${this.nombre} ${this.apellido}`;
  },
};

const batman = {
  nombre: "Bruce",
  apellido: "Wayne",
  poder: "riqueza",
};

console.log(deadpool.getNombre());

let { getNombre, apellido } = deadpool;
console.log(getNombre());
console.log(apellido);

function printHero(hero) {
  const { nombre, apellido, poder, edad } = hero;
  return `hola, soy ${nombre} y mi poder es ${poder}, mi apellido es ${apellido}`;
}

console.log(printHero(deadpool));
console.log(printHero(batman));

console.log("++++Destructurando arrays++++");
const heroes = ["Batman", "Superman", "Spiderman"];
let [primero, segundo, tercero] = heroes;

console.log(primero);

console.log("*****************19 arrow functions ***********");

const sumar = (a, b) => a + b;
console.log(sumar(4, 3));

console.log("*****************20 callbacks ***********");
setTimeout(function () {
  console.log("Hola Mundo");
}, 1000);

const getUserById = (id, callback) => {
  const user = {
    id,
    nombre: "Javier",
  };

  // callback
  setTimeout(() => {
    callback(user.nombre);
  }, 1500);
};

getUserById(2, (nombre) => {
  console.log(`Hello, im a Callback, and the user name is: ${nombre}`);
});

console.log(
  "*****************21 problemas comunes con los callbacks ***********"
);

const empleados = [
  {
    id: 1,
    nombre: "Fernando",
  },
  {
    id: 2,
    nombre: "Linda",
  },
  {
    id: 3,
    nombre: "Karen",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre;

  if (empleado) {
    callback(null, empleado);
  } else {
    callback(`Empleado con id ${id} no existe`);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((s) => s.id === id)?.salario;

  if (salario) {
    callback(null, salario);
  } else {
    callback(`No existe salario para el id ${id}`);
  }
};

let id = 2;

getEmpleado(id, (err, empleado) => {
  if (err) {
    console.log("ERROR!");
    return console.log(err);
  }

  getSalario(id, (err, salario) => {
    if (err) {
      return console.log(err);
    }

    console.log("El empleado:", empleado, "tiene un salario de:", salario);
  });
});

console.log("*****************23 promesas ***********");

const getEmpleado2 = (id) => {
  console.log("entrando a getEmpleado2");
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
};

const getSalario2 = () => {
  console.log("entrando a getSalario2");
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario ? resolve(salario) : reject(`No existe salario con id ${id}`);
  });
};

id = 3;

// getEmpleado(id)
//     .then( empleado => console.log( empleado ) )
//     .catch( err => console.log(err) );

// getSalario(id)
//     .then( salario => console.log( salario ) )
//     .catch( err => console.log(err) );

getEmpleado2(id)
  .then((empleado) => {
    console.log("entrando al then the getEmpleado2");
    nombre = empleado;
    return getSalario2(id);
  })
  .then((salario) =>
    console.log("El empleado:", nombre, "tiene un salario de:", salario)
  )
  .catch((err) => console.log(err));
