import express from "express";
import { getBerita,getBeritaById, createBerita,updateBerita,deleteBerita } from "../controllers/BeritaController.js";

const router = express.Router();

router.get('/berita',getBerita);
router.get('/berita/:id',getBeritaById);
router.post('/berita',createBerita);
router.patch('/berita/:id',updateBerita);
router.delete('/berita/:id',deleteBerita);


export default router;