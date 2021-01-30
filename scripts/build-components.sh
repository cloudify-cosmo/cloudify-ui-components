#!/usr/bin/env bash
set -e

NODE_ENV=production babel ./src/components --ignore "**/*.stories.{jsx,tsx}" --copy-files --delete-dir-on-start --extensions '.ts,.tsx,.js,.jsx' --out-dir es

# We have to delete .stories.jsx files from the output directory
# Ref.: https://github.com/babel/babel/issues/6226 - copy-files option does not work properly with ignore option
find ./es/ -type f -name "*.stories.jsx" -delete
