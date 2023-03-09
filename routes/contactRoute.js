import express from "express";
import { deleteContact, editContact, getUserContacts, newContact } from "../controllers/contactController.js";




const router = express.Router();


router.post("/newContact", newContact);
router.post("/editContact", editContact);
router.post("/deleteContact", deleteContact);
router.post("/getUserContacts", getUserContacts);


export default router;