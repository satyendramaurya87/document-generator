const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}=== Document Generator Build Script ===${colors.reset}\n`);

try {
  // Step 1: Install dependencies
  console.log(`${colors.yellow}Installing dependencies...${colors.reset}`);
  execSync('npm install', { stdio: 'inherit' });
  console.log(`${colors.green}Dependencies installed successfully!${colors.reset}\n`);

  // Step 2: Build the application
  console.log(`${colors.yellow}Building the application...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Application built successfully!${colors.reset}\n`);

  // Step 3: Verify build directory
  const buildDir = path.join(__dirname, 'build');
  if (fs.existsSync(buildDir)) {
    console.log(`${colors.green}Build directory verified!${colors.reset}`);
    const files = fs.readdirSync(buildDir);
    console.log(`${colors.cyan}Build contains ${files.length} files/directories${colors.reset}`);
  } else {
    console.log(`${colors.red}Build directory not found!${colors.reset}`);
    process.exit(1);
  }

  // Step 4: Deployment instructions
  console.log(`\n${colors.bright}${colors.cyan}=== Deployment Instructions ===${colors.reset}`);
  console.log(`\n${colors.yellow}To deploy to Vercel:${colors.reset}`);
  console.log(`1. Install Vercel CLI: ${colors.cyan}npm install -g vercel${colors.reset}`);
  console.log(`2. Login to Vercel: ${colors.cyan}vercel login${colors.reset}`);
  console.log(`3. Deploy: ${colors.cyan}vercel${colors.reset}`);
  console.log(`\n${colors.yellow}For GitHub deployment:${colors.reset}`);
  console.log(`1. Push to GitHub repository`);
  console.log(`2. Connect repository to Vercel dashboard`);
  console.log(`3. Vercel will automatically deploy your application`);

  console.log(`\n${colors.bright}${colors.green}Build process completed successfully!${colors.reset}`);
} catch (error) {
  console.error(`\n${colors.red}Error during build process:${colors.reset}`, error.message);
  process.exit(1);
}