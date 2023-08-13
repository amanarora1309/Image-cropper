import express from 'express';
import morgan from 'morgan';
import router from './routes/route.js';
import cors from 'cors';

// rest object 
const app = express();


// create dirname 
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api", router);


app.use("/public", express.static(__dirname + '/controllers/public'));

// app.use(express.static('public'));
// app.get('/public/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const imagePath = path.join(__dirname, 'controllers/public', filename);
//     console.log(imagePath)

//     res.sendFile(imagePath);
// });




// PORT
const PORT = 8000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});