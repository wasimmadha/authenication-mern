const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./userModel')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/App-Login')

app.post('/api/register', async(req, res) => {
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password : req.body.password
        })

        res.json({status: "ok"})
    }catch(err){
        res.json({status: 'error', error: 'Duplicate Email'})
    }
})



app.post('/api/login', async(req, res) => {

    const user = await User.findOne({email: req.body.email, password: req.body.password})
    if(user){
            const data  = {
                name: user.name,
                email: user.email
            }
            
            const token = await jwt.sign(data, 'secret123')
            res.json({status: "ok", token:token, user:user})
    }
    else
        res.json({status: "error", error: "User not Found"})
})

app.get('/api/quote', async(req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret123')
    
    if(decoded.email)
    {
        const email = decoded.email
        const user = await User.findOne({email: email})
        return res.json({status: "ok", quote: user.quote})
    }
    else{
        res.send({status: "error", error:"invalid token"})
    }
})

app.post('/api/quote', async(req, res) => {

    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'secret123')
    const quote = req.body.quote

    
    if(decoded.email)
    {
        const email = decoded.email
        const user = await User.updateOne({email: email}, {$set: {quote: quote}})
        if(user)
            return res.json({status: "ok", quote:quote})

    }
    else{
        res.send({status: "error", error:"invalid token"})
    }
})

app.listen(1337, () => console.log("Server started"))