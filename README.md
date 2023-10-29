# Map Based Media

![Homepage](/public/homepage-1.png)

## About the Project
Map Based Media is a social media website built using the Next.js framework, which allows users to share pictures and write blogs on a map interface. With this platform, users can not only share photos but also write accompanying blog posts related to those photos.

## Overview

![Viewmap](/public/viemap-1.png)

On the map, all photos shared by registered users are visible, and each photo is actually a blog post that can be accessed by clicking on the photo. If there are a large number of photos in a specific area, photos are displayed by clustering them to avoid clutter.

Users register using Google OAuth support with their Google accounts. 

The registered users and their shared photos are stored in a PostgreSQL database. Uploadthing is utilized for storing the photos. 

This media website utilizes the Google Maps API, and all photos are displayed through Google Maps.

When users click the "Share Image" button to select a photo, they are directed to a panel where they can choose a location on the map and upload the photo. Afterwards, if they wish, they can write a blog using the Rich Text Editor. Upon clicking the "Submit" button, the photo and associated blog post are shared in a way that can be viewed by all users on the map.

## Technologies Used
- Next.js
- PostgreSQL
- Tailwindcss
- Prisma
- Uploadthing
- Google Maps Platform
- Auth0

## Installation

Install the dependencies:
```bash
  npm install
```
Set up the PostgreSQL database and configure the connection.
Obtain API keys for Google Maps API, Google-OAuth API key and Uploadthing API keys.
Create a .env file in the root directory of the project and add the following environment variables to the .env file:
```bash
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_GOOGLE_MAPS_ID
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
DATABASE_URL
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
```
Push the Prisma schema state to the database:
```bash
  prisma db push
```
Build the Map Based Media project:
```bash
  npm run build
```
Start the development server:
```bash
  npm run dev
```
Open your browser and navigate to http://localhost:3000
