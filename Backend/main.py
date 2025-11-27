from fastapi import FastAPI, Request, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine, SessionLocal
from models import User

Base.metadata.create_all(engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
  db = SessionLocal()
  try:                              
      yield db
  finally:
      db.close()

@app.post("/submit")
async def submit_user(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    new_user = User(name=data.get("name"), email=data.get("email"))
    db.add(new_user)
    db.commit()
    return {"message": "RECORDED"}