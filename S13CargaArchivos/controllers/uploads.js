// 181, 182, 183, 184, 185, 186, 187, 188
const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

// 181, 182, 183
const cargarArchivo = async (req = request, res = response) => {
  try {
    // const fileName = await subirArchivo(req.files, ["txt", "md"], "texta");
    const fileName = await subirArchivo(req.files);
    res.json({ fileName: fileName });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const actualizarArchivo = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Esta colección no está programada" });
  }

  // Limpiar imágenes previas
  try {
    // verificar si existe la imagen
    if (modelo.img) {
      // detectar el path de la imagen actual
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {}

  // subir la imagen
  const fileName = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = fileName;
  await modelo.save();

  res.json({ modelo });
};

// 194 actualizarImagenCloudinary

const actualizarArchivoClodunary = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Esta colección no está programada" });
  }

  // Limpiar imágenes previas

  // verificar si existe la imagen
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  // cloudinary
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  // // subir la imagen
  // const fileName = await subirArchivo(req.files, undefined, coleccion);
  // modelo.img = fileName;
  // await modelo.save();

  res.json({ modelo });
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con el id: ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con el id: ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Esta colección no está programada" });
  }

  // Limpiar imágenes previas
  try {
    // verificar si existe la imagen
    if (modelo.img) {
      // detectar el path de la imagen actual
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );

      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }
  } catch (error) {}

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(pathImagen);
};

module.exports = {
  cargarArchivo,
  actualizarArchivo,
  actualizarArchivoClodunary,
  mostrarImagen,
};
