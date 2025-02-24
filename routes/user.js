const express = require("express");
const router = express.Router();

const User = require('../models/user')

const getUser = async (req, res, next) =>{
    let chosenUser
    try {
        chosenUser = await User.findById(req.params.id)
        if(chosenUser === null){
            return res.status(404).json({message: "Unable to find user please verify information and try again."})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }  
    res.chosenUser = chosenUser
    next()
}

router.get('/', async (req,res) =>{
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', getUser, async (req,res)=>{
    res.json(res.chosenUser)
    
})

router.post('/', async (req,res)=>{
    const user = new User({
        email : req.body.email,
        password : req.body.password
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/:id', getUser, async (req,res)=>{
    if (req.body.email != null){
        res.chosenUser.email = req.body.email
    }
    if (req.body.password != null){
        res.chosenUser.password = req.body.password
    }
    try {
        const updatedUser = await res.chosenUser.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', getUser, async (req,res)=>{
    try {
        await res.chosenUser.deleteOne()
        res.json({message : "Removed User"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})



module.exports = router;
