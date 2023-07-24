# Fracttaltest - Frontend

![Fracttaltest]

Welcome to the Fracttaltest frontend repository! This project is a Single Page Application (SPA) built with React.js, designed to handle user authentication and display a table with information about individuals, including their names, IDs, and job descriptions. The application allows CRUD operations on the table and maintains a log of transactions.

## Installation

To get started with Fracttaltest frontend, make sure you have [Node.js](https://nodejs.org) installed. Then, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project's root directory using the terminal or command prompt.
3. Run the following command to install the required dependencies:

```bash
npm install
```

This will install all the necessary packages listed in the `package.json` file.

## Usage

Once you have installed the dependencies, you can use the following scripts to interact with the application:

- `npm start`: Launches the development server and opens the application in your default browser for local development.
- `npm run build`: Builds the application for production deployment.
- `npm test`: Runs the test suite to perform unit testing.
- `npm run eject`: Ejects the application from the Create React App scripts, providing full control over the configuration.

## Dependencies

The Fracttaltest frontend relies on the following main dependencies:

- `@testing-library/jest-dom`: Jest DOM custom matchers for testing.
- `@testing-library/react`: React testing utilities.
- `@testing-library/user-event`: User events testing utilities.
- `@types/crypto-js`: TypeScript definitions for CryptoJS.
- `@types/jest`: TypeScript definitions for Jest.
- `@types/node`: TypeScript definitions for Node.js.
- `@types/react`: TypeScript definitions for React.
- `@types/react-dom`: TypeScript definitions for React DOM.
- `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes automatically.
- `axios`: Promise-based HTTP client for making API requests.
- `crypto-js`: JavaScript library for cryptographic functions.
- `date-fns`: Modern JavaScript date utility library.
- `formik`: Form library for React and React Native applications.
- `js-cookie`: JavaScript library to handle browser cookies.
- `postcss`: CSS post-processor to transform CSS using JavaScript.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: Provides DOM-specific methods for React.
- `react-router-dom`: DOM bindings for React Router, facilitating navigation.
- `react-scripts`: Configuration and scripts for Create React App.
- `tailwindcss`: Utility-first CSS framework.
- `typescript`: TypeScript language and compiler.
- `web-vitals`: Library for measuring web vitals metrics.
- `yup`: JavaScript object schema validation library.

## Project Structure

The project's folder structure follows the recommended conventions for a React application, keeping code organized and maintainable. Here's an overview of the main directories and files:

- `/public`: Contains the public assets and the main `index.html` file.
- `/src`: The source folder where all application code resides.
  - `/components`: Contains reusable React components used throughout the application.
  - `/scenes`: Includes individual pages representing different views of the application.
  - `/services`: Holds service modules responsible for API communication and other external services.
  - `/utils`: Contains utility functions used across the application.
  - `App.js`: The entry point of the application.
  - `index.js`: The entry point of React, rendering the root component (`App`) to the DOM.

## Contributing

Contributions to Fracttaltest frontend are welcome! If you encounter any issues, have suggestions for improvements, or want to add new features, please open an issue or submit a pull request. Before contributing, please read our [Contributing Guidelines](CONTRIBUTING.md).

## License

Fracttaltest frontend is licensed under the MIT License. You can find more details in the [LICENSE](LICENSE) file.

---

Thank you for choosing Fracttaltest frontend! If you have any questions or need further assistance, feel free to contact us at jucamilo340@gmail.com.
