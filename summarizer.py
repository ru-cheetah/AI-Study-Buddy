import os
from pdf2image import convert_from_path
import pytesseract
from transformers import pipeline
from PIL import Image
import tempfile

# Configure Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

def pdf_to_images(pdf_path, dpi=300):
    try:
        images = convert_from_path(pdf_path, dpi=dpi, poppler_path=r'C:/Users/ruchi/Downloads/Release-24.07.0-0/poppler-24.07.0/Library/bin')
        return images
    except Exception as e:
        print(f"Error converting PDF to images: {e}")
        return []

def ocr_images(images, lang='eng'):
    text = ""
    for i, image in enumerate(images):
        try:
            page_text = pytesseract.image_to_string(image, lang=lang)
            text += f"\n\n--- Page {i + 1} ---\n\n{page_text}"
        except Exception as e:
            print(f"Error performing OCR on page {i + 1}: {e}")
    return text

def summarize_text(text, max_length=130, min_length=30):
    try:
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        from math import ceil

        max_words = max_length * 1.3
        words = text.split()
        num_chunks = ceil(len(words) / max_words)
        summaries = []

        for i in range(num_chunks):
            chunk = ' '.join(words[i*int(max_words):(i+1)*int(max_words)])
            summary = summarizer(chunk, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
            summaries.append(summary)

        return ' '.join(summaries)
    except Exception as e:
        print(f"Error during summarization: {e}")
        return ""
