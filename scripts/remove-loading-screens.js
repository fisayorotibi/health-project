/**
 * This script updates all files that use isMounted state with an initial value of false
 * to use an initial value of true, which prevents loading screens when switching tabs.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files with isMounted state
const findFiles = () => {
  try {
    const result = execSync('grep -r "const \\[isMounted, setIsMounted\\] = useState(false)" --include="*.tsx" src/').toString();
    return result.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [filePath] = line.split(':');
        return filePath;
      })
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  } catch (error) {
    console.error('Error finding files:', error);
    return [];
  }
};

// Update a file to use isMounted with initial value of true
const updateFile = (filePath) => {
  try {
    console.log(`Updating ${filePath}...`);
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace isMounted initialization
    const updatedContent = content
      .replace(
        /const \[isMounted, setIsMounted\] = useState\(false\);/g, 
        'const [isMounted, setIsMounted] = useState(true); // Changed from false to true to prevent loading screen'
      )
      .replace(
        /useEffect\(\(\) => {\s*setIsMounted\(true\);/g,
        'useEffect(() => {\n    // No need to set isMounted here since it\'s already true'
      );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✅ Updated ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
};

// Update dynamic imports with loading property
const updateDynamicImports = () => {
  try {
    // Find files with dynamic imports that have loading property
    const result = execSync('grep -r "loading: () =>" --include="*.tsx" src/').toString();
    const files = result.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [filePath] = line.split(':');
        return filePath;
      })
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    
    for (const filePath of files) {
      console.log(`Updating dynamic import in ${filePath}...`);
      
      // Read the file
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Replace dynamic import with loading property
      const updatedContent = content.replace(
        /dynamic\(\(\) => import\([^)]+\), \{\s*ssr: false,\s*loading: \(\) => \(\s*.*?\s*\)\s*\}\)/gs,
        (match) => {
          return match.replace(/,\s*loading: \(\) => \(\s*.*?\s*\)\s*/, '');
        }
      );
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`✅ Updated dynamic import in ${filePath}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating dynamic imports:', error);
    return false;
  }
};

// Main function
const main = () => {
  console.log('🔍 Finding files with isMounted state...');
  const files = findFiles();
  
  if (files.length === 0) {
    console.log('No files found with isMounted state.');
    return;
  }
  
  console.log(`Found ${files.length} files with isMounted state.`);
  
  let successCount = 0;
  for (const filePath of files) {
    if (updateFile(filePath)) {
      successCount++;
    }
  }
  
  console.log(`\n✅ Updated ${successCount}/${files.length} files with isMounted state.`);
  
  console.log('\n🔍 Updating dynamic imports with loading property...');
  if (updateDynamicImports()) {
    console.log('✅ Updated dynamic imports.');
  }
  
  console.log('\n🎉 Done! The loading screens should no longer appear when switching tabs.');
};

main(); 