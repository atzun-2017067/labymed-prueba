const jwt = require("jsonwebtoken");

const generarJWT = (uid = '', rol = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid, rol};
        jwt.sign(payload, process.env.KEY_TOKEN, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
};

module.exports = {
    generarJWT
};