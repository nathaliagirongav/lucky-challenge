## User login
Returns a valid JWT token given a username and password.

<table>
  <tr>
    <td>Request</td>
    <td><b>POST</b> http://localhost:3002/v1/user/login</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>Content-Type: application/json</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>

    {
      "username": "natha",
      "password": "1234"
    }
  </td>
  </tr>
  <tr>
    <td>Response status</td>
    <td>201 Created</td>
  </tr>
  <tr>
    <td>Response</td>
    <td>
    
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdGhhMiIsInN1YiI6MiwiaWF0
      IjoxNjcyMjQ3NTcxLCJleHAiOjE2NzIyNTExNzF9.gUjk6VIt3O6NLNHvbOhPfD0d-uv1-3ws3o-BAaD5Mz8"
    }
  </td>
  </tr>
  <tr>
    <td>Curl example</td>
    <td>
    
    curl --location --request POST 'localhost:3002/v1/user/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "username": "natha",
      "password": "1234"
    }'
  </td>
  </tr>
</table>

### Error responses:

<table>
  <tr>
    <th>Error case</td>
    <th>Response status</td>
    <th>Response</td>
  </tr>
  <tr>
    <td>
      When the user does not exist
    </td>
    <td>409 Conflict</td>
    <td>
    
    {
      "statusCode": 409,
      "message": "The user with username 'natha233' does not exist in the database"
    }
  </td>
  </tr>
  <tr>
    <td>When the given credentials are incorrect</td>
    <td>401 Unauthorized</td>
    <td>
    
    {
      "statusCode": 401,
      "message": "The given credentials are incorrect"
    }
  </td>
  </tr>
</table>
