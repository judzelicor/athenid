const express = require('express')
const multer = require('multer')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')

const PORT = 5000
const app = express()

app.use(cors())

const upload = multer({dest: 'uploads/'})

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No valid resume was uploaded'})
        }

        const formData = new FormData()
        formData.append('resume', fs.createReadStream(req.file.path))

        const response = await axios.post('http://localhost:8000/extract_resume_data', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
    
    catch(error) {
        console.log('We couldn\'t process your resume:', error)

        return res.status(500).json({error: 'We couldn\'t process your resume.'})
    }

})