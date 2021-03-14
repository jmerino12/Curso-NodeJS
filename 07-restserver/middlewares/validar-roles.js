const { response, request } = require("express");

const esAdminRol = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg: `${nombre} no es administrador`
        })

    }
    next();
}

const tieneRol = (...roles) => {
    console.log(roles);
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        console.log(roles, req.usuario.rol);
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El sevicio necesita unos de estos roles ${roles}`
            })
        }
        next();
    }

}

module.exports = {
    esAdminRol,
    tieneRol
}