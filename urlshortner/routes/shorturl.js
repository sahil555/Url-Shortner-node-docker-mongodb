const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const config = require("config");
const Url = require("../mongomodel/url");

var shortUrlRoute = express.Router();


// method for generating Short-Url from the given valid URL into the system via POST method

shortUrlRoute.post("/", async (req, res)=>{

    const longUrl = req.body.longUrl;
    
    // base URl for that we can use our DOMAIN or 3rd party DNS services 
    const baseUrl = config.get("baseURL");
    
    console.log("base url " + baseUrl + "   " + longUrl);
    
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Internal error. Please come back later.");
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){

        try{
            var url = await Url.findOne({longUrl : longUrl});
            console.log(url);
            
            if(url){

                return  res.status(200).json(url);
            
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
            
            /// storing data into DBs as per schema
                url  = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    clickCount: 0
                });
                
                // synchronize the storage of short URl into schema
                await url.save()
                return res.status(201).json(url);
            }
    
        }catch(err){
    
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    
    }else{
    
        res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    
    }    
});

module.exports = shortUrlRoute;