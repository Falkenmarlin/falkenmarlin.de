import requests
from bs4 import BeautifulSoup
import json

# URL of the sitemap
sitemap_url = "http://127.0.0.1:5500/sitemap.xml"

# Fetch the sitemap
response = requests.get(sitemap_url)
soup = BeautifulSoup(response.content, 'xml')

# Extract URLs from the sitemap
urls = [loc.get_text() for loc in soup.find_all('loc')]

search_data = []

for url in urls:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract the title (you may need to adjust the selector based on your HTML structure)
    titles = [soup.title.string] if soup.title else []
    
    # Add more titles if needed (e.g., from h1, h2 tags)
    titles.extend([tag.get_text() for tag in soup.find_all(['h1', 'h2'])])

    # Add text from elements with class 'highlight'
    titles.extend([tag.get_text() for tag in soup.find_all(class_='highlight')])
    titles.extend([tag.get_text() for tag in soup.find_all(class_='search-highlight')])
    
    # Remove the base URL part from the URL
    base_url = "https://falkenmarlin.github.io"
    relative_url = url.replace(base_url, "")
    
    search_data.append({
        "titles": titles,
        "url": relative_url
    })

# Save the search data to search.json
with open('assets/search.json', 'w', encoding='utf-8') as f:
    json.dump(search_data, f, ensure_ascii=False, indent=4)