const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


class App {

    constructor(){
        this.express = express()    
        this.database()
        this.middleware()
        this.routes()
    }

    middleware(){        
        this.express.use(cors())
        this.express.use(bodyParser.urlencoded({
            extended: false
         }));
        this.express.use(express.json())
    }

    database(){
        mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153652.mlab.com:53652/oministack`,
        {   useNewUrlParser: true,
            useUnifiedTopology: true    
        }).then(connect => {
            console.log('connect');
        }).catch(err => {
            console.log('ERROR');
        })
    }

    routes(){
        this.express.use(require('./routes'))
    }



}
module.exports = new App().express