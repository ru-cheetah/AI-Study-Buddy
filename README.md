# AI-Study-Buddy

# SUMMARIZER

# PDF Summarizer with OCR and Indexing

This project extracts text from PDF files using OCR (Optical Character Recognition), summarizes the content using NLP, and indexes the summarized data for easy search and retrieval.

## Features
- Convert PDF pages to images.
- Perform OCR to extract text from images.
- Summarize extracted text using Hugging Face's Transformers.
- Index and search summarized content using Whoosh.

## Prerequisites

1. **Python 3.7+** is required for this project.
2. **Tesseract OCR**: You'll need to install the Tesseract OCR engine on your machine.
3. **Poppler**: Required for converting PDF pages to images.

### Install Tesseract
- **Windows**: Download and install Tesseract from [here](https://github.com/tesseract-ocr/tesseract/wiki).
- **macOS**: Install using Homebrew:
    ```bash
    brew install tesseract
    ```
- **Linux**: Install using APT:
    ```bash
    sudo apt update
    sudo apt install tesseract-ocr
    ```

### Install Poppler
- **Windows**: Download Poppler from [here](http://blog.alivate.com.au/poppler-windows/) and add the `bin/` directory to your PATH.
- **macOS**: Install using Homebrew:
    ```bash
    brew install poppler
    ```
- **Linux**: Install using APT:
    ```bash
    sudo apt update
    sudo apt install poppler-utils
    ```

## Installation

1. Clone the repository and navigate into the project folder:

    ```bash
    git clone https://github.com/your-username/pdf-summarizer-ocr.git
    cd pdf-summarizer-ocr
    ```

2. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

3. If you are using **Windows**, you may need to specify the Tesseract installation path in the code. Open the `main.py` file and uncomment the line to set the Tesseract path:

    ```python
    # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    ```

## Usage

1. Place the PDF files you want to process in the project folder.
2. Run the script to process the PDF, summarize it, and index the summarized content.

```bash
python main.py
