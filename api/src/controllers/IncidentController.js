const Incident = require('../models/Incident')
const Ong = require('../models/Ong')

module.exports = {
    async store(req, res) {
        const data = req.body
        const { ong_id } = req.headers

        const ong = await Ong.findById(ong_id)

        if(!ong) {
            return res.status(400).send({ error: 'Ong does not exists' })
        }

        const incident = await Incident.create({ong_id  ,...data})

        return res.json(incident)
    },

    async index(req, res) {
        const { page = 1 } = req.query

        const count = await Incident.find().countDocuments()

        const incidents = await Incident.find()
        .limit(5)
        .skip((page - 1) * 5)
        .sort({
            title: 'asc'
        })

        res.header('X-Total-Count', count)

        res.json(incidents)
    },

    async delete(req, res) {
        const { id } = req.params
        const { ong_id } = req.headers

        const incident = await Incident.findById(id)

        if(!incident) {
            return res.status(400).send({ error: 'Incident not Found' })
        }

        if(!ong_id === incident.ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        await Incident.findByIdAndDelete(id)

        return res.status(204).send()
    }
}
