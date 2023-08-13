import sharp from "sharp";
import express from 'express';

const app = express();
app.use(express.static('public'));

// create dirname 
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const photoCropController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "No Image Uploaded" });
        }
        const imageBuffer = req.file.buffer;
        const croppedBuffer = await sharp(imageBuffer)
            .metadata()
            .then(metadata => {
                const width = Math.round(metadata.width * 0.50);
                const height = Math.round(metadata.height * 0.50);

                return sharp(imageBuffer)
                    .extract({ left: metadata.width - width, top: 0, width, height })
                    .toBuffer();
            });

        const croppedFileName = `Cropped_${Date.now()}.jpg`;
        const croppedFilePath = path.join(__dirname, 'public', croppedFileName);

        await sharp(croppedBuffer).toFile(croppedFilePath);


        return res.status(200).send({ success: true, message: "Image Cropped Successfully", croppedImageUrl: `http://localhost:8000/public/${croppedFileName}` });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error in crop image", error });
    }
}