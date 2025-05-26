from fastapi import FastAPI
from app.models import Recipient
from matching.geofilter import find_matches
from llm.query_ollama import build_prompt, query_deepseek
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pandas as pd
import sys
import os

# Load environment variables from .env file
load_dotenv()

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # safer than "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MongoDB connection using URI from .env
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["life_Patch"]
donor_collection = db["donors"]

@app.post("/match")
def match_donors(recipient: Recipient):
    # Load donor data from MongoDB into a DataFrame
    donor_cursor = donor_collection.find({})
    donor_df = pd.DataFrame(list(donor_cursor))

    # Remove MongoDB-specific "_id" column if present
    if "_id" in donor_df.columns:
        donor_df.drop(columns=["_id"], inplace=True)

    # Match using filtering logic
    matches = find_matches(recipient.dict(), donor_df)

    # Build LLM prompt
    prompt = build_prompt(matches[:5], recipient.dict())
    llm_response = query_deepseek(prompt)

    # Prepare top 5 matches with distance
    top_matches_with_distance = []
    for match_data, distance in matches[:5]:
        match_info = match_data.copy()
        match_info['distance_km'] = round(distance, 2)
        top_matches_with_distance.append(match_info)

    return {
        "top_matches": top_matches_with_distance,
        "llm_ranking": llm_response
    }
