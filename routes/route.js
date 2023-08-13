import express from "express";
import upload from "../multer/upload_img.js";
import { photoCropController } from "../controllers/controller.js";

const router = express.Router();

router.post('/crop-image', upload.single("image"), photoCropController);
router.get('/test', (req, res) => {
    res.send("test");
})

export default router;