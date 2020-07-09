ECHO OFF
ECHO STARTING DATABASE....
start mongod --config DatabaseConf/mongodb.conf
start node index.js
ECHO Mongodb stoped. 
SLEEP 2