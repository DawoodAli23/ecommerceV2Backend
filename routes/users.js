const express = require('express');
const { signUp, signIn } = require('../models/users');
const router = express.Router();

router.post("/",async(req,res)=>{
    const {username,password,email,socialMediatoken} = req.body;
    try {
        const result = await signUp(username,email,password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get("/",async(req,res)=>{
    const {email,password} =req.body;
    try {
        const result = await signIn(email,password);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error)
    }
})



module.exports = router;