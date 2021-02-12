const DeadPool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "Regeneración",
    edad: 50,
    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }
}

const { nombre, apellido, poder, edad = 0 } = DeadPool;
console.log(nombre, apellido, poder, edad)
console.log(DeadPool.getNombre())


function imprimierHeroe({ nombre, apellido, poder, edad = 0 }) {
    console.log(nombre, apellido, poder, edad);
}

//imprimierHeroe(DeadPool)

const heroes = ["Dealpool", "SuperMan", "Batmant"];
//const h1 = heroes[0];
//const h2 = heroes[0];
//const h3 = heroes[2];

const [, , h3] = heroes;
console.log(h3)