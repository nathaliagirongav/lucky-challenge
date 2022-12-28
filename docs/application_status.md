## Application status
### Application health check.
It returns a default response of available when the application is running successfully and also provides information about the database connection initialization.

<table>
  <tr>
    <td>Request</td>
    <td><b>GET</b> http://localhost:3002/application/status</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Response status</td>
    <td>200 Ok</td>
  </tr>
  <tr>
    <td>Response</td>
    <td>
    
    {
      "available": true,
      "db": true
    }
  </td>
  </tr>
  <tr>
    <td>Curl example</td>
    <td>
    
    curl --request GET 'localhost:3002/application/status'
  </td>
  </tr>
</table>
