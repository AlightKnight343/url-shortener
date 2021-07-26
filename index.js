const dotenv = require("dotenv")

dotenv.config()
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const shortUrl = require('./schemas/shortUrl')

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

//MongoDB Setup
const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri,{
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser: true,
})


//home route
app.get('/', async (req, res)=>{
    const shortUrls = await shortUrl.find()
    res.render("index", {shortUrls:shortUrls})
})

//post

app.post('/smol', (req,res)=>{
    shortUrl.create({big: req.body.bigUrl})
    .then(res.redirect('/'))
})

//finalshorturls
app.get('/:shortUrl', async(req,res)=>{
    const smolUrl = await shortUrl.findOne({smol:req.params.shortUrl})
    if(smolUrl === null){
        res.send("URL not found")
    }else{
        res.redirect(smolUrl.big)
    }
})

//listening
const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`App Listening on ${PORT}`);
})