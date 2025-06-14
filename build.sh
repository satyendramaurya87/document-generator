#!/bin/bash

# Exit on error
set -e

# Print commands before executing
set -x

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Build the application
npm run build