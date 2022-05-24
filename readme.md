**UBLS (user based login system) it is a boilerplate for high throughput applications developed using node, mongodb(standalone/replicas), redis(TODO,with replication), oAuth and Elastic search(TODO, redis can be used for search but it won't be persistant if single node is used) to create microservices or a standalone server for user based( means some auth mechanism) applications, It provides headstart to development of new product that handle large amounts of data.**

**_WINDOWS:_**  
For development: set NODE_ENV=development  
For production: set NODE_ENV=production

**_MAC:_**  
For development: export NODE_ENV=development  
For production: export NODE_ENV=production

**_Configuring Settings:_**  
To modify settings open config folder. There are two environments available:  
-Development  
-Production  
Both have there options you can choose to enable and disable them separately in both environments.

**_Recommended settings for production_**

**_Various settings available to change:_**  
name: Name of the application  
extended-urlEnconded: true to enable pass arrays and complex objects using url encoded format, value1=4&value2=5 this is what it decodes so you get console.log(req.params.value1) //4  
serveStaticFiles: Sometimes you want to serve some static files like logo, html static pages save them inside public folder.  
seprateErrorLog: if true then error logs will also be kept sepately from other logs.
useHelmet  
useMorgan  
Morgan formats: tiny, combined, common, dev and short  
@hapi/joi  
joi-password-complexity

**_Features_**
log can print objects no need to use JSON.stringiy

**_Future work:_**  
use Completed, in-development to specify the status of below tasks:

Completed: use winston insted of custom made logger

Add redis.

use envkey.com
use readme.com
consider using fastify
add nginx to serve static files  
use docker
use ESLint
use env key module
use node clusters https://nodejs.org/api/cluster.html  
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md vs current?  
https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
Use PINO ? vs winston  
Improve error handling, https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md   
if port already in use then exit  
add limit to api call size express.use(body.parser({limit:1mb}))  
add log file and different options like to store in a single file or create new file every day  
add JWT and intigrate other authentication systems and give option to select between these systems or select multiple at a time.  

**_Code formats:_**
Each module should be required alphabetically.
require and class definations should have a line in-between.
