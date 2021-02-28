const fs = require('fs')
const axios = require('axios');
class Busquedas {
    historial = [];
    dbPath = './db/database.json';


    constructor() {
        this.leerDB();
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

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
            return palabras.join(' ')
        })
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
            return;
        } else {
            this.historial = this.historial.splice(0, 5);
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

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        } else {
            const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
            const data = JSON.parse(info);
            this.historial = data.historial
        }
    }
}

module.exports = Busquedas