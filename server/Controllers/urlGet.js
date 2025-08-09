
import urlModel from '../Models/urlModel.js';


const urlGet = async (req, res) => {
   const userId = req.params.user; // ✅ Corrected
//    console.log('userId', userId);
    try{
        if(!userId) return;
       const urls = await urlModel.find({ userId: userId });
        if(urls){
           res.status(200).json({ message:'url get sucessfully', url:urls });
        }else{
            return res.status(404).json({ message:'url not found from getURL'});
        }
       
    }catch(err){
        console.log('error', err);
        res.status(500).json({status:500, error:err});
    }
}

export default urlGet;