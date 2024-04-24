const Curso = require('../Models/Curso')

const CursoController = {
  crearCurso: async (req, res)=>{
    try{
      const {nombre, descripcion, fechaInicio, fechaFin} = req.body
      const nuevoCurso = new Curso({
        nombre,
        descripcion,
        fechaInicio,
        fechaFin
      })
      await nuevoCurso.save()
      res.status(201).json({
        curso: nuevoCurso
      })
    } catch (error){
      res.status(500).json({ error: 'Error al crear el curso' });
    }
  },

  obtenerCursos: async (req, res) => {
    try{
      const cursos = await Curso.find()
      res.status(200).json({
        cursos: cursos
      })
    } catch(error){
      res.status(500).json({ error: 'Error al obtener tareas' });
    }
  },

  eliminarCurso: async (req,res)=>{
    try{
      const {id} = await req.params
      await Curso.findByIdAndDelete(id)
      return res.status(200).send({
        success: true,
        message: "Curso eliminado"
      })

    } catch(error){
      return res.status(500).send({
        success: false,
        message: error.message
      })
    }
  }
}
module.exports = CursoController