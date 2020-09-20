ECHO OFF
ECHO STARTING DATABASE....
start mongod --config DatabaseConf/mongodb.conf
SLEEP 4
set UBLS_jwtPrivateKey=SetNewKeyBeforeStarting
ECHO Set Jwt Private Key: complete.
node server.js
