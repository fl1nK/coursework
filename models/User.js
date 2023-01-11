const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    pdf: [{type: Schema.Types.ObjectId, ref: 'PDFFile'}],
    favorites: [{type: Schema.Types.ObjectId, ref: 'PDFFile'}]
})

module.exports = model('User', User)
