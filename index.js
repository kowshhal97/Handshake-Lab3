const app=require('./app')

require('./db/mongoose')

app.listen(3000,()=>{
    console.log("Server is Running")
})