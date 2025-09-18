import multer from "multer";
import path from "path";
import fs from "fs";

// Folder create karna agar exist na kare
export const createUploadFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Multer storage factory function
export const uploadFile = (folder = "uploads") => {
  const uploadPath = path.join("public/uploads", folder);
  createUploadFolder(uploadPath);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    // only images allowed
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed!"), false);
    } else {
      cb(null, true);
    }
  };

  return multer({ storage, fileFilter });
};
