const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/daran/Desktop/TheOh';

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (['node_modules', '.git', '.vercel', 'dist', 'replace.js'].includes(file)) {
      continue;
    }

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkAndReplace(filePath);
    } else if (stat.isFile()) {
      // Only process typical text files based on extensions
      const ext = path.extname(file);
      if (!['.js', '.jsx', '.json', '.html', '.css', '.md', '.env'].includes(ext)) {
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;

      // Replace variants of the oats habit
      content = content.replace(/THE oats habit/gi, 'Nutribowl');
      content = content.replace(/ఓట్స్ హాబిట్/g, 'Nutribowl');

      // Replace variants of THEOH
      content = content.replace(/THEOH/g, 'Nutribowl');
      content = content.replace(/theoh/g, 'nutribowl');
      content = content.replace(/TheOh/g, 'Nutribowl');
      content = content.replace(/TheOH/g, 'Nutribowl');

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

walkAndReplace(directory);
console.log('Done replacing.');
