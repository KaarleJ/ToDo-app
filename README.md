# ToDo-app

This project is a full-stack ToDo application consisting of a React-based frontend and a Spring Boot-based backend. The frontend is built with TypeScript and Vite, while the backend uses Maven for build automation.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (version 6 or higher)
- Java Development Kit (JDK) (version 21 or higher)
- Maven (for building the server)
- Fly.io account (for deployment)

### Clone the Repository

```sh
git clone https://github.com/KaarleJ/ToDo-app
cd todo-app
```

## Frontend Setup

### Install Dependencies
Navigate to the todo-client directory and install the dependencies:

```sh
cd todo-client
npm install
```

### Start the Development server
Start the Vite development server:

```sh
npm run dev
```
You can view the app at http://loclahost:5173

## Backend setup
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