# Endpoints documentation

The available endpoints on the project are:

1. [ Application status ](application_status.md)
2. [ User creation ](user_creation.md)
3. [ User login ](user_login.md)
3. [ Get user information ](get_user_information.md)

Each one of the sections contains detailed information about the API including the error cases responses. 

For an easy check of the endpoints functionallity it can be copied and pasted the `curl` example command in your shell.

Please consider that the project has preset values in the database. It's important having this in mind when testing the [ User creation ](user_creation.md) endpoint given that in the request the `cityId` is used. By now, there are available ids from 1 to 4.
