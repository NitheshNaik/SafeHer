# ml_service/app.py
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import uvicorn
from typing import Optional
import shutil
import os

app = FastAPI()

# Simple model placeholder. Replace with your real model.
def dummy_predict_from_file(path: str):
    # Replace this function with actual model inference.
    # Example return format:
    # {"label":"benign","confidence":0.72}
    # For demo, we randomize or return a deterministic result.
    return {"label": "benign", "confidence": 0.72}

@app.post("/predict/file")
async def predict_file(file: UploadFile = File(...)):
    try:
        tmp_dir = "ml_uploads"
        os.makedirs(tmp_dir, exist_ok=True)
        tmp_path = os.path.join(tmp_dir, file.filename)
        with open(tmp_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        result = dummy_predict_from_file(tmp_path)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

class UrlIn(BaseModel):
    image_url: str

@app.post("/predict/url")
async def predict_url(data: UrlIn):
    # Accepts a local file path (or HTTP URL if you extend it)
    image_url = data.image_url
    if image_url.startswith("/"):  # treat as local filesystem path
        if not os.path.exists(image_url):
            return JSONResponse(status_code=404, content={"error": "file not found"})
        result = dummy_predict_from_file(image_url)
        return JSONResponse(content=result)
    else:
        # If remote HTTP URL: download then predict (not implemented here)
        return JSONResponse(status_code=400, content={"error": "only local path demo supported"})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
