import express from 'express'
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'

//Initializacion
const app=express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port',process.env.PORT || 3000);
        //Configurar vistas
app.set('views',join(__dirname,'views'));

        //Configurar motor de plantilla
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
        //Express para interfaces y formularios
        //Express para archivos tipo Json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get('/', (req, res)=>{
    res.render('index')
})

//Public Files
        //Funcion Join, Public => Apartado para los usuarios
app.use(express.static(join(__dirname, 'public')));
//Run Server
app.listen(app.get('port'),()=>
console.log('cargando el puerto',app.get('port'))
);