const mongoose = require('mongoose')

const IncidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    value: {
        type: Number,
        required: true
    },

    ong_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Ong',
        required: true
    }

})

module.exports = mongoose.model('Incident', IncidentSchema)