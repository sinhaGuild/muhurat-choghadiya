import datetime
from typing import Dict, List, Union

from pydantic import BaseModel

choghadiya_order_day = [
    ['Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'],
    ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit'],
    ['Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'],
    ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh'],
    ['Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh'],
    ['Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal'],
    ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal']
]

choghadiya_order_night = [
    ['Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'],
    ['Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal'],
    ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal'],
    ['Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg'],
    ['Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'],
    ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog'],
    ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh']
]

drishyam_day = [
    [(4, 'Vaar Vela'), (5, 'Kaal Vela')],
    [(7, 'Vaar Vela'), (2, 'Kaal Vela')],
    [(2, 'Vaar Vela'), (6, 'Kaal Vela')],
    [(5, 'Vaar Vela'), (3, 'Kaal Vela')],
    [(8, 'Vaar Vela'), (7, 'Kaal Vela')],
    [(3, 'Vaar Vela'), (4, 'Kaal Vela')],
    [(6, 'Vaar Vela'), (1, 'Kaal Vela'), (8, 'Kaal Vela')]
]

drishyam_night = [
    [(6, 'Kaal Ratri')],
    [(4, 'Kaal Ratri')],
    [(2, 'Kaal Ratri')],
    [(7, 'Kaal Ratri')],
    [(5, 'Kaal Ratri')],
    [(3, 'Kaal Ratri')],
    [(1, 'Kaal Ratri'), (8, 'Kaal Ratri')]
]

rahu_day = [2, 7, 5, 6, 4, 3, 8]


class Prediction(BaseModel):
    start_time: str
    end_time: str
    choghadiya: str
    drishyam: str
    rahu: str
    time_of_day: str


class Metadata(BaseModel):
    location: str
    state: str
    country: str
    sunrise: str
    sunset: str
    locationId: int


class OutputData(BaseModel):
    id: str
    date: datetime.date
    metadata: Metadata
    prediction: List[Prediction]
    createdAt: datetime.datetime


class InputData(BaseModel):
    date: Union[datetime.date, None] = None
    city: Union[str, None] = None


class InputDataGranular(BaseModel):
    date: Union[datetime.date, None] = None
    city: Union[str, None] = None
    lat: Union[float, None] = None
    lon: Union[float, None] = None


class AutocompleteInput(BaseModel):
    city: Union[str, None] = None


class AutocompleteResponse(BaseModel):
    city: Union[str, None] = None
    lat: Union[float, None] = None
    lon: Union[float, None] = None
