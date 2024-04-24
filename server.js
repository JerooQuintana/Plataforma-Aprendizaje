require('dotenv').config();
const dbConnection = require('./Src/Config/db');
dbConnection();

const express = require('express'); 
const app = express();
const Port = 3000;

app.use(express.json());

app.use(express.static('Public'));

app.get('/', (req, res)=>{
    res.send('hola plataforma de aprendizaje adaptivo!');
});

// Importar las rutas
const estudiantesRoutes = require('./Src/Routes/estudiantesRoutes');
const padresRoutes = require('./Src/Routes/padresRoutes');
const profesoresRoutes = require('./Src/Routes/profesoresRoutes');
const RepAcademicoRouter = require('./Src/Routes/RepAcademicoRouter')
const AsistenciaRouter = require('./Src/Routes/AsistenciaRouter')
const EventoRouter = require('./Src/Routes/EventoRouter')
const MensajeAlumnoRouter = require('./Src/Routes/MensajeAlumnoRouter')
const TareaRouter = require('./Src/Routes/TareaRouter')
const CursoRouter = require('./Src/Routes/CursoRouter')


// Usa las Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/padres', padresRoutes);
app.use('/api/profesores', profesoresRoutes);
app.use('/api', TareaRouter)
app.use('/api', CursoRouter)
app.use('/api', RepAcademicoRouter)
app.use('/api', AsistenciaRouter)
app.use('/api', EventoRouter)
app.use('/api', MensajeAlumnoRouter)

// middleware de manejo de errores 
app.use((err, req,  res, next) => {
    console.error(err.stack);
    res.status(500).send('algo salio mal!');
});
app.listen(Port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${Port}`);
});