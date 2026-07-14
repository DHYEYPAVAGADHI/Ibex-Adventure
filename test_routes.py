import urllib.request
import json
import time

routes = [
    "/",
    "/admin/login",
    "/admin/dashboard",
    "/admin/categories",
    "/admin/categories/new",
    "/admin/categories/cmr8w9a600000whrxgdsvxvho",
    "/admin/tours",
    "/admin/memories",
    "/admin/settings",
    "/programs/trekking",
    "/programs/trekking-programs/everest-base-camp",
    "/api/categories",
    "/api/admin/categories"
]

for route in routes:
    try:
        req = urllib.request.Request(f"http://localhost:3000{route}")
        res = urllib.request.urlopen(req)
        print(f"{route}: {res.getcode()}")
    except urllib.error.HTTPError as e:
        print(f"{route}: {e.code}")
    except Exception as e:
        print(f"{route}: {str(e)}")
