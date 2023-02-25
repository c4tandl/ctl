import os
import json
import re

folder_path = "_posts/"

# Define regex pattern to extract author name from title
author_pattern = re.compile(r"by\s+([\w\s]+)(?<!\s)($|\n)")

# Initialize JSON map
author_map = {}

# Iterate over files in folder
for filename in os.listdir(folder_path):
    if filename.endswith(".md"):
        with open(os.path.join(folder_path, filename), "r") as f:
            content = f.read()
            
            # Add author to frontmatter if no authors
            if content.find("authors:\n  -") == -1:
                # Extract author name from title
                match = author_pattern.search(content)
                if match:
                    author_name = match.group(1).strip()
                else:
                    # Create author name from filename
                    author_name = os.path.splitext(filename)[0].replace("-", " ").title()
            
                content = content.replace("authors:\n", f"authors:\n  - {author_name.lower().replace(' ', '-')}\n")
            
                # Add author to JSON map
                key = author_name.lower().replace(" ", "-")
                author_map[key] = author_name
            
        with open(os.path.join(folder_path, filename), "w") as f:
            f.write(content)

# Save author map to file
with open("author_map.json", "w") as f:
    json.dump(author_map, f)
