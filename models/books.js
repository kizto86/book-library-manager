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
                    msg:"Please provide the title of the book"
                }
            }
        },
        author:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Please provide the name of the author of the book"
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