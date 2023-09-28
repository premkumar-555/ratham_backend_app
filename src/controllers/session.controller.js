const express = require('express');
const router = express.Router();
const sessionModel = require("../Models/session.model");

// post sessions
router.post('/post_sessions', async(req, res) => {
    try {
        const sessions = await sessionModel.create(req.body);
        return res.status(200).send('Sessions Posted Successfully!')
    } catch (error) {
        return res.status(500).send(error)
    }
});

// get sessions 
router.get('/get_sessions', async(req, res) => {
    try {
        console.log('sss', req.query)
        const {dean_id} = req.query;
        console.log(dean_id)
        const currentDate = new Date().toISOString()
        let conditions;
        if(dean_id){
         conditions = { $and : [{ $expr : { $gt : [ { $add : ["$date", { $multiply: [3600, 1000] } ]}, currentDate]}},
                       {dean: dean_id}, {isBooked: true}] }
        }else{
            conditions = { $and : [{date: { $gt : new Date().toISOString()}},
                       {isBooked: false} ] }
        }
        // ,
        const sessions = await sessionModel.find(conditions);
        console.log(sessions)
        return res.status(200).send(sessions)
    } catch (error) {
        return res.status(500).send(error)
    }
})

// book a slot 
router.post('/book_session/:id', async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const {dean, date, duration, isBooked, student_allotted} = req.body;
        let missingFields = [...Object.keys(req.body).filter((ele) => (!req.body[ele]))];
        if(!dean || !date || !duration || !isBooked || !student_allotted){
            return res.status(400).send(`Please provide these missing fields : ${missingFields.join(',')} to book a slot!`)
        }
        const session = await sessionModel.findByIdAndUpdate({_id: id}, req.body);
        return res.status(200).send('Sessions Booked Successfully!')
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;