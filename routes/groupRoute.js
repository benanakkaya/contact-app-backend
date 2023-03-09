import express from "express";
import { createGroup, deleteGroup, editGroup } from "../controllers/groupController.js";


const router = express.Router();

router.post("/create",createGroup);
router.post("/edit",editGroup);
router.post("/delete",deleteGroup);


export default router;