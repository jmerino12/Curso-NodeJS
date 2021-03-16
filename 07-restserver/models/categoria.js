const { Schema, model } = require('mongoose');
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatoria'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usario',
        required: [true, 'El usuario de creacion es obligatorio']
    }
});

module.exports = model('Categoria', CategoriaSchema);