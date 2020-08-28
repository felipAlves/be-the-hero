const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const OngSchema = new mongoose.Schema({
    
    password: {
        type: String,
        required: true,
        select: false
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    }
})

OngSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

module.exports = mongoose.model('Ong', OngSchema)