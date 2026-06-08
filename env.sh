#!/bin/sh

# Line block for the output file
OUTPUT_FILE="/usr/share/nginx/html/env-config.js"

# Start creating the file
echo "window._env_ = {" > $OUTPUT_FILE

# Get all environment variables starting with VITE_
# and add them to the JS file
env | grep '^VITE_' | while IFS='=' read -r name value; do
  # Escape double quotes in the value
  escaped_value=$(echo "$value" | sed 's/"/\\"/g')
  echo "  $name: \"$escaped_value\"," >> $OUTPUT_FILE
done

# Close the object
echo "};" >> $OUTPUT_FILE
