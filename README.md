# Next.js Google Apps Script Integration

This project demonstrates how to integrate a **Next.js** application with a **Google Apps Script** backend. It allows users to submit a form, which is then processed by a Google Apps Script and stored in a Google Sheet.

## Features

- **Form Submission**: Users can submit a form with fields like name, email, services, and comments.
- **Google Apps Script Backend**: The form data is sent to a Google Apps Script, which processes the data and appends it to a Google Sheet.
- **Environment Variables**: The Google Apps Script URL is stored as an environment variable for security and flexibility.
- **Responsive UI**: The form and services selection are displayed in a user-friendly, responsive layout.

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A **Google Apps Script** deployed as a web app (with `doPost` and `doGet` methods)
- A **Google Sheet** linked to the Google Apps Script for storing form data

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
Install the required dependencies using npm or yarn:

```bash Copy
npm install
```

### 3. Set Up Environment Variables
Create a .env.local file in the root of your project and add the following environment variable:

``` env Copy
NEXT_PUBLIC_APP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_ID/exec
```

Replace YOUR_GOOGLE_APPS_SCRIPT_ID with the actual ID of your deployed Google Apps Script.

### 4. Run the Development Server
Start the development server:

``` bash Copy
npm run dev
```
The application will be available at http://localhost:3000.

``` Project Structure Copy
your-repo-name/
├── app/
│   ├── api/
│   │   └── submit-form/
│   │       └── route.ts        # API route for form submission
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   └── ServicesDropdown.tsx    # Component for selecting services
├── hooks/
│   └── useServices.ts          # Custom hook for fetching services
├── public/                     # Static assets
├── styles/                     # Global styles
├── .env.local                  # Environment variables
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Usage

### 1. Form Submission
Open the application in your browser (http://localhost:3000).

Fill out the form fields (name, email, services, comments).

Click Submit to send the data to the Google Apps Script.

### 2. Google Apps Script
The Google Apps Script processes the form data and appends it to a Google Sheet. Ensure your Google Apps Script is deployed as a web app with the following functions:

doPost(e): Handles POST requests from the Next.js app.

doGet(e): Handles GET requests (optional, for fetching data).

### 3. Environment Variables
The Google Apps Script URL is stored in the NEXT_PUBLIC_APP_SCRIPT_URL environment variable.

For production, set the environment variable in your hosting platform (e.g., Vercel, Netlify).

## Deployment
### 1. Build the Project
Generate an optimized production build:

```bash Copy
npm run build
```

### 2. Deploy to Vercel
Install the Vercel CLI (if not already installed):

```bash Copy
npm install -g vercel
```

Deploy the project:


```bash 
vercel
```

Set the NEXT_PUBLIC_APP_SCRIPT_URL environment variable in the Vercel dashboard.

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments
Next.js Documentation
Google Apps Script Documentation
Material-UI for UI components