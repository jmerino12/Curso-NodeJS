const { leerinput, inquirerMenu } = require('./helpers/inquirer')
const main = async () => {
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                break;
            case 2:
                break;
            case 0:
                break;
        }
        await pausa()
    } while (opt !== 0);
}

main();