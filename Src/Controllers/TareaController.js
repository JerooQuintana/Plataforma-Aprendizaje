const Tarea = require('../Models/Tarea');

const TareaController = {

  crearTarea: async (req, res) => {
    try {
      const { nombre, descripcion, materia, fechaInicio, fechaEntrega, estado, nota } = req.body;

      const nuevaTarea = new Tarea({
        nombre,
        descripcion,
        materia,
        fechaInicio,
        fechaEntrega,
        estado,
        nota
      });
      await nuevaTarea.save();
      res.status(201).json({ tarea: nuevaTarea });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      });
    }
  },

  obtenerTareas: async (req, res) => {
    try {
      const tareas = await Tarea.find();
      return res.status(200).send({
        success: true,
        tareas
      })
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      })

    }
  },

  eliminarTarea: async (req, res) => {
    try {
      const { id } = req.params;
      await Tarea.findByIdAndDelete(id);
      return res.status(200).send({
        success: true,
        message: "Tarea elimanada con exito"
      })
    } catch (error) {
      return res.status(500).send({
        succses: false,
        message: error.message
      })
    }
  }
}
module.exports = TareaController;
