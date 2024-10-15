from pymongo import MongoClient
from fastapi import FastAPI, UploadFile
from typing import List
import gridfs

def object_id_to_str(user_data):
    if 'pdfs' in user_data:
        for pdf in user_data['pdfs']:
            pdf['file_id'] = str(pdf['file_id'])
    user_data['_id'] = str(user_data['_id'])
    return user_data


# MongoDB connection and data storage function
def store_user_data(user_name: str, email: str, pdf_files: List[UploadFile]):
    if len(pdf_files) > 5:
        raise ValueError("Cannot upload more than 5 PDFs.")
    
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017')  # Replace with your MongoDB URI
    db = client['PDFs']

    # GridFS setup
    fs = gridfs.GridFS(db)

    # Create user document
    user_data = {
        'name': user_name,
        'email': email,
        'pdfs': []
    }

    # Store each PDF in MongoDB
    for i, pdf in enumerate(pdf_files):
        file_content = pdf.file.read()
        file_id = fs.put(file_content, filename=f'file_{i+1}.pdf')
        user_data['pdfs'].append({
            'file_id': file_id,
            'filename': pdf.filename
        })

    # Store user data and associated PDFs in a 'users' collection
    users_collection = db['users']
    result = users_collection.insert_one(user_data)

    # Fetch the stored user data and convert ObjectIds to strings
    stored_user_data = users_collection.find_one({"_id": result.inserted_id})
    return object_id_to_str(stored_user_data)