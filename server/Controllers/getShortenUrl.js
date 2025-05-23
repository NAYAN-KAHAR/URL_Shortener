
import urlModel from '../Models/urlModel.js';


const getShortenUrl = async (req, res) => {
    const { shortUrl } = req.params;
    console.log(shortUrl);
    try{
        const url = await urlModel.findOne({ shortenUrl: shortUrl });
        if(url){
            await url.save();
            return res.redirect(url.originalUrl);
        }else{
            return res.status(404).json({ message:'url not found '});
        }
       
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default getShortenUrl;