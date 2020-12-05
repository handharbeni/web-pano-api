# Local Installation

## Clone Repo
- git clone https://github.com/handharbeni/web-pano-api.git

## Install Package
- npm install

## Database

## MySQL Database
- Create Database name : api-prasmul
- User : (your mysql user)
- Password : (your mysql pass)

## MySQL Config File
- Modify tools/config.js if needed if not configured as above credentials

# Running Apps
- node index.js

# Migration
- knex migrate:latest (assume knex is installed globally, if not, follow the bin path)

# Seed
- knex seed:run

# Access Swagger
- localhost:2099/api-docs
