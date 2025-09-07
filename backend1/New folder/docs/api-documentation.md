# Alzheimer's Story Recall Companion - API Documentation

## Overview
This document provides comprehensive documentation for the backend API of the Alzheimer's Story Recall Companion application. The API is built with Node.js and Express.js and provides endpoints for authentication, memory management, and alert handling.

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register User
**POST** `/auth/register`

Registers a new user in the system.

#### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required, valid email format)",
  "password": "string (required, minimum 6 characters)",
  "role": "string (required, one of: patient, family, doctor)",
  "dateOfBirth": "string (optional, ISO 8601 date format)",
  "phoneNumber": "string (optional)"
}
```

#### Response
```json
{
  "success": true,
  "msg": "User registered successfully. Please check your email for verification."
}
```

#### Status Codes
- `201` - User created successfully
- `400` - Validation error or user already exists
- `500` - Server error

### Login User
**POST** `/auth/login`

Authenticates a user and returns access tokens.

#### Request Body
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

#### Response
```json
{
  "success": true,
  "accessToken": "JWT access token",
  "refreshToken": "JWT refresh token",
  "user": {
    "id": "user ID",
    "name": "user name",
    "email": "user email",
    "role": "user role"
  }
}
```

#### Status Codes
- `200` - Login successful
- `400` - Invalid credentials
- `401` - Account deactivated or email not verified
- `500` - Server error

### Request OTP
**POST** `/auth/request-otp`

Requests a one-time password for login.

#### Request Body
```json
{
  "email": "string (required)"
}
```

#### Response
```json
{
  "success": true,
  "msg": "OTP sent to your email"
}
```

#### Status Codes
- `200` - OTP sent successfully
- `400` - User not found or rate limit exceeded
- `500` - Server error

### Verify OTP
**POST** `/auth/verify-otp`

Verifies the one-time password and logs in the user.

#### Request Body
```json
{
  "email": "string (required)",
  "otp": "string (required, 6 digits)"
}
```

#### Response
```json
{
  "success": true,
  "accessToken": "JWT access token",
  "refreshToken": "JWT refresh token",
  "user": {
    "id": "user ID",
    "name": "user name",
    "email": "user email",
    "role": "user role"
  }
}
```

#### Status Codes
- `200` - OTP verified and login successful
- `400` - Invalid OTP or OTP expired
- `500` - Server error

## Memory Management

### Create Memory
**POST** `/memories`

Creates a new memory entry for the authenticated user.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

#### Request Body (form-data)
```
title: string (required)
description: string (optional)
type: string (required, one of: photo, voice, text, event, milestone)
date: string (optional, ISO 8601 date format)
location: string (optional)
tags: array of strings (optional)
isPublic: boolean (optional)
mood: string (optional, one of: happy, sad, nostalgic, confused, calm)
participants: array of strings (optional)
photo: file (optional, image file)
voice: file (optional, audio file)
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "title": "memory title",
    "description": "memory description",
    "type": "memory type",
    "date": "memory date",
    "location": "memory location",
    "tags": ["tag1", "tag2"],
    "isPublic": false,
    "mood": "memory mood",
    "participants": ["participant1", "participant2"],
    "contentType": "content type",
    "contentReferences": {
      "photoPath": "path to photo",
      "voicePath": "path to voice recording",
      "textContent": "text content"
    },
    "metadata": {
      "fileSize": 12345,
      "duration": 120,
      "dimensions": {
        "width": 800,
        "height": 600
      }
    },
    "_id": "memory ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "msg": "Memory created successfully"
}
```

#### Status Codes
- `201` - Memory created successfully
- `400` - Validation error
- `409` - Duplicate memory detected
- `500` - Server error

### Get Memories
**GET** `/memories`

Retrieves memories for the authenticated user with filtering and pagination.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page: integer (optional, default: 1)
limit: integer (optional, default: 10)
type: string (optional, one of: photo, voice, text, event, milestone)
tags: string (optional, comma-separated)
startDate: string (optional, ISO 8601 date format)
endDate: string (optional, ISO 8601 date format)
sortBy: string (optional, default: createdAt)
sortOrder: string (optional, one of: asc, desc, default: desc)
search: string (optional)
isPublic: boolean (optional)
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "user": "user ID",
      "title": "memory title",
      "description": "memory description",
      "type": "memory type",
      "date": "memory date",
      "location": "memory location",
      "tags": ["tag1", "tag2"],
      "isPublic": false,
      "mood": "memory mood",
      "participants": ["participant1", "participant2"],
      "contentType": "content type",
      "contentReferences": {
        "photoPath": "path to photo",
        "voicePath": "path to voice recording",
        "textContent": "text content"
      },
      "metadata": {
        "fileSize": 12345,
        "duration": 120,
        "dimensions": {
          "width": 800,
          "height": 600
        }
      },
      "_id": "memory ID",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "pagination": {
    "totalPages": 5,
    "currentPage": 1,
    "totalMemories": 45
  }
}
```

#### Status Codes
- `200` - Memories retrieved successfully
- `500` - Server error

### Get Memory by ID
**GET** `/memories/:id`

Retrieves a specific memory by ID.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "title": "memory title",
    "description": "memory description",
    "type": "memory type",
    "date": "memory date",
    "location": "memory location",
    "tags": ["tag1", "tag2"],
    "isPublic": false,
    "mood": "memory mood",
    "participants": ["participant1", "participant2"],
    "contentType": "content type",
    "contentReferences": {
      "photoPath": "path to photo",
      "voicePath": "path to voice recording",
      "textContent": "text content"
    },
    "metadata": {
      "fileSize": 12345,
      "duration": 120,
      "dimensions": {
        "width": 800,
        "height": 600
      }
    },
    "_id": "memory ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### Status Codes
- `200` - Memory retrieved successfully
- `403` - Access denied
- `404` - Memory not found
- `500` - Server error

### Update Memory
**PUT** `/memories/:id`

Updates a specific memory by ID.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

#### Request Body (form-data)
```
title: string (optional)
description: string (optional)
type: string (optional, one of: photo, voice, text, event, milestone)
date: string (optional, ISO 8601 date format)
location: string (optional)
tags: array of strings (optional)
isPublic: boolean (optional)
mood: string (optional, one of: happy, sad, nostalgic, confused, calm)
participants: array of strings (optional)
photo: file (optional, image file)
voice: file (optional, audio file)
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "title": "updated memory title",
    "description": "updated memory description",
    "type": "memory type",
    "date": "memory date",
    "location": "memory location",
    "tags": ["tag1", "tag2"],
    "isPublic": false,
    "mood": "memory mood",
    "participants": ["participant1", "participant2"],
    "contentType": "content type",
    "contentReferences": {
      "photoPath": "path to photo",
      "voicePath": "path to voice recording",
      "textContent": "text content"
    },
    "metadata": {
      "fileSize": 12345,
      "duration": 120,
      "dimensions": {
        "width": 800,
        "height": 600
      }
    },
    "_id": "memory ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "msg": "Memory updated successfully"
}
```

#### Status Codes
- `200` - Memory updated successfully
- `400` - Validation error
- `403` - Access denied
- `404` - Memory not found
- `500` - Server error

### Delete Memory
**DELETE** `/memories/:id`

Deletes a specific memory by ID.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response
```json
{
  "success": true,
  "msg": "Memory deleted successfully"
}
```

#### Status Codes
- `200` - Memory deleted successfully
- `403` - Access denied
- `404` - Memory not found
- `500` - Server error

### Get Memory Timeline
**GET** `/memories/timeline`

Retrieves memories organized by date for timeline view.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
year: integer (optional)
month: integer (optional)
```

#### Response
```json
{
  "success": true,
  "data": {
    "timeline": {
      "2023-01-15": [
        {
          "id": "memory ID",
          "title": "memory title",
          "type": "memory type",
          "mood": "memory mood"
        }
      ]
    },
    "year": 2023,
    "month": 1
  }
}
```

#### Status Codes
- `200` - Timeline retrieved successfully
- `500` - Server error

### Share Memory
**POST** `/memories/:id/share`

Shares a memory with specific users.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "shareWith": ["user1 ID", "user2 ID"]
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "title": "memory title",
    "description": "memory description",
    "type": "memory type",
    "date": "memory date",
    "location": "memory location",
    "tags": ["tag1", "tag2"],
    "isPublic": true,
    "sharedWith": ["user1 ID", "user2 ID"],
    "mood": "memory mood",
    "participants": ["participant1", "participant2"],
    "contentType": "content type",
    "contentReferences": {
      "photoPath": "path to photo",
      "voicePath": "path to voice recording",
      "textContent": "text content"
    },
    "metadata": {
      "fileSize": 12345,
      "duration": 120,
      "dimensions": {
        "width": 800,
        "height": 600
      }
    },
    "_id": "memory ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "msg": "Memory shared successfully"
}
```

#### Status Codes
- `200` - Memory shared successfully
- `400` - Validation error
- `403` - Access denied
- `404` - Memory not found
- `500` - Server error

## Alert Management

### Create Alert
**POST** `/alerts`

Creates a new alert and sends notifications.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "message": "string (required)",
  "type": "string (required, one of: reminder, emergency)",
  "reason": "string (required)",
  "category": "string (required, one of: medicine, appointment, behavior, emergency, nutrition, activity)",
  "priority": "string (optional, one of: low, medium, high, critical, default: medium)",
  "notes": "string (optional)",
  "actions": "array of strings (optional)",
  "notifyEmail": "string (optional, email address)",
  "notifyPhone": "string (optional, phone number)",
  "notifyWhatsApp": "string (optional, WhatsApp number)"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "message": "alert message",
    "type": "alert type",
    "reason": "alert reason",
    "category": "alert category",
    "priority": "alert priority",
    "notes": "alert notes",
    "actions": ["action1", "action2"],
    "triggeredBy": "manual",
    "notificationHistory": [
      {
        "method": "email",
        "status": "sent",
        "sentAt": "timestamp"
      }
    ],
    "_id": "alert ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "msg": "Alert created successfully"
}
```

#### Status Codes
- `201` - Alert created successfully
- `400` - Validation error
- `500` - Server error

### Get Alerts
**GET** `/alerts`

Retrieves alerts for the authenticated user with filtering and pagination.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Query Parameters
```
page: integer (optional, default: 1)
limit: integer (optional, default: 10)
type: string (optional, one of: reminder, emergency)
category: string (optional, one of: medicine, appointment, behavior, emergency, nutrition, activity)
priority: string (optional, one of: low, medium, high, critical)
resolved: boolean (optional)
sortBy: string (optional, default: createdAt)
sortOrder: string (optional, one of: asc, desc, default: desc)
startDate: string (optional, ISO 8601 date format)
endDate: string (optional, ISO 8601 date format)
triggeredBy: string (optional, one of: ai, manual, scheduled)
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "user": "user ID",
      "message": "alert message",
      "type": "alert type",
      "reason": "alert reason",
      "category": "alert category",
      "priority": "alert priority",
      "notes": "alert notes",
      "actions": ["action1", "action2"],
      "resolved": false,
      "triggeredBy": "manual",
      "notificationHistory": [
        {
          "method": "email",
          "status": "sent",
          "sentAt": "timestamp"
        }
      ],
      "_id": "alert ID",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "pagination": {
    "totalPages": 3,
    "currentPage": 1,
    "totalAlerts": 25
  }
}
```

#### Status Codes
- `200` - Alerts retrieved successfully
- `500` - Server error

### Update Alert
**PUT** `/alerts/:id`

Updates a specific alert by ID.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "message": "string (optional)",
  "type": "string (optional, one of: reminder, emergency)",
  "reason": "string (optional)",
  "category": "string (optional, one of: medicine, appointment, behavior, emergency, nutrition, activity)",
  "priority": "string (optional, one of: low, medium, high, critical)",
  "resolved": "boolean (optional)",
  "notes": "string (optional)",
  "actions": "array of strings (optional)",
  "addNote": "string (optional, adds a note to existing notes)"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": "user ID",
    "message": "updated alert message",
    "type": "alert type",
    "reason": "alert reason",
    "category": "alert category",
    "priority": "alert priority",
    "notes": "alert notes",
    "actions": ["action1", "action2"],
    "resolved": true,
    "resolvedAt": "timestamp",
    "resolvedBy": "user ID",
    "triggeredBy": "manual",
    "_id": "alert ID",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "msg": "Alert updated successfully"
}
```

#### Status Codes
- `200` - Alert updated successfully
- `400` - Validation error
- `403` - Access denied
- `404` - Alert not found
- `500` - Server error

### Get Alert Statistics
**GET** `/alerts/stats`

Retrieves alert statistics for the authenticated user.

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "total": 25,
    "resolved": 15,
    "unresolved": 10,
    "categories": [
      {
        "category": "medicine",
        "count": 8
      },
      {
        "category": "behavior",
        "count": 10
      }
    ],
    "priorities": [
      {
        "priority": "high",
        "count": 5
      },
      {
        "priority": "medium",
        "count": 15
      }
    ]
  }
}
```

#### Status Codes
- `200` - Statistics retrieved successfully
- `500` - Server error

### Get Patient Alerts
**GET** `/alerts/patient/:patientId`

Retrieves alerts for a specific patient (for doctors/family members).

#### Request Headers
```
Authorization: Bearer <access_token>
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "user": "patient ID",
      "message": "alert message",
      "type": "alert type",
      "reason": "alert reason",
      "category": "alert category",
      "priority": "alert priority",
      "notes": "alert notes",
      "actions": ["action1", "action2"],
      "resolved": false,
      "triggeredBy": "manual",
      "_id": "alert ID",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

#### Status Codes
- `200` - Patient alerts retrieved successfully
- `403` - Access denied
- `404` - Patient not found
- `500` - Server error

### Resolve Alerts
**POST** `/alerts/resolve`

Marks multiple alerts as resolved.

#### Request Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "alertIds": ["alert1 ID", "alert2 ID"]
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "matchedCount": 2,
    "modifiedCount": 2
  },
  "msg": "2 alerts resolved successfully"
}
```

#### Status Codes
- `200` - Alerts resolved successfully
- `400` - Validation error
- `500` - Server error

## Error Handling

The API uses the following error codes:

- `400` - Bad Request (Validation errors, missing parameters)
- `401` - Unauthorized (Missing or invalid authentication)
- `403` - Forbidden (Access denied)
- `404` - Not Found (Resource not found)
- `409` - Conflict (Duplicate resource)
- `500` - Internal Server Error (Unexpected server error)

All error responses follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## Authentication Headers

All protected endpoints require an Authorization header with a valid JWT token:
```
Authorization: Bearer <access_token>
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per hour for unauthenticated endpoints
- 1000 requests per hour for authenticated endpoints

Exceeding these limits will result in a `429 Too Many Requests` response.

## File Uploads

The API supports file uploads for memories:
- Photo uploads: JPEG, PNG, GIF, WebP (max 50MB)
- Voice uploads: MP3, WAV, WebM, OGG (max 50MB)

Files are stored in the `uploads/` directory with unique filenames.