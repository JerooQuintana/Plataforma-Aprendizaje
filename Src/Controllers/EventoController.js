const Evento = require('../Models/Evento')

const EventoController = {
  crearEvento: async (req, res) => {
    try{
      const {nombreEvento, fecha, hora, descripcion} = req.body
      const evento = new Evento({
        nombreEvento, fecha, hora, descripcion
      })
      await evento.save()
      return res.status(201).send({
        success: true,
        evento
      })
    }catch (error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  },

  obtenerEventos: async (req, res) => {
    try{
      const eventos = await Evento.find()
      return res.status(200).send({
        success: true,
        eventos
      })
    } catch (error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
module.exports = EventoController