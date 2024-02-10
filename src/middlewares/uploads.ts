import multer from "multer";

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    const filename = `${uniquePreffix}_${originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
