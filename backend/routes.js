const express = require('express')
const routes = express.Router()
const devController = require('./src/controllers/DevController')
const searchController = require('./src/controllers/SearchController')


routes.get('/', (req, res) => {
    res.send('Hello word XXX!')
})

routes.get('/api/devs', devController.index)
routes.post('/api/devs', devController.store)


routes.get('/search', searchController.index)

module.exports = routes