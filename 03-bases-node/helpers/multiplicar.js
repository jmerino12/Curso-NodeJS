const fs = require('fs');
const crearArchivo = async (base = 5, listar) => {
    try {
        let salida = ''
        for (let i = 1; i <= 10; i++) {
            salida += (`${base} x ${i} = ${base * i}\n`);
        }
        if (listar) {
            console.log("==================");
            console.log("TABLA DEL:", base);
            console.log("==================");
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
