const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())

app.listen(PORT, async(req, res) => {
    try {
        console.log('successfully listening')
    } catch (error) {
        console.log(error.message)
    }
})