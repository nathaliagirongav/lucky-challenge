# lucky-challenge

## Overview
### User's management system.
Provides functionalities to store and retrieve user's profiles with detailed location information. The database model allows to persist relevant data for the user such as: username, password, name, address, city and country.

The system features an authentication and authorization process including _basic auth_ (with username and password) and _access token based auth_ (with JWT).

Exceptions are handled by a custom error managing layer.

For this project, it was used:

* `docker` for creating container for the application
* `mysql 5.7` database
* `NestJS` as main framework of the application
* `Jest` for testing
* `TypeORM` for database manipulation, not relying on entity pattern but in query builders
* `class-validator` for validation pipes strategies
* `bcrypt` for password hashing
* `passport` authentication middleware for basic and access token auth
<br></br>
## Running the app
Follow the next steps in order to run the app:

**1.** Create a ***.env*** file in the root directory of the project and set the environment variables following the
schema guidelines in the ***.env.dist file***.
The .env file lets us customize the individual working environment variables.

Example:

```
##########
# Application
##########
APP_TIMEZONE=local

##########
# Database
##########
DATABASE_HOST=127.0.0.1
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=lucky-challenge
DATABASE_PORT=2409

##########
# JWT
##########
JWT_SECRET_KEY=random-key

```

**2.** Run docker local setup. (Ensure docker Desktop is up and running).

**Build image:**
```bash
$ docker compose -f .docker/docker-compose.yml build
```
**Start containers:**
```bash
$ docker compose -f .docker/docker-compose.yml up -d
```
This will start the following containers:
* Container lucky-challenge-mysql
* Container lucky-challenge

Make sure the database container is in status Healthy and the application container is in status Started. Otherwise, excecute again.
<br></br>

_Note: The command to stop containers:_
```bash
$ docker compose -f .docker/docker-compose.yml down
```

**3.** The application is now up, you can check the application is running by doing a request as follows:

```bash
$ curl http://localhost:3002/application/status
```


**Note:**

- Migrations are run once the application container is started.
- For simplicity, the tables city and country were initialized.
- Database seeding for the previously mentioned tables was done using a migration.
- The default port for the application is: 3002.
- The default port for the database is: 2409.
<br></br>
## Test
For running the tests inside the container:
```bash
$ docker exec -it lucky-challenge npm run test
```
## Endpoint's documentation
Endpoint's documentation can be found in this [section](./docs/endpoints.md). 

(It can be generated automatically using swagger with openapi, but in this case the APIs are just listed in a markdown file).

