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

**_Various settings available to change:_**  
name: Name of the application  
extended-urlEnconded: true to enable pass arrays and complex objects using url encoded format, value1=4&value2=5 this is what it decodes so you get console.log(req.params.value1) //4  
serveStaticFiles: Sometimes you want to serve some static files like logo, html static pages save them inside public folder.  
seprateErrorLog: if true then error logs will be kept sepately from other logs.
useHelmet  
useMorgan  
Morgan formats: tiny, combined, common, dev and short  
@hapi/joi  
joi-password-complexity

**_Future work:_**  
use Completed, in-development to specify the status of below tasks:

Completed: use winston insted of custom made logger

require modules only if module is required by the end-user of UBLS  
use bluebird insted of when  
pass log to all modules through settings, remove console.log  
add limit to api call size express.use(body.parser({limit:1mb}))  
add log file and different options like to store in a single file or create new file every day  
add JWT and intigrate other authentication systems and give option to select between these systems or select multiple at a time.  
add ui for setting the UBLS and create settings files for both environments.

**_Code formats:_**
Each module should be required alphabetically.
require and class definations should have a line in-between.
