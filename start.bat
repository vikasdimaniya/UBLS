ECHO OFF
ECHO STARTING DATABASE....
start mongod --config DatabaseConf/mongodb.conf
SLEEP 4
set UBLS_jwtPrivateKey=SetNewKeyBeforeStarting
set GOOGLE_CLIENT_ID=yourId
set GOOGLE_CLIENT_SECRET=yourKey
ECHO Set Jwt Private Key: complete.
node server.js
