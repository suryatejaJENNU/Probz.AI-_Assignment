# Charting Application

This project is a React-based charting application that allows users to visualize data using recharts library and export the chart as a PNG image.

# Deployment
The project is deployed at https://suryateja-probzai-assignment.netlify.app/.

# GitHub Repository
GitHub Repository: https://github.com/suryatejaJENNU/Probz.AI-_Assignment

## Features

- **Charting:** Displays a line chart using recharts library.
- **Timeframe Selection:** Allows users to switch between daily, weekly, and monthly data views.
- **Export Chart:** Enables users to export the chart as a PNG image.

## Technologies Used

- **React:** Frontend library for building user interfaces.
- **recharts:** React charting library for creating charts.
- **html2canvas:** Library to capture screenshots and export them as images.
- **TypeScript:** Typed superset of JavaScript for improved code quality and development experience.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/suryatejaJENNU/Probz.AI-_Assignment
   cd Probz.AI-_Assignment
2. Install dependencies:

    bash
    Copy code
    npm install
    Running the Application
    Start the development server:

    bash
    Copy code
    npm start
    Open your browser and go to http://localhost:3000 to view the application.

3. Usage
    Select a timeframe (daily, weekly, monthly) using the dropdown selector to update the chart.
    Click on the "Export Chart" button to download the chart as a PNG image.

4. Folder Structure 
    /public 
    /assets
    data.json             # Sample data for the chart
    /src
    /components
    Chart.tsx             # Main chart component
    TimeframeSelector.tsx # Component for selecting timeframe
    Chart.css             # Stylesheet for chart component
    TimeframeSelector.css # Stylesheet for timeframe selector component
  App.tsx                 # Main application component
  index.tsx               # Entry point of the application

### Explanation:

- **Project Overview:** Briefly describes what the project is about and its main functionalities (charting, timeframe selection, export).
- **Features:** Lists key features of the application.
- **Technologies Used:** Highlights the technologies and libraries used in the project.
- **Getting Started:** Provides instructions on how to clone the repository, install dependencies, and run the application locally.
- **Usage:** Explains how to use the application, including selecting timeframes and exporting charts.
- **Folder Structure:** Illustrates the folder structure of the project for better navigation and understanding.
