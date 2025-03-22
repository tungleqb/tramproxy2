from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Cho phép gọi từ frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hoặc chỉ: ["http://100.88.204.66:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"message": "Welcome to TramProxy API"}

@app.get("/proxies")
def get_proxies():
    return [
        {"ip": "192.168.1.1", "port": "3128", "type": "HTTP", "status": "active"}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
