const express = require('express')
const authMiddleware  = require('./middlewares/auth')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()

/**
 * Rotas que não precisam de autorização
 */

 // session's routes

routes.post('/sessions', SessionController.store)

// ong's routes

routes.post('/ongs', OngController.store)
routes.get('/ongs', OngController.index)

/**
 * Rotas que necessitam do middleware de autorização
 */

routes.use(authMiddleware)


// Incident's routes

routes.post('/incidents', IncidentController.store)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

// profile's routes

routes.get('/profile', ProfileController.index)



module.exports = routes