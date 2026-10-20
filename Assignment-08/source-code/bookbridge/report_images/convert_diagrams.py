import urllib.request
import urllib.parse
import os

folder = r"d:\shared ftp\Harshal\Sem 6\FS\miniproject\bookbridge\report_images"
file_name = "Figure_1_Architecture"
filepath = os.path.join(folder, file_name)

with open(filepath, 'r') as f:
    dot_content = f.read()

# URL encode the dot content
encoded_dot = urllib.parse.quote(dot_content)
url = f"https://quickchart.io/graphviz?graph={encoded_dot}&format=png"

print(f"Downloading {file_name}.png...")
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(filepath + ".png", 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print("Download successful!")
except Exception as e:
    print(f"Error: {e}")
