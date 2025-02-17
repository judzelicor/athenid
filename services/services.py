from fastapi import FastAPI, File, UploadFile
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import os
import cv2
import numpy as np
import pandas as pd

app = FastAPI()
PORT = 8000

@app.post('/extract_resume_data')
async def extract_resume_data(resume: UploadFile = File(...)):
    """
    Use OCR to extract user data into objects that can be manipulated easily
    """
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
    

@app.post('/extract_image_data')
async def extract_image_data(file: UploadFile = File(...)):
    print("✅ File received in FastAPI!")

    # Save file temporarily
    file_path = save_uploaded_file(file)

    # Step 1: Preprocess image
    gray, thresh = preprocess_image(file_path)

    # Step 2: Detect columns
    day_columns = detect_columns(thresh)

    # Step 3: Extract and structure OCR text
    schedule_data = extract_text_from_columns(gray, day_columns)

    print(schedule_data)

    return schedule_data

    # lines = [line.strip() for line in column_text.split("\n") if line.strip()]
    # for i in range(0, len(lines), 3):  # Group every 3 lines
    #     if i+2 < len(lines):
    #         class_name = lines[i]
    #         section = lines[i+1]
    #         location = lines[i+2]
    #         schedule_dict[weekdays[i]]["classes"].append(...)
    # # Initialize structured schedule dictionary
    # schedule_dict = { "Monday": {"classes": []},
    #                 "Tuesday": {"classes": []},
    #                 "Wednesday": {"classes": []},
    #                 "Thursday": {"classes": []},
    #                 "Friday": {"classes": []} }
    
    #         # Map columns to weekdays (Assuming Monday-Friday order)
    # weekdays = list(schedule_dict.keys())

    # # Process each detected day column
    # for i, (x, y, w, h) in enumerate(day_columns[:5]):  # Limit to 5 columns (Mon-Fri)
    #     column_crop = gray[y:y+h, x:x+w]  # Crop the column
    #     column_text = pytesseract.image_to_string(column_crop, config='--oem 3 --psm 4').strip()

    #     print(column_text)

    #     # Split into class blocks (each block should be 3 lines: Class, Section, Location)
    #     class_blocks = column_text.split("\n\n")  # Split blocks based on OCR gaps

    #     for block in class_blocks:
    #         lines = block.strip().split("\n")  # Split by lines inside each block
    #         if len(lines) >= 3:
    #             class_name = lines[0]
    #             section = lines[1]
    #             location = lines[2]
    #             schedule_dict[weekdays[i]]["classes"].append({"class": class_name, "section": section, "location": location})

def extract_text_from_columns(gray, columns):
    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    schedule_dict = {day: {"classes": []} for day in weekdays}

    for i, (x, y, w, h) in enumerate(columns):
        column_crop = gray[y:y+h, x:x+w]

        # Preprocess column for better OCR
        column_crop = cv2.resize(column_crop, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
        column_crop = cv2.GaussianBlur(column_crop, (3, 3), 0)

        # Run OCR
        column_text = pytesseract.image_to_string(column_crop, config='--oem 3 --psm 6').strip()
        print(f"Column {i} text:\n{column_text}\n{'-'*50}")

        # Process lines
        lines = [line.strip() for line in column_text.split("\n") if line.strip()]
        for j in range(0, len(lines), 3):
            if j+2 < len(lines):
                schedule_dict[weekdays[i]]["classes"].append({
                    "class": lines[j],
                    "section": lines[j+1],
                    "location": lines[j+2]
                })

    return schedule_dict

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 15, 4
    )
    return gray, thresh

# Function to detect day columns
def detect_columns(thresh):
    vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 30))
    vertical_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, vertical_kernel, iterations=2)
    dilated_vertical = cv2.dilate(vertical_lines, np.ones((3, 3), np.uint8), iterations=3)

    contours, _ = cv2.findContours(dilated_vertical, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    columns = sorted(
        [r for r in [cv2.boundingRect(c) for c in contours] if r[3] > r[2] and r[2] > 50],
        key=lambda x: x[0]
    )

    if len(columns) < 5:
        raise ValueError(f"Not enough columns detected! Found: {len(columns)}")

    return columns[:5]  # Ensure exactly 5 columns (Monday-Friday)



def save_uploaded_file(uploaded_file: UploadFile) -> str:
    """
    Saves the uploaded file to a temporary location and returns the file path.
    """
    if uploaded_file is None:
        print("❌ Error: No file received in save_uploaded_file!")
        return None

    file_location = f"temp_{uploaded_file.filename}"
    
    try:
        with open(file_location, "wb") as buffer:
            buffer.write(uploaded_file.file.read())  # Read & write file content

        print(f"✅ File successfully saved at {file_location}")
        return file_location
    except Exception as e:
        print(f"❌ Error saving file: {e}")
        return None


# Run the server
if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="localhost", port=PORT)