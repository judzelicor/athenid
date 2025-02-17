import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import axios from 'axios'
import styles from './SettingsView.module.css'

export default function SettingView() {
    const [uploadedUserResume, setUploadedUserResume] = useState(null)

    // Dropzone configuration
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 
            'application/pdf': [],
            'image/png': []
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setUploadedUserResume(acceptedFiles[0])
                console.log(acceptedFiles[0])
            }
        },
    });

    const handleClick = async () => {
        if (!uploadedUserResume) {
            console.log('Please upload a valid resume')
            return
        }

        const formData = new FormData()
        formData.append('resume', uploadedUserResume)

        try {
            const response = await axios.post('http://localhost:3001/upload-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            console.log(response)
        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <h3>Settings</h3>
                <div>
                    {/* Drag and Drop Area */}
                    <div className={styles['dropzone']}>
                        <div
                            {...getRootProps()}
                            style={{
                                border: "2px dashed #ccc",
                                padding: "20px",
                                textAlign: "center",
                                cursor: "pointer",
                                borderRadius: "8px",
                                backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
                            }}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the file here...</p>
                            ) : (
                                <p>Drag & drop a PDF file here, or click to select one</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleClick}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}