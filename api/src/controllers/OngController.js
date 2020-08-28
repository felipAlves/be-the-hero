const Ong = require('../models/Ong')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

module.exports = {
    /**
     * Metodo para criar um novo resgistro no banco de dados
     */
    async store(req, res) {
            const data = req.body

            const ong = await Ong.create(data)  

            const token = jwt.sign({ id: ong.id }, authConfig.secret, {
                expiresIn: 86400
            })

            return res.json({ ong, token })
   
    },

    async index(req, res) {
        const ongs = await Ong.find()

        return res.json(ongs)
    }

}