const systemapp = require('../controllers/systemapp');

// const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
// const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    server.post('/login', async (req, res, next) => {
        const result = await systemapp.controllers().login(req)
        res.send(result);
        return next();
    });
}