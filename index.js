const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')

const UserRouter = require('./src/Router/UserRouter')
const RecipeRouter = require('./src/Router/RecipeRouter')
require('./src/db/conn')

app.use(cors())
app.use(express.json())
app.use('/api/user',UserRouter)
app.use('/api/recipe',RecipeRouter)



app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})
