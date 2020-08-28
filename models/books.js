'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Please provide a value for the title"
                }
            }
        },
        author:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Please provide a value for the author"
                }
            }
        },
        genre:{
            type:Sequelize.STRING
        },
        year:{
            type:Sequelize.STRING
        }

    }, { sequelize });

    return Book;
};