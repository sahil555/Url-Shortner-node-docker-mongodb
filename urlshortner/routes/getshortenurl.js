const express = require("express");
const config = require("config");
const Url = require("../mongomodel/url");

// defining express router to handles url routes

var getShortenUrlRoute = express.Router();

// Utility API function which takes the user to the destination URL

getShortenUrlRoute.get('/:shortUrl', async (req, res) => {
    // gets the request shorturl CODE as parameter 

    var shortUrlCode = req.params.shortUrl;
    
    // finding the shortUrl code into DB
    var url = await Url.findOne({ urlCode: shortUrlCode });

    try {

        if (url) {
            
            // getting counter for url access
            
            var clickCount = url.clickCount;
        
            if(clickCount >= config.allowedClick){
        
                console.log("The click count for shortcode " + shortUrlCode + " has passed the limit of " + config.allowedClick);
                return res.status(400).json("The click count for shortcode " + shortUrlCode + " has passed the limit of " + config.allowedClick);
        
            }
            // increments the use of shorturl counter 
            clickCount++;
        
            await url.update({ clickCount });
            return res.redirect(url.longUrl);
    
        } else {
    
            return res.status(400).json("The short url doesn't exists in our system.");
    
        }
    }catch (err) {
        
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return res.status(500).json("There is some internal error.");
    
    }
})

// exporting function 

module.exports = getShortenUrlRoute;