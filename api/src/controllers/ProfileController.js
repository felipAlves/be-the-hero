const Incident = require('../models/Incident')

module.exports = {
    async index(req, res) {
        const { ong_id } = req.headers
        const incidents = await Incident.find( { ong_id } ).populate('ong_id')

        return res.json(incidents)
    }
}