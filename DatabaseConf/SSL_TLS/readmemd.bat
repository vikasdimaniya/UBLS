>>without client tls validation:
echo ""
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 1000 -in csr.pem -signkey key.pem -out cert.pem
cat cert.pem key.pem > mongodb.pem

for creating security key file for replias set internal security verify each other. every node should have keyFile.
openssl rand -base64 756 > replica_auth.key

mongod --dbpath D:/Documents/Study/Project/UBLS/DatabaseConf/db_data/data2  --tlsMode requireTLS --tlsCertificateKeyFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\mongodb.pem
mongo --tls --tlsAllowInvalidCertificates --host localhost --tlsCAFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\revoke.pem

notes:
--tlsAllowInvalidCertificates  : this allow self-signed certificates, communication is encrypted but server identity is not verified, don't use in production.
                                 This should be used for testing and dev only. If it must be used then the network should be trusted.
--tlsCertificateSelector       : You can also use the --tlsCertificateSelector option to specify the client certificate from the system certificate store instead of using --tlsCertificateKeyFile.
--host                         :
  mode                         : types of tls modes avilable in mongodb config.

net:
   tls:
      mode: requireTLS
      certificateKeyFile: D:/Documents/Study/Project/UBLS/DatabaseConf/SSL_TLS/mongodb.pem
systemLog:
   destination: file
   path: "D:/Documents/Study/Project/UBLS/DatabaseConf/db_data/log"
   logAppend: true
storage:
   dbPath: "D:/Documents/Study/Project/UBLS/DatabaseConf/db_data/data2"
net:
   port: 27017


>>with client tls validation:
echo ""
mongod --dbpath D:/Documents/Study/Project/UBLS/DatabaseConf/db_data/data2 --tlsMode requireTLS --tlsCertificateKeyFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\mongodb.pem --tlsCAFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\revoke.pem --tlsAllowInvalidCertificates
mongo --tls --tlsCertificateKeyFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\mongodb.pem --tlsCAFile D:\Documents\Study\Project\UBLS\DatabaseConf\SSL_TLS\revoke.pem --tlsAllowInvalidCertificates