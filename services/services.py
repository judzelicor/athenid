from fastapi import FastAPI, File, UploadFile
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io

app = FastAPI()
PORT = 8000

@app.post('/extract_resume_data')

async def extract_resume_data(resume: UploadFile = File(...)):
    """
    Use OCR to extract user data into objects that can be manipulated easily
    """
    print("Reached python function!")
    try:
        pdf_bytes = await resume.read()
        images = convert_from_bytes(pdf_bytes)

        extracted_data = ''

        for img in images:
            extracted_data += pytesseract.image_to_string(img)

        resume_data = {
            'raw_text': extracted_data.strip()
        }

        print(resume_data)

        return resume_data

    except Exception as error:
        return { 'error': f"Failed to process the resume: {str(error)}"}
    

# Run the server
if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="localhost", port=PORT)