import express from "express";
import { getData,getDataById,updateData,createData,deleteData } from "../controllers/Controllers.js";

const router = express.Router();

router.get('/upload',getData);
router.get('/upload/:id',getDataById);
router.post('/upload',createData);
router.patch('/upload/:id',updateData);
router.delete('/upload/:id',deleteData);


export default router;