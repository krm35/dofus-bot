const fs = require('fs'),
    {spawn} = require('child_process'),
    {strictEqual} = require('assert');

const osCommand = function (command, args) {
    return new Promise(resolve => {
        const process = spawn(command, args || []);
        let result = "";
        process.stdout.on('data', (data) => result += data);
        process.on('error', () => null);
        process.on('close', (code) => resolve({code, result}));
    });
};

(async () => {
    const files = fs.readdirSync(".").filter(f => f.endsWith(".test.js"));
    for (const file of files) {
        const content = fs.readFileSync("./" + file).toString();
        if (content.indexOf('process') !== content.lastIndexOf('process')) {
            console.log(file, 'multiple process.exit');
            strictEqual(true, false);
        }
        const {code, result} = await osCommand("node", ["./" + file], true);
        console.log(file, result);
        strictEqual(code, 0);
    }
    process.exit(0);
})();