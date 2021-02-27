const axios = require('axios');
class Busquedas {
    historial = ['Madrid', 'Bogota', 'San jose'];

    constructor() {
        //TODO: leer BD si existe
    }

    get ParamsMapBox() {
        return {
            'access_token': 'pk.eyJ1Ijoiam1lcmlubzEyIiwiYSI6ImNrbG5wdXUwaDBsZ3Ayd3BteGowazBlYmEifQ.JtCmI9Iq080Wu-PpGjETjw',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.ParamsMapBox

            });

            const resp = await instance.get();
            console.log(resp.data)
            return []
        } catch (error) {
            console.log(error)

            return [];
        }
    }
}

module.exports = Busquedas