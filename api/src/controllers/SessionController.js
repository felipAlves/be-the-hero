const Ong = require('../models/Ong')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

module.exports = {
    async store(req, res) {
        const { email, password } = req.body

        const ong = await Ong.findOne({ email }).select('+password')

        if(!ong) {
            return response.status(400).json({ error: 'ONG not found' })
        }

        if(!await bcrypt.compare(password, ong.password)) {
            return res.status(400).send({ error: 'Invalid password' })
        }

        ong.password = undefined

        const token = jwt.sign({ id: ong.id }, authConfig.secret, {
            expiresIn: 86400
        })

        res.send({ ong, token })

    }
}