#!/bin/bash

# Script to initialize the database with sample data
# This will reset the database and populate it with sample time deposits

echo "========================================================"
echo "Time Deposit API - Database Initialization"
echo "========================================================"
echo

# Check if the application is installed
if [ ! -d "node_modules" ]; then
  echo "[ERROR] node_modules directory not found. Run 'npm install' or 'yarn install' first."
  exit 1
fi

# Ensure Prisma client is generated
echo "[INFO] Generating Prisma client..."
# Check for Prisma schema
if [ ! -f prisma/schema.prisma ]; then
  echo "[ERROR] prisma/schema.prisma not found in $(pwd)."
  exit 1
fi

npx prisma generate || { echo '[ERROR] Failed to generate Prisma client.'; exit 1; }
echo

# Apply migrations
echo "[INFO] Applying database migrations..."
npx prisma migrate dev --name init || { echo '[ERROR] Failed to apply migrations.'; exit 1; }
echo

# Print working directory and check for init.ts existence
echo "[DEBUG] Current working directory: $(pwd)"
echo "[DEBUG] Looking for src/db/init.ts..."
if [ ! -f src/db/init.ts ]; then
  echo "[ERROR] src/db/init.ts not found in $(pwd)."
  exit 1
fi

# Run the database initialization script
echo "[INFO] Populating database with sample data..."
npx ts-node src/db/init.ts || { echo '[ERROR] Failed to run src/db/init.ts.'; exit 1; }
echo

# If the initialization was successful, display a success message
if [ $? -eq 0 ]; then
  echo "[SUCCESS] Database initialized successfully!"
  echo "You can now run 'npm run dev' or 'yarn dev' to start the server."
  echo "Access Prisma Studio with 'npx prisma studio' to view your data."
else
  echo "[ERROR] Database initialization failed."
  echo "Check the error message above and try again."
  exit 1
fi

echo
echo "========================================================"
