
import mongoose, { Schema } from "mongoose";

const urlSchema =  new mongoose.Schema({
 originalUrl:String,
 shortenUrl:String,
 userId: { type: String, required: true },

},{timestamps: true} );


const urlModel = mongoose.model('Urls', urlSchema);

export default urlModel;