const fs = require('fs')
const axios = require('axios');
class Busquedas {
    historial = [];
    dbPath = './db/database.json';


    constructor() {
        //TODO: leer BD si existe
    }

    get ParamsMapBox() {
        return {
            'access_token': process.env.MAP_BOX,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramWhater() {
        return {
            appid: process.env.OPEN_WEATHER,
            units: 'metric',
            lang: 'es'
        }
    }


    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.ParamsMapBox

            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                long: lugar.center[0],
                lat: lugar.center[1],

            }))
        } catch (error) {
            console.log(error)

        }
    }

    async climarLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramWhater, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data
            return {
                desc: weather[0].description,
                max: main.temp_max,
                min: main.temp_min,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);

        }
    }

    agregarHistorial(lugar = "") {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        } else {
            this.historial.unshift(lugar);
            this.guardarBD();
        }
    }

    guardarBD() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
}

module.exports = Busquedas