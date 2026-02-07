import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2 },
        mobile: { type: String, required: true, match: /^\d{10}$/ },
        dob: { type: Date, required: true },
    },
    { timestamps: true }
);

export const Registration = mongoose.model("Registration", registrationSchema);
