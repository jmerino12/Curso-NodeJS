const fs = require('fs');
const colors = require('colors');


const crearArchivo = async (base = 5, listar) => {
    try {
        let salida = ''
        for (let i = 1; i <= 10; i++) {
            salida += (`${base} ${"x".green} ${i} ${"=".green} ${base * i}\n`);
        }
        if (listar) {
            console.log("==================".green);
            console.log("TABLA DEL:", colors.blue(base));
            console.log("==================".green);
            console.log(salida);
        }

        fs.writeFileSync(`tabla-${base}.txt`, salida);
        return `Creado la tabla${base}-creada`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo
}
