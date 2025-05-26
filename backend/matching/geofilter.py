import pandas as pd
from geopy.distance import geodesic
from .blood_utils import is_compatible

def find_matches(recipient, df):
    matches = []
    for _, row in df.iterrows():
        if row["organ_donating"] == recipient["organ_needed"] and is_compatible(recipient["blood_type"], row["blood_type"]):
            distance = geodesic(
                (recipient["latitude"], recipient["longitude"]),
                (row["latitude"], row["longitude"])
            ).km
            matches.append((row.to_dict(), distance))
    return sorted(matches, key=lambda x: x[1])