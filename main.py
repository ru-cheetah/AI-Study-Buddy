from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from summarizer import pdf_to_images, ocr_images, summarize_text
from typing import List
import os
from mongo import store_user_data
import shutil
import tempfile


app = FastAPI()


# API endpoint to accept user data
@app.post("/upload_user_data/")
async def upload_user_data(
    user_name: str = Form(...),  # username from form data
    email: str = Form(...),  # email from form data
    pdf_files: List[UploadFile] = File(...)  # multiple PDF files
):
    try:
        # Call the function to store the user data and PDFs in MongoDB
        user_data = store_user_data(user_name, email, pdf_files)
        return {"message": "User data and PDFs uploaded successfully", "user_data": user_data}
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    

@app.post("/summarize_pdf/")
async def summarize_pdf(pdf_file: UploadFile = File(...)):
    try:
        # Save uploaded PDF temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            shutil.copyfileobj(pdf_file.file, temp_pdf)
            temp_pdf_path = temp_pdf.name

        # Step 1: Convert PDF to Images
        images = pdf_to_images(temp_pdf_path)
        if not images:
            raise HTTPException(status_code=400, detail="Failed to convert PDF to images.")

        # Step 2: Perform OCR on the images to extract text
        extracted_text = ocr_images(images)
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="No text could be extracted from the PDF.")

        # Step 3: Summarize the extracted text
        summary = summarize_text(extracted_text)
        if not summary:
            raise HTTPException(status_code=500, detail="Failed to summarize the text.")

        # Clean up temporary PDF file
        os.remove(temp_pdf_path)

        return {"summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")