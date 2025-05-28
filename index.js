import 'dotenv/config';
import express  from 'express';
import router from './routes/index.js';
import db from './config/db.js'


// conexion a la db
db.authenticate()
    .then(() => console.log('base de datos conectada correctamente'))
    .catch( error => console.log(error))

const app = express();

const port = process.env.PORT || 4000;

//Habilitacion de pug
app.set('view engine','pug')


//creando variable para presentar el año en el footer

app.use((req,res,next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de viajes"

    return next();
})


//habilitando body parse
app.use(express.urlencoded({extended: true}));
app.use(express.json())


// definiendo la carpeta public
app.use(express.static('public'))

//Uso del router
app.use('/',router)


app.listen(port, () =>{
    console.log(`el servidor esta funcionando en el puerto ${port}`)
})