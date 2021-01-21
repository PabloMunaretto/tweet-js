// REQUIRES ------
const express = require( 'express' );
const morgan = require('morgan'); //middleware application logger
const nunjucks = require( 'nunjucks' );
const tweet = require('./tweetBank');

const app = express(); // crea una instancia de una aplicación de express

// Configurando Nunjucks --- RENDERIZA templates
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates


// MIDDLEWARES --- ConsoLOGUEA cuestiones
app.use(morgan('tiny'));
app.use(express.static('./public'))
app.use(logger);
app.use('/special', (req, res, next) => {
    console.log("Estás en un área especial")
    next()
})
function logger(req, res, next) {
    console.log(`Se ha hecho un Request a: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

// -------

let tweetsDeEjemplo = [
    { id: 1, name: "juan", content: "este es un tweeettt de juan" },
    { id: 2, name: "carlos", content: "este es un tweeettt de carlos" },
    { id: 3, name: "pepe", content: "este es un tweeettt de pepe" },
];

app.get('/', function (req, res) {
    res.render( 'index', { tweets: tweetsDeEjemplo });
});
app.get('/special', function (req, res) {
    res.render( 'index', { tweets: tweetsDeEjemplo });
});
app.get('/special/dale', function (req, res) {
    res.send("holis");
});
app.listen(3000, function(){
    console.log('Estas escuhando en el puerto 3000')
});


