console.log("*****************20 callbacks ***********");
// setTimeout(function () {
//   console.log("Hola Mundo");
// }, 1000);

const getUserById = (id) => {
  const user = {
    id,
    nombre: "Javier",
  };

  setTimeout(() => {
    console.log(user);
  }, 500);
};

getUserById(3);

getUserById(10, () => {
  console.log("hola mundo");
});

const getUserById2 = (id, callback) => {
  const user = {
    id,
    nombre: "Javier",
  };

  setTimeout(() => {
    callback(user);
  }, 500);
};

getUserById2(10, (usuario) => {
  console.log(
    `hola, soy un callback, este es el nombre del usuario ${usuario.nombre.toUpperCase()}`
  );
});

console.log("*****************21 callback hell ***********");
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
  const empleado = empleados.find((e) => e.id === id);
  return empleado;
};

console.log("21, getEmpleado", getEmpleado(3));
console.log("21, getEmpleado", getEmpleado(2));
console.log("21, getEmpleado. undefined por que no existe", getEmpleado(5));

console.log("++++++getEmpleado con callback");

const getEmpleado2 = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id);
  if (empleado) {
    callback(empleado);
  } else {
    callback(`El empleado con id ${id} no existe en la base de datos`);
  }
};

const callbackFunction = (empleado) => console.log(empleado);

getEmpleado2(2, (empleado) => {
  console.log(`Hola, soy un callback, este es el empleado`, empleado);
});

console.log("++++++getEmpleado con error");

const getEmpleado3 = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id);
  if (empleado) {
    // el null es para decir que no se envía nungún error
    callback(null, empleado);
  } else {
    callback(`El empleado con id ${id} no existe en la base de datos`);
  }
};

getEmpleado3(5, (error, empleado) => {
  console.log("empieza test getEmpleado3");
  if (!error) {
    console.log(`Hola, soy un callback, este es el empleado`, empleado);
  } else {
    console.log("there is an error");
  }
});

console.log("*****************22 callback hell ***********");

const getSalario = (id, callback) => {
  console.log("Empieza getSalario");
  const salario = salarios.find((s) => s.id === id);
  if (salario) {
    callback(null, salario.salario);
  } else {
    callback(`Error. no se encontró el salario`);
  }
};

getSalario(8, (error, salario) => {
  if (!error) {
    console.log("el salario del empleado es", salario);
  } else {
    console.log("Error. no se pudo encontrar el salario del empleado");
  }
});

console.log("+++++++función getSalario con null check operator");
const getSalario2 = (id, callback) => {
  const salario = salarios.find((s) => s.id === id)?.salario;
  if (salario) {
    callback(null, salario);
  } else {
    callback(`No existe salario para el id ${id}`);
  }
};

getSalario2(2, (error, salario) => {
  if (!error) {
    console.log("getSalario2 el salario del empleado es", salario);
  } else {
    console.log("Error. no se pudo encontrar el salario del empleado");
  }
});

console.log("+++++++ejemplo más claro de callbackhell");

id = 2;
getEmpleado3(id, (err, empleado) => {
  if (err) {
    console.log("ERROR, empleado no encontrado");
    return console.log(error);
  }
  getSalario2(id, (err, salario) => {
    if (err) {
      return console.log(err);
    }
    console.log(salario);
  });
});
