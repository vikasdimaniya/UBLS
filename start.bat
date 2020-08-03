ECHO OFF
ECHO STARTING DATABASE....
start mongod --config DatabaseConf/mongodb.conf
SLEEP 4
start node index.js
ECHO Mongodb stoped. 
SLEEP 2