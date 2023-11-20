
const mongoose = require('mongoose')
const express = require('express')
const mysql = require('mysql2');
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const rs =require('rs')
const FileModel = require('./model/File')

const app = express();
app.use(express.json())
app.use(cors())

  app.use('/image', express.static('public', { 'Content-Type': 'image/png' }));

mongoose.connect('mongodb://127.0.0.1:27017/tsdn')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/image")
    },
    filename: (req, file, callback) => {
        console.log(file)
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.use(express.static('public', { 'extensions': ['html'], 'index': 'default.html', 'contentType': 'video/mp4' }));

app.get('/video/:filename', (req, res) => {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, 'public', 'image', filename);

    // Gunakan header untuk menentukan tipe konten video
    res.header('Content-Type', 'video/mp4');

    // Gunakan stream untuk menyajikan video
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
});

    app.post("/upload", upload.single("file"), (req, res) => {
        const {address} = req.body
        FileModel.create({image:req.file.filename, address})
        .then(result => res.json(result))
        .catch(err => console.log(err))
    })

    app.get('/all', async (req, res) => {
        try {
          const allData = await FileModel.find();
          res.json(allData);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

app.get("/get/image", (req, res) => {
    FileModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get("/generate", (req, res) => {
        try {
            const response = axios.post('http://localhost:5000/detect_objects', {
                image_path: req.query.path,
            });
            console.log("Successfull");
            console.log(response.data.output_path);
        } catch (error) {
            console.error(error.message);
        }
})

app.listen("1000", () => {
    console.log('server running at 8080')
})

