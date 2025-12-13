# IELTS Hacks Backend

Simple file management backend for handling file uploads, downloads, and deletions.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start the server:

```bash
pnpm dev
```

The server will run on `http://localhost:3986` by default.

## API Endpoints

### Health Check

- `GET /api/health` - Check if server is running

### Upload Files

- `POST /api/files/upload` - Upload a single file
  - Form data field: `file`
- `POST /api/files/upload-multiple` - Upload multiple files (max 10)
  - Form data field: `files`

### Fetch Files

- `GET /api/files` - Get all files
- `GET /api/files/:filename` - Get specific file info

### Delete Files

- `DELETE /api/files/:filename` - Delete a file

## File Access

Uploaded files are accessible at: `http://localhost:3986/uploads/:filename`
