import mongoose from "mongoose";
import { Express } from "express";


const userSchema = new mongoose.Schema({
    email: { type:String, required: true },
    createdAt: { type: Date, default: Date.now },
    user_id: { type: Number, required: true },
    companyId: { type: [String], required: true },
    role: { type: [String], required: true },
    acl: { type: [String] },
    personalDetails: {
        Image: {  },
        PhoneNo: {  },
    }
});


const UserDetails = mongoose.model('UserDetails', userSchema);


module.exports = UserDetails;

