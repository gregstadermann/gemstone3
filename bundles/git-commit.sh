#!/bin/bash

# Super simple git commit script
# Usage: ./git-commit.sh <directory> <commit_message>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <directory> <commit_message>"
    exit 1
fi

DIRECTORY="$1"
COMMIT_MSG="$2"

# Change to the directory
cd "$DIRECTORY"

# Add all files and commit
git add --all
git commit -m "$COMMIT_MSG"

echo "✅ Committed changes in $DIRECTORY with message: '$COMMIT_MSG'"