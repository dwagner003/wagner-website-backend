module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book",{
        title: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        read: {
            type: Sequelize.BOOLEAN
        }
    });

    return Book;
}