# ToDo-app

This project is a full-stack ToDo application consisting of a React-based frontend and a Spring Boot-based backend. The frontend is built with TypeScript and Vite, while the backend uses Maven for build automation.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (version 6 or higher)
- Java Development Kit (JDK) (version 21 or higher)
- Maven (for building the server)
- Fly.io account (for deployment)
- Auth0 account for authentication
- A postgres DB instance

### Clone the Repository

```sh
git clone https://github.com/KaarleJ/ToDo-app
cd todo-app
```
## Backend setup

### Populate env variables
Set env variables in your pc according to the applicatiopn properties:
```application.properties
spring.datasource.url=${PSQL_URL}
spring.datasource.username=${PSQL_UN}
spring.datasource.password=${PSQL_PW}

okta.oauth2.issuer=${OKTA_ISSUER}
okta.oauth2.audience=${OKTA_AUDIENCE}
```

### Build with Maven
Navigate to the todo-server directory and build the project using Maven:

```sh
cd todo-server
mvn clean install
```

### Run the Backend
Start the Spring Boot application:

```sh
mvn spring-boot:run
```
The backend will be available at http://localhost:8080

## Deployment
### Deploying to fly.io
```sh
fly launch
fly deploy
```

## Frontend Setup

### Install Dependencies
Navigate to the todo-client directory and install the dependencies:

```sh
cd todo-client
npm install
```
### Populate env variables
Create a file .env.local and populate env variables:
```.env.local
VITE_AUTH_DOMAIN="AUTH0_DOMAIN"
VITE_AUTH_ID="AUTH0_CLIENT_ID"
VITE_AUTH_AUDIENCE="AUTH0_AUDIENCE"

VITE_API_URL="API_URL"
```

### Start the Development server
Start the Vite development server:

```sh
npm run dev
```
You can view the app at http://localhost:5173