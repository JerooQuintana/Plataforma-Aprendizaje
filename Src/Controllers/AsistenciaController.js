const Asistencia = require('../Models/Asistencia')

const AsistenciaController = {
  crearAsistencia: async (req, res) => {
    try{
      const {estudiante, faltas, tardanzas, justificadas, observaciones} = req.body
      const asistencia = new Asistencia({
        estudiante, faltas, tardanzas, justificadas, observaciones
      })
      await asistencia.save()
      return res.status(201).send({
        success: true,
        asistencia
      })
    }catch (error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  obtenerAsistencias: async (req, res) => {
    try{
      const asistencias = await Asistencia.find()
      return res.status(200).send({
        success: true,
        asistencias
      })
    } catch (error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  eliminarAsistencia: async (req, res) => {
    try{
      const {id} = await req.params
      await Asistencia.findByIdAndDelete(id)
      return res.status(200).send({
        success: true,
        message: "Registro de asistencia eliminado"
      })
    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
module.exports = AsistenciaController