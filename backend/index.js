const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3002;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/api/rembg', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
    const scriptPath = path.join(__dirname, 'scripts', 'remove_background.py');
    const pythonProcess = spawn('python', [scriptPath, imagePath]);

    pythonProcess.stdout.on('data', (data) => {
        const processedImagePath = data.toString().trim();
        res.sendFile(processedImagePath);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Error processing image');
    });
});

app.post('/api/scale', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
    const scaleFactor = req.body.scaleFactor || '2'; // Default to 2x
    const scriptPath = path.join(__dirname, 'scripts', 'scale_image.py');
    const pythonProcess = spawn('python', [scriptPath, imagePath, scaleFactor]);

    pythonProcess.stdout.on('data', (data) => {
        const processedImagePath = data.toString().trim();
        res.sendFile(processedImagePath);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Error processing image');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
