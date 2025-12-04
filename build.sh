#!/bin/bash

set -e

echo "🚀 Starting build process..."

# Load environment variables
if [ -f .env ]; then
  echo "🔧 Loading environment variables..."
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️  No .env file found, skipping..."
fi

echo "📦 Running Prisma generate..."
pnpm prisma generate

echo "🗄️  Running Prisma migrations..."
pnpm prisma migrate deploy

echo "🏗️  Building TypeScript project..."
pnpm run build

echo "🎉 Build & migration completed successfully!"
