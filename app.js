const express=require('express')
const app=express()
const expressGraphQL=require('express-graphql')

const schema=require('./schema')


app.use('/graphql',expressGraphQL({
    graphiql:true,
    schema:schema
}))

module.exports=app;