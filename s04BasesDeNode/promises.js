console.log("*****************23 promesas ***********");
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

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    // if empleado is found, envío el resolve
    empleado
      ? resolve(empleado)
      : reject(`ERROR. No existe empleado con id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario ? resolve(salario) : reject(`ERROR. Salario no encontrado`);
  });
};

let id = 4;
getEmpleado(id)
  .then((empleado) => console.log(empleado))
  .catch((error) => console.log(("ERROR", error)));

getSalario(id)
  .then((salario) => console.log(`el salario es ${salario}`))
  .catch((error) => console.log(("ERROR", error)));

id = 2;

console.log("getEmpleado");
getEmpleado(2)
  .then((empleado) => {
    getSalario(id)
      .then((salario) => {
        console.log(`el empleado ${empleado} tiene un salario de ${salario}`);
      })
      .catch((error) => console.log("ERROR SALARIO"));
  })
  .catch((error) => console.log("ERROR EMPLEADO"));

id = 2;
console.log("*****************24 promesas en cadena ***********");

let nombre, salario;
getEmpleado(id)
  .then((empleado) => {
    console.log("aca");
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) => {
    console.log(`El empleado ${nombre} tiene un salario de ${salario}`);
  });
