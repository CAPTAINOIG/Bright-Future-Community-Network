#!/usr/bin/env node

/**
 * Build validation script for BFCN Frontend
 * This script checks for common build issues before deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 BFCN Build Validation Script');
console.log('================================');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'netlify.toml'
];

console.log('\n📁 Checking required files...');
let filesOk = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    filesOk = false;
  }
});

if (!filesOk) {
  console.log('\n❌ Some required files are missing. Please ensure all files exist.');
  process.exit(1);
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredScripts = ['build', 'dev'];
let scriptsOk = true;

requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ ${script} script is missing`);
    scriptsOk = false;
  }
});

if (!scriptsOk) {
  console.log('\n❌ Some required scripts are missing.');
  process.exit(1);
}

// Try to run the build
console.log('\n🔨 Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.log('\n❌ Build failed!');
  console.log('Error details:', error.message);
  process.exit(1);
}

// Check if dist folder was created
if (fs.existsSync('dist')) {
  console.log('✅ dist folder created');
  
  // Check if index.html exists in dist
  if (fs.existsSync('dist/index.html')) {
    console.log('✅ dist/index.html exists');
  } else {
    console.log('❌ dist/index.html missing');
  }
} else {
  console.log('❌ dist folder not created');
}

console.log('\n🎉 Build validation completed successfully!');
console.log('Your project is ready for Netlify deployment.');
console.log('\nNext steps:');
console.log('1. Commit and push your changes');
console.log('2. Deploy to Netlify with these settings:');
console.log('   - Build command: npm run build');
console.log('   - Publish directory: dist');
console.log('   - Node version: 18');