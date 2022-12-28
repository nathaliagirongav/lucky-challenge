## User creation
It creates a user with the given information and returns it in the response.

<table>
  <tr>
    <td>Request</td>
    <td><b>POST</b> http://localhost:3002/v1/user/create</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>Content-Type: application/json</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>

    {
      "username": string,
      "password": string,
      "name": string,
      "address": string,
      "cityId": number
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
      "id": 1,
      "name": "Nathalia Giron",
      "address": {
        "street": "my-city-address",
        "city": "Popayan",
        "country": "Colombia"
      }
    }
  </td>
  </tr>
  <tr>
    <td>Curl example</td>
    <td>
    
    curl --request POST 'localhost:3002/v1/user/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "username": "natha",
      "password": "1234",
      "name": "Nathalia Giron",
      "address": "my-city-address",
      "cityId": 1
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
      When there's a missing argument in the request body or when the data type is not the expected
    </td>
    <td>422 Unprocessable Entity</td>
    <td>
    
    {
      "statusCode": 422,
      "message": [
        "address must be a string",
        "address should not be empty"
      ],
      "error": "Unprocessable Entity"
    }
  </td>
  </tr>
  <tr>
    <td>When the user already exists</td>
    <td>409 Conflict</td>
    <td>
    
    {
      "statusCode": 409,
      "message": "Username 'natha' already exists"
    }
  </td>
  </tr>
  <tr>
    <td>When the cityId provided does not exist</td>
    <td>409 Conflict</td>
    <td>
    
    {
      "statusCode": 409,
      "message": "The city with id '153' does not exist in the database"
    }
  </td>
  </tr>
  <tr>
    <td>When the user can't be created for any other reason</td>
    <td>500 Internal Server Error</td>
    <td>
    
    {
      "statusCode": 500,
      "message": "The user 'natha' could not be created because of the 
      following error: error description"
    }
  </td>
  </tr>
</table>
