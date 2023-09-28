const express = require('express');
const router = express.Router();
const userModel = require('../Models/user.model')

router.post('/user_signup', async(req, res) => {
    try {
        console.log(req.body)
        const user = await userModel.create(req.body);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.post('/user_login', async(req, res) => {
    try {
        const {university_id, password} = req.body;
        let missingFields = [...Object.keys(req.body).filter((ele) => (!req.body[ele]))];
        if(missingFields.length){
            return res.status(400).send(`Please provide these missing fields : ${missingFields.join(',')}!`)
        }
        const user = await userModel.find({university_id: university_id, password: password}).select('-password');
        if(!user){
            return res.status(400).send(`User not exist!`)
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router;