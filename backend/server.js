import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3986;

// Enable CORS with explicit origin configuration
const allowedOrigins = [
  "https://ielts-hacks.vercel.app",
  "http://localhost:3999",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log for debugging
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper function to get directory path
const getDirPath = (folderPath = "") => {
  if (!folderPath || folderPath === "root") {
    return uploadsDir;
  }
  const safePath = folderPath
    .split("/")
    .filter((p) => p && p !== ".." && p !== ".")
    .join(path.sep);
  return path.join(uploadsDir, safePath);
};

// Helper function to check if path is safe
const isPathSafe = (folderPath) => {
  const resolved = path.resolve(uploadsDir, folderPath);
  return resolved.startsWith(uploadsDir);
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = req.body.folderPath || "root";
    const targetDir = getDirPath(folderPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types
    cb(null, true);
  },
});

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Create folder endpoint
app.post("/api/folders", (req, res) => {
  try {
    const { folderName, parentPath = "root" } = req.body;

    if (!folderName || !folderName.trim()) {
      return res.status(400).json({ error: "Folder name is required" });
    }

    const parentDir = getDirPath(parentPath);
    const newFolderPath = path.join(parentDir, folderName.trim());

    if (!isPathSafe(path.relative(uploadsDir, newFolderPath))) {
      return res.status(400).json({ error: "Invalid folder path" });
    }

    if (fs.existsSync(newFolderPath)) {
      return res.status(400).json({ error: "Folder already exists" });
    }

    fs.mkdirSync(newFolderPath, { recursive: true });

    res.status(200).json({
      message: "Folder created successfully",
      folderName: folderName.trim(),
      path:
        parentPath === "root"
          ? folderName.trim()
          : `${parentPath}/${folderName.trim()}`,
    });
  } catch (error) {
    console.error("Create folder error:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
});

// Get folders and files endpoint
app.get("/api/files", (req, res) => {
  try {
    const folderPath = req.query.folderPath || "root";
    const targetDir = getDirPath(folderPath);

    if (!fs.existsSync(targetDir)) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const items = fs
      .readdirSync(targetDir, { withFileTypes: true })
      .map((item) => {
        const itemPath = path.join(targetDir, item.name);
        const stats = fs.statSync(itemPath);
        const relativePath = path.relative(uploadsDir, itemPath);
        const urlPath = relativePath.split(path.sep).join("/");

        if (item.isDirectory()) {
          return {
            name: item.name,
            type: "folder",
            path:
              folderPath === "root" ? item.name : `${folderPath}/${item.name}`,
            uploadedAt: stats.birthtime.toISOString(),
            modifiedAt: stats.mtime.toISOString(),
          };
        } else {
          return {
            filename: item.name,
            name: item.name,
            type: "file",
            size: stats.size,
            uploadedAt: stats.birthtime.toISOString(),
            modifiedAt: stats.mtime.toISOString(),
            path: `/uploads/${urlPath}`,
            folderPath: folderPath,
          };
        }
      });

    res.status(200).json({
      items: items,
      count: items.length,
      folderPath: folderPath,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// Upload file endpoint
app.post("/api/files/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const folderPath = req.body.folderPath || "root";
    const relativePath = path.relative(uploadsDir, req.file.path);
    const urlPath = relativePath.split(path.sep).join("/");

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: `/uploads/${urlPath}`,
      folderPath: folderPath,
      uploadedAt: new Date().toISOString(),
    };

    res.status(200).json({
      message: "File uploaded successfully",
      file: fileInfo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Upload multiple files endpoint
app.post(
  "/api/files/upload-multiple",
  upload.array("files", 10),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const folderPath = req.body.folderPath || "root";
      const files = req.files.map((file) => {
        const relativePath = path.relative(uploadsDir, file.path);
        const urlPath = relativePath.split(path.sep).join("/");
        return {
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          path: `/uploads/${urlPath}`,
          folderPath: folderPath,
          uploadedAt: new Date().toISOString(),
        };
      });

      res.status(200).json({
        message: "Files uploaded successfully",
        files: files,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  }
);

// Get single file info endpoint
app.get("/api/files/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const folderPath = req.query.folderPath || "root";
    const targetDir = getDirPath(folderPath);
    const filePath = path.join(targetDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const stats = fs.statSync(filePath);
    const relativePath = path.relative(uploadsDir, filePath);
    const urlPath = relativePath.split(path.sep).join("/");

    const fileInfo = {
      filename: filename,
      size: stats.size,
      uploadedAt: stats.birthtime.toISOString(),
      modifiedAt: stats.mtime.toISOString(),
      path: `/uploads/${urlPath}`,
      folderPath: folderPath,
    };

    res.status(200).json({ file: fileInfo });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch file info" });
  }
});

// Delete file/folder endpoint
app.delete("/api/files/:name", (req, res) => {
  try {
    const name = req.params.name;
    const folderPath = req.query.folderPath || "root";
    const targetDir = getDirPath(folderPath);
    const itemPath = path.join(targetDir, name);

    if (!fs.existsSync(itemPath)) {
      return res.status(404).json({ error: "Item not found" });
    }

    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(itemPath);
    }

    res.status(200).json({
      message: "Item deleted successfully",
      name: name,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Move file/folder endpoint
app.post("/api/files/move", (req, res) => {
  try {
    const { name, sourcePath, destinationPath, type } = req.body;

    if (!name || !sourcePath || !destinationPath) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const sourceDir = getDirPath(sourcePath);
    const destDir = getDirPath(destinationPath);
    const sourceItemPath = path.join(sourceDir, name);
    const destItemPath = path.join(destDir, name);

    if (!fs.existsSync(sourceItemPath)) {
      return res.status(404).json({ error: "Source item not found" });
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(destItemPath)) {
      return res.status(400).json({ error: "Destination item already exists" });
    }

    fs.renameSync(sourceItemPath, destItemPath);

    res.status(200).json({
      message: "Item moved successfully",
      name: name,
    });
  } catch (error) {
    console.error("Move error:", error);
    res.status(500).json({ error: "Failed to move item" });
  }
});

// Copy file endpoint
app.post("/api/files/copy", (req, res) => {
  try {
    const { name, sourcePath, destinationPath, type } = req.body;

    if (!name || !sourcePath || !destinationPath) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const sourceDir = getDirPath(sourcePath);
    const destDir = getDirPath(destinationPath);
    const sourceItemPath = path.join(sourceDir, name);
    const destItemPath = path.join(destDir, name);

    if (!fs.existsSync(sourceItemPath)) {
      return res.status(404).json({ error: "Source item not found" });
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(destItemPath)) {
      return res.status(400).json({ error: "Destination item already exists" });
    }

    const stats = fs.statSync(sourceItemPath);
    if (stats.isDirectory()) {
      // Copy directory recursively
      fs.cpSync(sourceItemPath, destItemPath, { recursive: true });
    } else {
      // Copy file
      fs.copyFileSync(sourceItemPath, destItemPath);
    }

    res.status(200).json({
      message: "Item copied successfully",
      name: name,
    });
  } catch (error) {
    console.error("Copy error:", error);
    res.status(500).json({ error: "Failed to copy item" });
  }
});

// Password verification endpoint
app.post("/api/admin/verify", (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PWD;

    if (!adminPassword) {
      return res.status(500).json({ error: "Admin password not configured" });
    }

    if (password === adminPassword) {
      res.status(200).json({ success: true, message: "Password verified" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).json({ error: "Failed to verify password" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
});
