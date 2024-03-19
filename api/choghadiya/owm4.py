import datetime
import os
import sys
from typing import List

import requests
from dotenv import load_dotenv

from api.choghadiya.constants import *

load_dotenv()

OWM_API_KEY = os.getenv("OWM_API_KEY") or "OWM_API_KEY"
OWM3_URL = os.getenv("OWM3_URL") or "OWM3_URL"
OWM2_URL = os.getenv("OWM2_URL") or "OWM2_URL"
OWM_GEOCODE_URL = os.getenv("OWM_GEOCODE_URL") or "OWM_GEOCODE_URL"


def date_to_unix(dt):
    datetime_obj = datetime.datetime.combine(dt, datetime.time())
    # Get the Unix timestamp in seconds
    unix_dt = int(datetime_obj.timestamp())
    return unix_dt


def get_city_names_for_autocomplete(input: AutocompleteInput) -> List[AutocompleteResponse]:
    response = requests.get(
        f'{OWM_GEOCODE_URL}?q={input.city}&limit=5&appid={OWM_API_KEY}')
    data = response.json()

    response = []

    for c in data:
        res = AutocompleteResponse(
            city=f"{c['name']}, {c['state']}, {c['country']}",
            lat=float(c['lat']),
            lon=float(c['lon'])
        )
        response.append(res)

    return response


def get_sunrise_sunset(lat, lon, date):

    unix_dt = date_to_unix(date)

    response = requests.get(
        f"{OWM3_URL}?lat={lat}&lon={lon}&dt={unix_dt}&appid={OWM_API_KEY}")
    data = response.json()
    # print(data)
    id = data['data'][0]['weather'][0]['id']
    sunrise = datetime.datetime.fromtimestamp(
        data['data'][0]['sunrise']) + datetime.timedelta(0, data['timezone_offset'])
    # print(f"sunrise at {sunrise}")
    sunset = datetime.datetime.fromtimestamp(
        data['data'][0]['sunset']) + datetime.timedelta(0, data['timezone_offset'])
    # print(f"sunset at {sunset}")

    return sunrise, sunset, id


def calculate_with_OpenWeatherMap(city, lat, lon, date):

    # extract city, state, country names
    city_name, state, country = city.split(",")

    # if target date is in the future, use same date from last year
    target_date = date if date < datetime.datetime.now(
    ) else date.replace(year=date.year - 1)

    # get sunrise and sunset times
    sunrise, sunset, id = get_sunrise_sunset(lat, lon, target_date)

    # calculate daytime and nighttime durations
    daytime_duration = sunset - sunrise
    nighttime_duration = datetime.timedelta(days=1) - daytime_duration

    # calculate choghadiya limits
    daytime_choghadiya = daytime_duration / 8
    nighttime_choghadiya = nighttime_duration / 8

    # build metadata
    md = {
        "location": city_name,
        "state": state,
        "country": country,
        "sunrise": sunrise.strftime('%H:%M %p'),
        "sunset": sunset.strftime('%H:%M %p'),
        "locationId": id,
    }

    # day of week calculation for choghadiya order
    n = len(choghadiya_order_day)
    day_of_week = target_date.weekday(
    ) if target_date.weekday() > n else target_date.weekday()-1

    # initialize response object
    choghadiya = []

    for i in range(8):
        choghadiya.append({
            'start_time': (sunrise + i * daytime_choghadiya).time().strftime('%H:%M %p'),
            'end_time': (sunrise + (i+1) * daytime_choghadiya).time().strftime('%H:%M %p'),
            'choghadiya': choghadiya_order_day[day_of_week+1][i],
            'drishyam': ''.join([d[1] for d in drishyam_day[day_of_week+1] if d[0] == i+1]),
            'rahu': 'Rahu Kaal' if i+1 == rahu_day[day_of_week] else '',
            'time_of_day': 'daytime',
        })
        choghadiya.append({
            'start_time': (sunset + i * nighttime_choghadiya).time().strftime('%H:%M %p'),
            'end_time': (sunset + (i+1) * nighttime_choghadiya).time().strftime('%H:%M %p'),
            'choghadiya': choghadiya_order_night[day_of_week+1][i],
            'drishyam': ''.join([d[1] for d in drishyam_night[day_of_week+1] if d[0] == i+1]),
            'rahu': '',
            'time_of_day': 'nighttime',
        })

    # sort response by earliest to latest time
    sorted_data = sorted(choghadiya, key=lambda x: x['start_time'])

    return sorted_data, md
