import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

//Multer have differnet type of storage like amazon bucket or server
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/"); //null is error
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, callback) {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const minetype = fileTypes.test(file.minetype);

  if (extname && minetype) {
    return callback(null, true);
  } else {
    callback("Image Only!"); //null is error
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded!",
    image: `/${req.file.path}`,
  });
});

export default router;
