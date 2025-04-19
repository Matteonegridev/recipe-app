import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../public/images");

// Create folder if it doesn't exist:
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Writing to:", filePath);
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    cb(null, `${date}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single("imageUrl");
