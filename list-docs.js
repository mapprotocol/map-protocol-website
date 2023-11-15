const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public/docs'); // directory path
const outputPath = path.join(__dirname, 'public/docs-list.json'); // output file path

const extractTitleFromMd = (content) => {
  const lines = content.split('\n');
  for (let line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim();
    }
  }
  return null;
};

const generateTree = (dir, relativePath = '') => {
  const result = {
    type: 'directory',
    name: path.basename(dir),
    children: []
  };

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    const itemRelativePath = path.join(relativePath, item);

    if (isDirectory) {
      result.children.push(generateTree(itemPath, itemRelativePath));
    } else if (path.extname(item) === '.md') {
      const content = fs.readFileSync(itemPath, 'utf-8');
      const title = extractTitleFromMd(content) || item;
      const mdPath = itemRelativePath.replace('.md', '');

      result.children.push({
        type: 'file',
        name: title,
        path: mdPath  // Add path field here
      });
    }
  });

  return result;
};

const tree = generateTree(dirPath);
fs.writeFileSync(outputPath, JSON.stringify(tree, null, 2), 'utf8');

console.log('Markdown files tree with titles and paths generated successfully!');