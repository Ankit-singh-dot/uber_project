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
```

### Example Response

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
```

---

## Endpoint: `/users/login`

### Method: `POST`

This endpoint is used to log in an existing user.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field      | Type     | Required | Description                                      |
|------------|----------|----------|--------------------------------------------------|
| `email`    | `string` | Yes      | The email address of the user (must be valid).    |
| `password` | `string` | Yes      | The password of the user.                        |

---

### Responses

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | User successfully logged in. Returns a JSON object with a token and user.  |
| `400`       | Validation error. Returns a JSON object with the validation error details. |
| `500`       | Internal server error.                                                     |
| `401`       | Unauthorized. Invalid email or password.                                   |

---

### Example Request

```json
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Example Response

```json
HTTP/1.1 200 OK
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
```

```json
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
      "msg": "Password is required",
      "param": "password",
      "location": "body"
    }
  ]
}
```

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "Invalid email or password"
}
```

---

## Endpoint: `/users/profile`

### Method: `GET`

This endpoint is used to retrieve the profile of the currently authenticated user.

---

### Headers

| Header            | Type     | Required | Description                     |
|-------------------|----------|----------|---------------------------------|
| `Authorization`   | `string` | Yes      | Bearer token for authentication.|

---

### Responses

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | Successfully retrieved user profile. Returns a JSON object with user data. |
| `401`       | Unauthorized. Token is missing or invalid.                                 |

---

### Example Request

```http
GET /users/profile
Authorization: Bearer <token>
```

### Example Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## Endpoint: `/users/logout`

### Method: `POST`

This endpoint is used to log out the currently authenticated user.

---

### Headers

| Header            | Type     | Required | Description                     |
|-------------------|----------|----------|---------------------------------|
| `Authorization`   | `string` | Yes      | Bearer token for authentication.|

---

### Responses

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | Successfully logged out.                                                   |
| `401`       | Unauthorized. Token is missing or invalid.                                 |

---

### Example Request

```http
POST /users/logout
Authorization: Bearer <token>
```

### Example Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

"Logout successfully"
```

---

## Endpoint: `/captains/register`

### Method: `POST`

This endpoint is used to register a new captain in the system.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field               | Type     | Required | Description                                      |
|---------------------|----------|----------|--------------------------------------------------|
| `firstName`         | `string` | Yes      | The first name of the captain (minimum 3 characters). |
| `lastName`          | `string` | Yes      | The last name of the captain (minimum 3 characters). |
| `email`             | `string` | Yes      | The email address of the captain (must be valid and unique). |
| `password`          | `string` | Yes      | The password of the captain (must be strong).        |

---

### Validation Rules

- `firstName`: Must be at least 3 characters long.
- `lastName`: Must be at least 3 characters long.
- `email`: Must be a valid email address and unique.
- `password`: Must meet strong password criteria.

---

### Responses

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `201`       | Captain successfully registered. Returns a JSON object with captain details. |
| `400`       | Validation error. Returns a JSON object with the validation error details. |
| `500`       | Internal server error.                                                     |

---

### Example Request

```json
POST /captains/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Example Response

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": [
    {
      "msg": "First name should be at least 3 characters",
      "param": "firstName",
      "location": "body"
    },
    {
      "msg": "Last name should be at least 3 characters",
      "param": "lastName",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Endpoint: `/captains/login`

### Method: `POST`

This endpoint is used to authenticate a captain and log them into the system.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field      | Type     | Required | Description                              |
|------------|----------|----------|------------------------------------------|
| `email`    | `string` | Yes      | The email address of the captain.        |
| `password` | `string` | Yes      | The password of the captain.             |

---

### Validation Rules

- `email` must be a valid email address.
- `password` must not be empty.

---

### Responses

| Status Code | Description                                                                          |
|-------------|--------------------------------------------------------------------------------------|
| `200`       | Successfully logged in. Returns a JSON object with a token and captain data.         |
| `400`       | Validation error. Returns a JSON object with the validation error details.           |
| `401`       | Authentication failure. Invalid email or password.                                 |
| `500`       | Internal server error.                                                               |

---

### Example Request

```json
POST /captains/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Example Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

---

## Endpoint: `/captains/logout`

### Method: `POST`

This endpoint is used to log out the currently authenticated captain.

---

### Headers

| Header            | Type     | Required | Description                     |
|-------------------|----------|----------|---------------------------------|
| `Authorization`   | `string` | Yes      | Bearer token for authentication.|

---

### Example Request

```http
POST /captains/logout
Authorization: Bearer <token>
```

### Example Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

"Logout successfully"
```

---

## Endpoint: `/captains/all`

### Method: `GET`

This endpoint is used to retrieve all captains in the system.

---

### Headers

| Header            | Type     | Required | Description                     |
|-------------------|----------|----------|---------------------------------|
| `Authorization`   | `string` | Yes      | Bearer token for authentication.|

---

### Example Request

```http
GET /captains/all
Authorization: Bearer <token>
```

### Example Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  {
    "_id": "64f1c2e5b5f1c2e5b5f1c2e6",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com"
  }
]
```

---

## Endpoint: `/rides`

### Method: `POST`

This endpoint is used to create a new ride.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field           | Type     | Required | Description                                     |
|-----------------|----------|----------|-------------------------------------------------|
| `passengerName` | `string` | Yes      | The name of the passenger.                      |
| `pickupAddress` | `string` | Yes      | The pickup address for the ride.                |
| `dropoffAddress`| `string` | Yes      | The dropoff address for the ride.               |

---

### Responses

| Status Code | Description                                                                     |
|-------------|---------------------------------------------------------------------------------|
| `201`       | Ride successfully created. Returns a JSON object of the created ride.           |
| `500`       | Internal server error.                                                          |

---

### Example Request

```json
POST /rides
Content-Type: application/json

{
  "passengerName": "Alice Smith",
  "pickupAddress": "1600 Amphitheatre Parkway, Mountain View, CA",
  "dropoffAddress": "1 Infinite Loop, Cupertino, CA"
}
```

### Example Response

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
  "passengerName": "Alice Smith",
  "pickupAddress": "1600 Amphitheatre Parkway, Mountain View, CA",
  "dropoffAddress": "1 Infinite Loop, Cupertino, CA",
  "pickupCoordinates": {
    "lat": 37.4224764,
    "lng": -122.0842499
  },
  "dropoffCoordinates": {
    "lat": 37.33182,
    "lng": -122.03118
  },
  "status": "requested",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "64f1c2e5b5f1c2e5b5f1c2e5",
  "passengerName": "Alice Smith",
  "pickupAddress": "1600 Amphitheatre Parkway, Mountain View, CA",
  "dropoffAddress": "1 Infinite Loop, Cupertino, CA",
  "pickupCoordinates": { "lat": 37.4224764, "lng": -122.0842499 },
  "dropoffCoordinates": { "lat": 37.33182, "lng": -122.03118 },
  "status": "requested",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```
example for price 
If a car ride is:
	•	Distance: 10 km
	•	Duration: 20 minutes
	•	Peak time

  Fare = 50 (base) + 10*15 (per km) + 20*2 (per min) = 50 + 150 + 40 = 240
Surge = 240 * 1.5 = 360
Service Fee = 10
Total = 370