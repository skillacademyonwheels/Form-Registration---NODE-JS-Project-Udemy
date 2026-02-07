import { Router } from "express";
import { body } from "express-validator";
import { createRegistration, getAllRegistrations } from "../controllers/register.controller.js";

const router = Router();

router.get("/register", getAllRegistrations);

router.post(
    "/register",
    [
        body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 chars"),
        body("mobile").trim().matches(/^\d{10}$/).withMessage("Mobile must be 10 digits"),
        body("dob").notEmpty().withMessage("DOB is required").isISO8601().withMessage("DOB must be a valid date"),
    ],
    createRegistration
);

export default router;
