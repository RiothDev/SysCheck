import inquirer from "inquirer"
import chalk from "chalk"
import os from "os"

const CLI = {
    async getData(option) {
        return new Promise((res, reject) => {
            switch(option.toLowerCase()) {
                case "platform": res(os.platform);
                case "memory": res(Math.round(os.freemem() / (1024 * 1024)) + " MB / " + Math.round(os.totalmem() / (1024 * 1024)) + " MB");
                case "architecture": res(os.arch());
                case "processor": res(os.cpus()[0].model);
                case "host": res(os.hostname());
                default: reject("Invalid option");
            }
        })
    },

    async setup() {
        const option = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "> What information do you want to get?",
            choices: ["Platform", "Memory", "Architecture", "Processor", "Host"]
        })

        await this.getData(option["option"]).then((res) => {
            console.log(chalk.blueBright("- " + res))

        }).catch(() => {
            console.log("Error when trying to choose the option.")
        })
    }
}

async function main() {
    await CLI.setup()

    const option = await inquirer.prompt({
        type: "input",
        name: "continue",
        message: "Do you want to continue? (Y/N)",
        default: "Y"
    })

    if(option.continue.toLowerCase() === "y") {
        console.clear()
        main()
    }
}

main()