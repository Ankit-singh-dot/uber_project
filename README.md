# API Documentation

## Endpoint: `/users/register`

### Method: `POST`

This endpoint is used to register a new user in the system.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field                | Type     | Required | Description                                        |
| -------------------- | -------- | -------- | -------------------------------------------------- |
| `fullname.firstName` | `string` | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastName`  | `string` | Yes      | The last name of the user (minimum 3 characters).  |
| `email`              | `string` | Yes      | The email address of the user (must be valid).     |
| `password`           | `string` | Yes      | The password of the user (must be strong).         |

---

### Validation Rules

- `email`: Must be a valid email address.
- `fullname.firstName`: Must be at least 3 characters long.
- `password`: Must meet strong password criteria.

---

### Responses

| Status Code | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| `201`       | User successfully registered. Returns a JSON object with a token and user. |
| `400`       | Validation error. Returns a JSON object with the validation error details. |
| `500`       | Internal server error.                                                     |

---

### Example Request

```json
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}

# API Documentation

## Endpoint: `/users/register`

### Method: `POST`

This endpoint is used to register a new user in the system.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field               | Type     | Required | Description                                      |
|---------------------|----------|----------|--------------------------------------------------|
| `fullname.firstName`| `string` | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastName` | `string` | Yes      | The last name of the user (minimum 3 characters). |
| `email`             | `string` | Yes      | The email address of the user (must be valid).    |
| `password`          | `string` | Yes      | The password of the user (must be strong).        |

---

### Validation Rules

- `email`: Must be a valid email address.
- `fullname.firstName`: Must be at least 3 characters long.
- `password`: Must meet strong password criteria.

---

### Responses

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `201`       | User successfully registered. Returns a JSON object with a token and user. |
| `400`       | Validation error. Returns a JSON object with the validation error details. |
| `500`       | Internal server error.                                                     |

---

### Example Request

```json
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstName",
      "location": "body"
    },
    {
      "msg": "Password is not strong enough",
      "param": "password",
      "location": "body"
    }
  ]
}
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}