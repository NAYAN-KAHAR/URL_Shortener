
import urlModel from '../Models/urlModel.js';
import { nanoid } from 'nanoid';


// Check if URL is reachable
const urlExists = async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD', timeout: 3000 });
      return res.ok;
    } catch (err) {
      console.error('URL fetch failed:', err.message);
      return false;
    }
  };
  


const shortenUrl = async (req, res) => {
    const { originalUrl, user } = req.body
    // console.log('userID', user);
    
    const shortUrl = nanoid(10);
    try{
        if(!originalUrl.trim()) return res.status(400).json({ message:'originalUrl is required' });

         // Check if URL is reachable
        const exists = await urlExists(originalUrl.trim());
        if (!exists) {
          return res.status(404).json({ error: 'URL is unreachable or does not exist' });
         }

        const exitOriginalUrl = await urlModel.findOne({ originalUrl: originalUrl.trim(), userId: user });
        if(exitOriginalUrl) return res.json({message:'Already shorten'});

           // Count how many URLs the user has created
        const userUrlCount = await urlModel.countDocuments({ userId: user });
        if (userUrlCount >= 6) {
          return res.status(403).json({ message: 'Limit reached: You can only shorten up to 6 URLs.' });
        }

        const url = new urlModel({ originalUrl: originalUrl.trim(), shortenUrl:shortUrl, userId:user});
        await url.save();
        res.status(201).json({ message:'shortUrl generated successfully', url });
        
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default shortenUrl;