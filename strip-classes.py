import re

# Read the HTML file
with open("dawah/index.html", "r") as file:
    html_content = file.read()

# Remove all class attributes
html_content = re.sub(r'\s*class="[^"]*"', "", html_content)

# Write the modified HTML back to the file
with open("dawah/stripped-classes.html", "w") as file:
    file.write(html_content)
