/**
 * File: check-file-headers.js
 * Created: [Current Date]
 * Changes: Initial creation - Script to check for files missing header comments
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// File extensions to check
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md'];

// Directories to exclude
const excludeDirs = ['node_modules', '.next', '.git', 'public'];

// Function to check if a file has a header comment
function hasHeaderComment(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const firstLines = content.split('\n').slice(0, 10).join('\n');
    
    // Check for the header comment pattern
    return firstLines.includes('/**') && 
           firstLines.includes('* File:') && 
           firstLines.includes('* Created:') && 
           firstLines.includes('* Changes:');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

// Function to find all files with specified extensions
function findFiles() {
  const srcDir = path.resolve(__dirname, '../src');
  const excludePattern = excludeDirs.map(dir => `**/${dir}/**`).join('|');
  
  let allFiles = [];
  
  extensions.forEach(ext => {
    const files = glob.sync(`${srcDir}/**/*${ext}`, {
      ignore: excludePattern
    });
    allFiles = [...allFiles, ...files];
  });
  
  return allFiles;
}

// Main function
function checkFileHeaders() {
  const files = findFiles();
  const filesWithoutHeaders = [];
  
  files.forEach(file => {
    if (!hasHeaderComment(file)) {
      filesWithoutHeaders.push(file);
    }
  });
  
  if (filesWithoutHeaders.length > 0) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️  The following files are missing header comments:');
    filesWithoutHeaders.forEach(file => {
      console.log(`  - ${path.relative(process.cwd(), file)}`);
    });
    console.log('\nPlease add header comments to these files following the format in src/CONTRIBUTING.md');
    process.exit(1);
  } else {
    console.log('\x1b[32m%s\x1b[0m', '✅ All files have proper header comments!');
    process.exit(0);
  }
}

// Run the check
checkFileHeaders(); 