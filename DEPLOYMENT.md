# Deployment Guide for Document Generator

This guide provides detailed instructions for deploying the Document Generator application to Vercel.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/) (for GitHub deployment)
- A [Vercel](https://vercel.com/) account

## Deployment Options

There are two main ways to deploy this application to Vercel:

1. **GitHub Integration** (Recommended)
2. **Vercel CLI** (Manual deployment)

## Option 1: GitHub Integration

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize Git in your project folder (if not already done):

```bash
git init
git add .
git commit -m "Initial commit"
```

3. Add your GitHub repository as a remote and push:

```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "New Project" on the Vercel dashboard
3. Import your GitHub repository
4. Vercel will automatically detect the React application
5. Configure your project settings (or use the defaults)
6. Click "Deploy"

### Step 3: Access Your Deployed Application

Once the deployment is complete, Vercel will provide you with a URL to access your application.

## Option 2: Vercel CLI (Manual Deployment)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Build Your Application

You can use the provided build script:

```bash
node build.js
```

Or run the standard build command:

```bash
npm run build
```

### Step 3: Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy to production
npm run deploy

# Or for development deployment
npm run deploy:dev
```

Alternatively, you can use the combined build and deploy command:

```bash
npm run build:deploy
```

## Vercel Configuration

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

This configuration ensures that:

- The application is built using the `@vercel/static-build` builder
- The build output is served from the `build` directory
- All routes are properly handled for a React single-page application

## Troubleshooting

### Build Failures

If your build fails on Vercel, check the build logs for errors. Common issues include:

- Missing dependencies
- Node.js version incompatibility
- Build script errors

### Runtime Errors

If your application deploys but doesn't work correctly:

1. Check the browser console for errors
2. Verify that all environment variables are properly set in Vercel
3. Ensure that your application works locally before deploying

### Deployment Command Issues

If you encounter issues with the Vercel CLI:

1. Make sure you're logged in (`vercel login`)
2. Try running with the `--debug` flag for more information
3. Update the Vercel CLI to the latest version

## Custom Domains

To use a custom domain with your Vercel deployment:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow the instructions to configure DNS settings

## Continuous Deployment

When using GitHub integration, Vercel automatically sets up continuous deployment:

- Every push to the main branch will trigger a production deployment
- Pull requests will create preview deployments

You can customize this behavior in the Vercel project settings.