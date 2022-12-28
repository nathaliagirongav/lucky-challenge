## Get user information
Returns user's profile given a valid JWT token in a Authorization header

<table>
  <tr>
    <td>Request</td>
    <td><b>GET</b> http://localhost:3002/v1/user/profile</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>Authorization: Bearer {access-token}</td>
  </tr>
  <tr>
    <td>Response status</td>
    <td>200 Ok</td>
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
    
    curl --location --request GET 'localhost:3002/v1/user/profile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdGhhIiwic3ViIjoxLCJpYXQiOjE2NzIyNDgyMTgsImV4cCI6MTY3MjI1MTgxOH0.m45Yic82TUVLb-d8ZpdjiDFm33rgmYTlTmwM2e_nPK4'
  </td>
  </tr>
</table>

Note: The access-token is retreived in the [ User login ](user_login.md) endpoint.

### Error responses:

<table>
  <tr>
    <th>Error case</td>
    <th>Response status</td>
    <th>Response</td>
  </tr>
  <tr>
    <td>
      When the token is invalid
    </td>
    <td>401 Unauthorized</td>
    <td>
    
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
  </td>
  </tr>
</table>
