# Introduction
`financial_dashboard` is a MERN stack project. I created this project to practice full-stack development, TypeScript, web design, data analytics, regression, and deployment on Docker Desktop.

## fd_server
`fd_server` is a backend server application built with Node.js and Express. It uses MongoDB as its database and includes various middleware for environment configuration and security. This server is created based on MVC Framework. I learnt to set up Mongo cluster, connection, and data modelling.

### Structure
- **models/**: Contains Mongoose models that define the schema for the MongoDB collections used in the application.
- **routes/**: Contains controller functions that handle incoming requests and interact with the models as well as route definitions that map HTTP requests to the appropriate controller functions.
- **data/**: Contain the mock data of the project
- **index.js**: The entry point of the server application, setting up the app and connecting to the MongoDB database.

### Main Dependencies
**body-parser**: Middleware for parsing request bodies.  
**cors**: Middleware for enabling Cross-Origin Resource Sharing.  
**dotenv**: Loads environment variables from a `.env` file.  
**express**: Web framework for Node.js.  
**helmet**: Security middleware for HTTP headers.  
**mongoose**: MongoDB object modeling tool.  
**mongoose-currency**: Plugin adds support for currency data types in MongoDB.  
**morgan**: HTTP request logger middleware.  
**nodemon**: Utility for automatically restarting the server during development.  

## fd_client
`fd_client` is a Vite React-based application designed for managing and displaying financial dashboard. It utilizes Material UI for styling and layout, Redux for state management, Recharts for data visualization, and Regression for regression analysis. I learnt to layout the page with box and theme color, and design endpoints for different purposes.

### Structure
- **src/components/**: Contains reusable components for design.
- **src/scenes/**: Contains configuration for all the project pages.
- **src/state/**: Contains API configuration, endpoints, hooks in `api.ts`. Contains interface for type in `types.ts`.
- **App.tsx**: Sets up the main structure of the application with theming, routing, and state management.
- **index.css**: Sets up global styles.
- **main.tsx**: Sets up the entry point for the application.
- **theme.ts**: Defines theme settings using Material-UI.
- **expanded-theme.ts**: Extends the Material UI theme's palette to include custom properties.

### Main Dependencies
**@emotion/react**: Library for writing CSS styles with JavaScript.  
**@emotion/styled**: Styled components for Emotion.  
**@mui/icons-material**: Material Design icons for MUI.  
**@mui/material**: Material-UI components for React.  
**@mui/x-data-grid**: Data grid component for MUI.   
**@reduxjs/toolkit**: Toolkit for efficient Redux development.  
**react-dom**: Entry point for React DOM rendering.  
**react-redux**: Official React bindings for Redux.  
**react-router-dom**: DOM bindings for React Router.  
**recharts**: Charting library  
**regression**: Library for performing regression analysis.  
**@types/react**: TypeScript definitions for React.  
**@types/react-dom**: TypeScript definitions for React DOM.  
**@types/regression**: TypeScript definitions for the regression library.  
**typescript**: TypeScript language and compiler.

# Usage
## Prerequisites
- Node.js (version 14 or higher)
- npm (version 5.6 or higher)
- MongoDB online cluster

## Server Preparation
1. Clone the repository:
   ```
   git clone https://github.com/DozyXYZ/financial_dashboard.git
   ```
2. In the project directory, navigate to the server folder:
   ```
   cd fd_server
   ```
3. Install dependencies:
   ```
   npm i
   ```
4. Create a `.env` file in the root directory of `fd_server` and add your MongoDB connection string (the string can be difference)
   ```
   MONGO_URL="mongodb+srv://<database_username>:<password>@trial.ljhqm.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Trial"
   PORT=<PORT_NUMBER>
   ```
5. Uncomment the comments in the "MONGOOSE SETUP" part in the `index.js` file in the main folder
6. Start the server, the first start will upload the data to your MongoDB database, you have to this only once
   ```
   npm run dev
   ```
7. Comment out the lines in the "MONGOOSE SETUP", save the file to reload the server.
8. The database and server is ready.

## Client Preparation
1. Open a new terminal and navigate to the client folder from the server folder:
   ```
   cd ..
   cd fd_client
   ```
2. Install dependencies:
   ```
   npm i
   ```
3. Create a `.env.local` file in the root directory of `fd_client` and add in the following line. The port number should match with the one in the `.env` of the server side:
   ```
   VITE_BASE_URL=http://localhost:<PORT_NUMBER>
   ```
4. Start the client application:
   ```
   npm run dev
   ```
5. The app is loaded to the browser after compiling.

# Docker Desktop (Optional)
If you have Docker Desktop, you can deploy the project there.

**Note**: Change the ports in the `fd_server` service in `docker-compose.yml` file to the port you put in fd_server/.env file.

In the root directory of the project, run the command:
   ```
   docker-compose -f docker-compose.yml up --build
   ```