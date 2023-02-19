// 51, 52, 53
const Tarea = require("./Tarea");

const { v4: uudiv4 } = require("uuid");
class Tareas {
  _listado = {
    abc: 123,
  };

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(this._listado[key]);
    });
    return listado;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(showCompleted) {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      let index = 1;
      if (showCompleted) {
        if (tarea.completadoEn) {
          console.log(`${index} ${desc} ${completadoEn}`);
          index++;
        }
      } else {
        if (!tarea.completadoEn) {
          console.log(`${index} ${desc}`);
          index++;
        }
      }
    });
  }

  // 59
  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  // 62
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      console.log(tarea);
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
