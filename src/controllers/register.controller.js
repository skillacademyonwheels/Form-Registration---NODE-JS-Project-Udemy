import { validationResult } from "express-validator";
import { Registration } from "../models/registration.model.js";


/* Create a new registration */
export async function createRegistration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    const { name, mobile, dob } = req.body;

    // optional: prevent duplicate by mobile
    const existing = await Registration.findOne({ mobile });
    if (existing) {
        return res.status(409).json({ success:false, message: "Mobile already registered." });
    }

    const doc = await Registration.create({ name, mobile, dob });
    return res.status(201).json({ success:true, message: "Registered successfully", data: doc });
}

/* Get all registrations */
export async function getAllRegistrations(req, res) {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return res.status(200).json({ 
        success:true, 
        data: registrations });
}


