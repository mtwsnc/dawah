import json

# Load JSON data from a file
with open("devices.json", "r") as file:
    try:
        content = json.load(file)
        devices = content.get("data", [])
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        exit(1)

# Ensure there are rows to process
if len(devices) <= 1:
    print("No devices found in JSON.")
    exit(1)

# Extract the header and data rows
headers = devices[0]
data_rows = devices[1:]

# Find indices for the fields of interest
try:
    name_idx = headers.index("name")
    css_width_idx = headers.index("css <br />width")
    css_height_idx = headers.index("css <br />height")
    pixel_ratio_idx = headers.index("pixel <br />ratio")
except ValueError as e:
    print(f"Error finding column indices: {e}")
    exit(1)

# Initialize CSS output
css_output = ""

# Process each device row
for row in data_rows:
    name = row[name_idx].replace("\u00a0", " ").replace(" ", "-").lower()
    css_width = row[css_width_idx]
    css_height = row[css_height_idx]
    pixel_ratio = row[pixel_ratio_idx]

    css_output += f"/* {row[name_idx]} */\n"
    css_output += (
        f"@media screen and (max-width: {css_width}px) and (max-height: {css_height}px) "
        f"and (-webkit-device-pixel-ratio: {pixel_ratio}) {{\n"
        f"    body {{\n"
        f"        width: 100%;\n"
        f"        height: 100%;\n"
        f"        max-width: {css_width}px;\n"
        f"        max-height: {css_height}px;\n"
        f"        margin: 0 auto;\n"
        f"        zoom: calc(1 / {pixel_ratio}); /* Scale content for pixel ratio */\n"
        f"        overflow: hidden; /* Prevent content overflow */\n"
        f"    }}\n"
        f"}}\n\n"
    )

# Save the CSS output to a file
with open("viewports.css", "w") as file:
    file.write(css_output)

print("CSS file 'viewports.css' has been generated.")
