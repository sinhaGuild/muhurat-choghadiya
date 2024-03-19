import datetime
import os
import sys
from typing import List

import requests
from dotenv import load_dotenv

from api.choghadiya.constants import AutocompleteInput, AutocompleteResponse

load_dotenv()

OWM_API_KEY = os.getenv("OWM_API_KEY") or "OWM_API_KEY"
OWM3_URL = os.getenv("OWM3_URL") or "OWM3_URL"
OWM2_URL = os.getenv("OWM2_URL") or "OWM2_URL"
OWM_GEOCODE_URL = os.getenv("OWM_GEOCODE_URL") or "OWM_GEOCODE_URL"


def get_city_names_for_autocomplete(input: AutocompleteInput) -> List[AutocompleteResponse]:
    response = requests.get(
        f'{OWM_GEOCODE_URL}?q={input.city}&limit=5&appid={OWM_API_KEY}')
    data = response.json()

    response = []

    for c in data:
        res = AutocompleteResponse(
            city=f"{c['name']}, {c.get('state', 0)}, {c.get('country', 0)}",
            lat=float(c['lat']),
            lon=float(c['lon'])
        )
        response.append(res)
        # print(c)

    return response
