import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("asset", req.app.locals.assets);
    cb(null, req.app.locals.assets);
  },
  filename: (req, file, cb) => {
    // console.log("name", file.originalname);

    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
export default upload;
