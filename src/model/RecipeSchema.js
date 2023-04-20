const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const RecipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    ingredients:{
        type:Array
    },
    directions:{
        type:String
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
    
})

const Recipe = mongoose.model("Recipe",RecipeSchema)

module.exports = Recipe