const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const Recipe = require('./../model/RecipeSchema')


router.post('/addrecipe',authenticate,async(req,res)=>{
    try{
        const {title,author,image,ingredients,directions} = req.body
        const id = req.userid
        const upload = new Recipe({
            title,author,image,ingredients,directions,user:id
        })

        const saveData = await upload.save()
        return res.status(200).json({message:"Recipe Uploaded"})

    }catch(err){
        console.log(err)
    }
})

router.get('/getall',authenticate,async(req,res)=>{
    try{
        const data = await Recipe.find()
        res.status(200).send(data)
        
    }catch(err){
        console.log(err)
    }
})

router.get('/indrecipe/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const data = await Recipe.findById(id)
        if(data){
            res.status(200).send(data)
        }

    }catch(err){
        console.log(err)
    }

})

module.exports = router