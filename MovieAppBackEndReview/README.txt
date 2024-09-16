# Movie Reviews API

This API allows you to manage movie reviews. You can create, read, update, and delete reviews using the provided endpoints. Below are examples of how to use each API endpoint with `curl`.

## Base URL

https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews

makefile
Copier le code

## Endpoints

### 1. Create a New Review

**Endpoint:** `POST /new`

**Description:** Adds a new review.

**Request:**

```bash
curl -X POST https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews/new \
-H "Content-Type: application/json" \
-d '{"movieid": 12, "user": "fati", "review":"Best Ever"}'
Response:

json
Copier le code
{
  "status": "success"
}
2. Get a Review by ID
Endpoint: GET /{reviewId}

Description: Retrieves a review by its ID.

Request:

bash
Copier le code
curl -X GET https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews/66dff6cf27d4a9507c68b93a
Response:

json
Copier le code
{
  "movieid": 12,
  "user": "fati",
  "review": "Best Ever"
}
3. Get Reviews by Movie ID
Endpoint: GET /movie/{movieId}

Description: Retrieves all reviews for a specific movie.

Request:

bash
Copier le code
curl -X GET https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews/movie/12
Response:

json
Copier le code
[
  {
    "reviewId": "66dff6cf27d4a9507c68b93a",
    "movieid": 12,
    "user": "fati",
    "review": "Best Ever"
  }
]
4. Update a Review by ID
Endpoint: PUT /{reviewId}

Description: Updates a review by its ID.

Request:

bash
Copier le code
curl -X PUT https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews/66dff6cf27d4a9507c68b93a \
-H "Content-Type: application/json" \
-d '{"user": "lorraine", "review": "Jaime Bien"}'
Response:

json
Copier le code
{
  "status": "success"
}
5. Delete a Review by ID
Endpoint: DELETE /{reviewId}

Description: Deletes a review by its ID.

Request:

bash
Copier le code
curl -X DELETE https://440f059d-982e-4ad2-8414-cc9eac732569-00-89rw5y4qzvzj.spock.replit.dev:8080/api/v1/reviews/66dff6cf27d4a9507c68b93a
Response:

json
Copier le code
{
  "status": "success"
}
Notes
Replace {reviewId} and {movieId} with actual IDs as required.
Ensure that your API key or authentication tokens are properly included if required by your server.
Feel free to modify or expand this README to suit your needs.
