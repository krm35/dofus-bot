const http = require('http');

module.exports = (path, body) => {
    return new Promise(function (resolve) {
        const content = JSON.stringify(body);
        const req = http.request({
            hostname: '127.0.0.1',
            port: 5000,
            path,
            method: 'POST'
        }, (res) => {
            let data = '';
            res.on('data', function (body) {
                data += body;
            });
            res.on('end', function () {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({error: true});
                }
            });
        }).on('error', function () {
            resolve({error: true});
        });
        req.setHeader('Content-Length', content.length);
        req.setHeader('Content-Type', 'application/json');
        req.write(content);
        req.end();
    });
};