#!/usr/bin/env python3

import os
import requests
import sys

files = [
    'https://dashboard-dev.terminusdb.com/',
    'https://dashboard-dev.terminusdb.com/verify',
    'https://dashboard-dev.terminusdb.com/index.html',
    'https://dashboard-dev.terminusdb.com/tdb-dashboard.min.js',
    'https://dashboard-dev.terminusdb.com/App.css',
    'https://dashboard.terminusdb.com/tdb-dashboard.min.js',
    'https://dashboard.terminusdb.com/App.css',
    'https://dashboard.terminusdb.com/',
    'https://dashboard.terminusdb.com/verify',
    'https://dashboard.terminusdb.com/index.html',
]

# We don't need to wipe the production cache on every commit
if not sys.argv[1].startswith("refs/tags"):
    files = [x for x in files if "dashboard-dev" in x]

headers = {
    'Authorization': 'Bearer ' + os.environ['CLOUDFLARE_API_KEY'],
}
zone = os.environ["CLOUDFLARE_ZONE"]
print(requests.post(f"https://api.cloudflare.com/client/v4/zones/{zone}/purge_cache", json={'files': files}, headers=headers).text)
