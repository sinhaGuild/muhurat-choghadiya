import datetime
from typing import List
from uuid import uuid4

from fastapi import APIRouter

from api.choghadiya.constants import *

from api.choghadiya import (
    analytics_update,
    run_analytics,
    calculate_with_OpenWeatherMap,
    get_city_names_for_autocomplete
)

router = APIRouter()

allPreds = []
analytics = {}


@router.get("/healthchecker", tags=["Diagnostic"])
def healthchecker():
    return {"status": "success", "message": "FastAPI up and running."}


# Route to get all todo items
@router.get("/history", tags=["History"])
def get_all_prev_predictions():
    return allPreds

# Router to delete all history


@router.get("/history/delete", tags=["History"])
def delete_all_prev_predictions():
    allPreds.clear()
    analytics.clear()
    return {"status": "success", "message": "History cleared."}

# Router to delete all previous analytics data


@router.get("/data/delete", tags=["Analytics"])
def delete_all_prev_analytics_data():
    analytics.clear()
    return {"status": "success", "message": "Analytics cleared."}


@router.post("/owm4", tags=["OWM"])
async def get_granular_prediction_with_OWM(input: InputDataGranular):
    # date = datetime.datetime.strptime(input.date, "%Y-%m-%d")
    dt = datetime.datetime(input.date.year, input.date.month, input.date.day)
    ch, md = calculate_with_OpenWeatherMap(
        city=input.city, lat=input.lat, lon=input.lon, date=dt)
    # out = {"date": input.date, "city": input.city,
    #        "prediction": ch, "createdAt": datetime.datetime.now()}
    out = OutputData(id=str(uuid4()), date=input.date, metadata=Metadata.parse_obj(md),
                     prediction=[Prediction.parse_obj(c) for c in ch], createdAt=datetime.datetime.now())
    allPreds.append(out)

    await analytics_update(analytics=analytics, out=out)

    return out


@router.post("/autocomplete", tags=["OWM"])
async def get_autocomplete(input: AutocompleteInput) -> List[AutocompleteResponse]:
    return get_city_names_for_autocomplete(input)


@router.get("/data", tags=["Analytics"])
async def get_data_from_PyOWM():
    if (len(allPreds) == 0 | len(analytics) == 0):
        return "No predictions have been made."

    target = await run_analytics(analytics)

    return target
