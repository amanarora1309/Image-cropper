import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, 'uploads');
//     },
//     filename: function (req, file, callback) {
//         req['file_name'] = file.originalname;

//         callback(null, file.originalname);
//     }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;