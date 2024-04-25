const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Usuario = connection.define('usuario', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    tipo: {
        type: DataTypes.STRING
    },
})

module.exports = Usuario


