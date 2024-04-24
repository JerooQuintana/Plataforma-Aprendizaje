const MensajeAlumno = require('../Models/MensajeAlumno')

const MensajeAlumnoController = {
  
  crearMensajeAlumno: async (req, res) =>{
    try{
      const {titulo, descripcion, fechaEnvio, estado} = req.body
      const mensajeAlumno = new MensajeAlumno({
        titulo, descripcion, fechaEnvio, estado
      })
      await mensajeAlumno.save()
      return res.status(201).send({
        success: true,
        mensajeAlumno
      })
    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  obtenerMensajeAlumnos: async (req, res) =>{
    try{
    const mensajeAlumnos = await MensajeAlumno.find()
    return res.status(200).send({
      success: true,
      mensajeAlumnos
    })
  } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  eliminarMensajeAlumno: async (req, res) => {
    try{
      const {id} = await req.params
      await MensajeAlumno.findByIdAndDelete(id)
      return res.status(200).send({
        success: true,
        message: "Profesor eliminado"
      })
    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
module.exports = MensajeAlumnoController