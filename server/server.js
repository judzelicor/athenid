const express = require('express')
const multer = require('multer')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const FormData = require('form-data')

const PORT = 3001
const app = express()

app.use(cors())

const upload = multer({dest: 'uploads/'})

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    console.log("REACHED!")

    try {
        if (!req.file) {
            return res.status(400).json({error: 'No valid resume was uploaded'})
        }

        const formData = new FormData()
        formData.append('resume', fs.createReadStream(req.file.path))

        const response = await axios.post('http://localhost:8000/extract_resume_data', formData, {
            headers: formData.getHeaders()
        })

        fs.unlinkSync(req.file.path)

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