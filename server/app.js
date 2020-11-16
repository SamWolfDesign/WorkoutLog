require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require('./db');

let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');

// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());
// EXPOSED ROUTE
app.use('/user', user);

// PROTECTED ROUTE
// app.use(require('./middleware/validate-session'));
app.use('/log', log)

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})