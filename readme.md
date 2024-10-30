# URL Shortener Application

A simple URL shortener application built with Express, TypeScript, and SQLite. This application allows users to create shortened URLs, access the original URLs, track usage statistics, and handle URL expiration.

## Features

- Shorten long URLs
- Retrieve & redirected to original URLs from shortened versions
- Track the number of times a shortened URL has been accessed
- Set expiration for shortened URLs
- Handle invalid and expired URLs

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **TypeScript**: Superset of JavaScript that adds static types.
- **SQLite**: Lightweight database for storing URL mappings.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- SQLite

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amiribnjaman/url-shortener.git

   cd url-shortener
   ```

## Install the dependencies:

```bash
npm install
```


### Running the Application
To start the server, run:

```bash
npm run start
```

### API Endpoints
## Create Short URL

- Endpoint: POST /api/shorten
- Request Body:
{
  "originalUrl": "http://hello.com",
  "customAlias": "customShortUrl" // optional. if provide the shorturl will be as user preference
}

- Response:
{
  "msg": "URL created successfully",
  "originalUrl": "http://hello.com",
  "shortUrl": "customShortUrl"
}

## Redirect to Original URL

- Endpoint: GET /:shortUrl
- Response: Redirects to the original URL or returns a 404 if not found or expired.

## Get URL Stats
- Endpoint: GET /api/stats/:shortUrl
- Response:
{
  "originalUrl": "http://hello.com",
  "shortUrl": "XdsbW"
  "statsCount": 5,
  "expirationDate": "2023-10-29T12:00:00Z"
}