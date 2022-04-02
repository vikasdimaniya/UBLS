//redis code
const redis = require('redis');
const fs = require('fs');
const { Console } = require('console');
    
let log;
let clientConf;

module.exports={
    init: async function(core){
        log = core.log;
        clientConf={
            host: "172.22.186.199",
            port: 6379,
            // tls: {
            //     key: fs.readFileSync('path_to_keyfile', encoding='ascii'),
            //     cert: fs.readFileSync('path_to_certfile', encoding='ascii'),
            //     ca: [ fs.readFileSync('path_to_ca_certfile', encoding='ascii') ]
            // }
        }
        const client = redis.createClient(clientConf);
        await client.connect();

        await client.set('key', 'value');
        const value = await client.get('key');
        console.log(value)
        core.cache=client;
        client.on('error', err => {
            console.log('Error ' + err);
        });
    }
}

/*
if(process.env.NODE_ENV=="development")clientConf = {
    host: "172.22.186.199",
    port: 6379
}
*/