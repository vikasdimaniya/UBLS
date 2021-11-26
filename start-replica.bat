cd %~dp0
ECHO OFF
ECHO STARTING DATABASE....
start mongod --config DatabaseConf/replica/replica1.conf
start mongod --config DatabaseConf/replica/replica2.conf
start mongod --config DatabaseConf/replica/replica3.conf

start mongo && 'rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "localhost:27017" },
      { _id: 1, host: "localhost:27018" },
      { _id: 2, host: "localhost:27019" }
   ]
})
'
db.runCommand( { isMaster: 1 } )