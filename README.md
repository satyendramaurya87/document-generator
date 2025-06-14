# Document Generator with Plate.js and CSV Import

A modern document editor built with React.js and Plate.js that allows you to create rich text documents and import CSV data as tables.

## Features

- Rich text editing with Plate.js
- CSV import functionality
- Table generation from CSV data
- Modern UI with Material UI components
- Document formatting options (bold, italic, lists, etc.)
- Table, image, and link insertion

## Tech Stack

- React.js - Frontend framework
- Plate.js - Rich text editor framework
- Material UI - UI components
- Papa Parse - CSV parsing library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Document Editing

Use the toolbar buttons to format your text, insert tables, images, and links.

### CSV Import

1. Click the "Upload CSV" button
2. Select a CSV file from your computer
3. The CSV data will be displayed in a table below the editor
4. Click "Insert as Table" to insert the CSV data as a table in your document

## Project Structure

```
├── public/                 # Public assets
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── CSVImporter.js  # CSV import component
│   │   └── Toolbar.js      # Editor toolbar component
│   ├── plugins/            # Custom Plate.js plugins
│   │   └── deserializeCSV.js # CSV deserialization plugin
│   ├── App.css             # App styles
│   ├── App.js              # Main application component
│   ├── index.css           # Global styles
│   └── index.js            # Application entry point
└── package.json            # Project dependencies
```

## Deployment with Vercel

### Automatic Deployment

1. Push your code to a GitHub repository
2. Sign up or log in to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the React application
5. Click "Deploy" and wait for the build to complete
6. Your application will be available at a Vercel-generated URL

### Manual Deployment

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Build your application:

```bash
npm run build
```

3. Deploy to Vercel:

```bash
vercel login
vercel
```

4. Follow the prompts to complete the deployment

### Configuration

The project includes a `vercel.json` file with the necessary configuration for deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    { "src": "/static/(.*)", "dest": "/static/$1" },
    { "src": "/favicon.ico", "dest": "/favicon.ico" },
    { "src": "/manifest.json", "dest": "/manifest.json" },
    { "src": "/logo192.png", "dest": "/logo192.png" },
    { "src": "/logo512.png", "dest": "/logo512.png" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## License

MIT