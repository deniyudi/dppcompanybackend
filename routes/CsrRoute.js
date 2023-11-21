import express from "express";
import { getCSR,getCsrById, createCSR } from "../controllers/CsrController.js";

const router = express.Router();

router.get('/csr',getCSR);
router.get('/csr/:id',getCsrById);
router.post('/csr',createCSR);


export default router;