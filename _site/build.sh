#!/bin/bash

# Install Jekyll if not present
if ! command -v jekyll &> /dev/null; then
    echo "Installing Jekyll..."
    gem install jekyll
fi

# Build the site
echo "Building Jekyll site..."
jekyll build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Site generated in _site/"
    ls -la _site/
else
    echo "Build failed!"
    exit 1
fi
