const jwt = require('jsonwebtoken');

const generateToken = (id) => {

    return jwt.sign({ id }, 'secret_101', {
        expiresIn: '30d',
    });

};

module.exports = generateToken;