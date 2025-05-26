from pydantic import BaseModel

class Recipient(BaseModel):
    organ_needed: str
    blood_type: str
    latitude: float
    longitude: float
    urgency:int