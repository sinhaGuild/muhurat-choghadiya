from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import owm

app = FastAPI(docs_url="/api/docs",
              openapi_url="/api/openapi.json")


origins = [
    "http://localhost:3000",
    "https://choghadiya.vercel.app",
    "https://choghadiya-git-main-shunyasea.vercel.app"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

allPreds = []
analytics = {}


# include routes
app.include_router(
    owm.router,
    prefix="/api",
    responses={404: {"description": "Not found!"},
               418: {"description": "I'm a teapot!"}},
)
