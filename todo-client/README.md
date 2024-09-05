# Todo App Frontend

This project is a React-based frontend for a Todo application, built with TypeScript and Vite. It includes various components and hooks to manage todos, along with a form for adding and editing tasks.


## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/todo-app-frontend.git
   cd todo-app-frontend```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the development server:**
    ```sh
    npm run dev
    ```
    This will start the Vite development server and you can view the app at http://localhost:5173.

## Project Structure
The frontend has the following general structure:

```
index.html 
public/ 
src/
  App.tsx
  main.tsx
  views/
  components/
    ui/
  hooks/
  lib/
```

Key Files and Directories

- index.html: Base html of the app
- public/: Contains static assets.
- src/: Contains the main source code for the application.
  - App.tsx: Contains the App router with views.
  - main.tsx: Entry point for the React application with providers.
  - views/: Contains wievs for the app.
  - components/: Contains reusable UI components.
  - hooks/: Contains custom hooks.
  - lib/: Contains utility functions and schemas.


## Dependencies

The project uses the following dependencies:

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A fast build tool for modern web projects.
- React Hook Form: A library for managing form state in React.
- Radix UI: A set of accessible and customizable UI components.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.

For a complete list of dependencies, refer to the package.json file.