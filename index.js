import app from "./src/app.js";


const PORT=app.get('port')
app.listen(PORT,()=>console.log('the server is running on port: '+PORT) )