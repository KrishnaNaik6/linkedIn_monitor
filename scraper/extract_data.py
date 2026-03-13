from apify_client import ApifyClient
import json
import os

API_TOKEN = os.getenv("APIFY_API_TOKEN")

client = ApifyClient(API_TOKEN)

input_data = {
    "searchQueries": ["Adya AI", "Shayak Mazumder"],
    "maxPosts": 500,
    "postedLimit": "6months",
    "sort": "date"
}

run = client.actor("harvestapi/linkedin-post-search").call(
    run_input=input_data
)

dataset_id = run["defaultDatasetId"]

dataset = client.dataset(dataset_id)

result = dataset.list_items()

items = result.items

print("Total items:", len(items))

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(items, f, indent=2)

print("Saved to data.json")