
import urlModel from '../Models/urlModel.js';


const deleteUrl = async (req, res) => {
  const  { originalUrl } = req.body;
  console.log(originalUrl);

  try {
    
    if (!originalUrl || typeof originalUrl !== 'string'){
       return res.status(400).json({ message: 'originalUrl is required ' });
      }
     const deleted = await urlModel.findOneAndDelete({ originalUrl: originalUrl });

     if (!deleted) {
      return res.status(404).json({ message: 'URL not found' });
      }
     res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ status: 500, error: err.message });
  }
};

export default deleteUrl;
