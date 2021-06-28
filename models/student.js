const Sequelize = require('sequelize');
const db = require('../config/databases')

const Student = db.define('student',{
     
     name : {
         type : Sequelize.STRING
     },
    address : {
        type : Sequelize.STRING
    }
})

module.exports = Student;