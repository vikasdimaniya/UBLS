WINDOWS:
For development: set NODE_ENV=development
For production: set NODE_ENV=production

MAC:
For development: export NODE_ENV=development
For production: export NODE_ENV=production

<h4>Various settings available to change:</h4>
name: Name of the application
extended-urlEnconded: true to enable pass arrays and complex objects using url encoded format, value1=4&value2=5 this is what it decodes so you get console.log(req.params.value1) //4
serveStaticFiles: Sometimes you want to serve some static files like logo, html static pages save them inside public folder.  
useHelmet   
useMorgan   
Morgan formats: tiny, combined, common, dev and short   
@hapi/joi
joi-password-complexity
