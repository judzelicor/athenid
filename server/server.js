const express = require('express')
const multer = require('multer')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const FormData = require('form-data')

const PORT = 3001
const app = express()

app.use(cors())

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/png']

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('The file received is not in a valid format'), false)
        }

        cb(null, true)
    }
})

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    console.log("REACHED!")

    try {
        if (!req.file) {
            return res.status(400).json({error: 'No valid resume was uploaded'})
        }

        const filePath = req.file.path
        const fileType = req.file.mimetype

        const formData = new FormData()
        
        // Branch depending on file type
        let APIEndpoint = ''
        
        console.log(fileType)
        
        if (fileType === 'application/pdf') {
            APIEndpoint = 'http://localhost:8000/extract_resume_data'
            formData.append('resume', fs.createReadStream(filePath))
        } else if (fileType === 'image/png') {
            APIEndpoint = 'http://localhost:8000/extract_image_data'
            formData.append('file', fs.createReadStream(filePath))
        }

        const response = await axios.post(APIEndpoint, formData, {
            headers: formData.getHeaders()
        })

        fs.unlinkSync(filePath)

        console.log(response.data)

        return res.json(response.data)

    }
    
    catch(error) {
        console.log('We couldn\'t process your resume:', error)

        return res.status(500).json({error: 'We couldn\'t process your resume.'})
    }

})

app.listen(PORT, () => {
    console.log(`Athenid python services backend is listening on PORT ${PORT}`)
})