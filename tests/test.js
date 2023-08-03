const fs = require('fs'),
    {spawn} = require('child_process'),
    {strictEqual} = require('assert');

const osCommand = (command, args) => {
    return new Promise(resolve => {
        let process = spawn(command, args || []), result = "";
        process.stdout.on('data', data => result += data);
        process.stderr.on('data', data => result += data);
        process.on('error', () => null);
        process.on('close', code => resolve({code, result}));
    });
};

(async () => {
    const files = fs.readdirSync(".").filter(f => f.endsWith(".test.js"));
    for (const file of files) {
        const {code, result} = await osCommand("node", ["./" + file]);
        console.log(file, result);
        strictEqual(code, 0);
    }
    process.exit(0);
})();