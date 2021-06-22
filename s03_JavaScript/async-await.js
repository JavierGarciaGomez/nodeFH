console.log("*****************25 async await ***********");
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

let id = 10;
// async transofmra una función para que regrese una promesa
const getInfoUsuario = async (id) => {
  try {
    // await
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `${empleado} con salario ${salario}`;
  } catch (error) {
    return error;
  }
};

getInfoUsuario(id).then((msg) => console.log(msg));
