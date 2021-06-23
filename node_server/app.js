const express       = require('express')
const cors          = require('cors');
const jwt           = require('jsonwebtoken');
var expressJWT      = require('express-jwt');

const app           = express();
const port          = 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

//Root
app.get('/', (req, res) => {
    res.json("Hello World");
});

//SECRET FOR JSON WEB TOKEN
let secret = 'some_secret';

//ALLOW PATHS WITHOUT TOKEN AUTHENTICATION
app.use(expressJWT({ secret: secret, algorithms: ['HS256']})
    .unless(
        { path: [
            '/token/sign'
        ]}
    ));

/* CREATE TOKEN FOR USE */
app.post('/token/sign', (req, res) => {
    let token = jwt.sign(req.body, secret, {expiresIn: '120s'})
    res.status(200).json({"token": token});
});

/* LISTEN */
app.listen(port, function() {
    console.log("Listening to " + port);
});