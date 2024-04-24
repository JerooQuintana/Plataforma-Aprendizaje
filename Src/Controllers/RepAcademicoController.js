const RepAcademico = require('../Models/RepAcademico')

const RepAcademicoController = {

  crearRepAcademico: async (req, res) =>{
    try{
      const {estudiante, notas, observaciones} = req.body
      const repAcademico = new RepAcademico({
        estudiante, notas, observaciones
      })
      await repAcademico.save()
      return res.status(201).send({
        success: true,
        repAcademico
      })
    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  obtenerRepAcademico: async (req, res) => {
    try{
      const repAcademicos = await RepAcademico.find()
      return res.status(200).send({
        success: true,
        repAcademicos
      })
    } catch (error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  eliminarRepAcademico: async (req, res) =>{
    try{
      const {id} = req.params
      await RepAcademico.findByIdAndDelete(id)
      return res.status(200).send({
        success: true,
        message: "Reporte de evaluacion eliminado"
      })
    } catch(error) {
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
module.exports = RepAcademicoController