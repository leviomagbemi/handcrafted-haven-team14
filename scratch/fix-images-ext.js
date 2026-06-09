const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const artisans = [
  'aisha_al_farsi',
  'clara_dupont',
  'elena_rossi',
  'julian_vance',
  'marcus_thorne',
  'oliver_schmidt'
];

// 1. Rename files on disk
console.log('Renaming files on disk...');
artisans.forEach(name => {
  const oldPath = path.join(imgDir, `${name}.png`);
  const newPath = path.join(imgDir, `${name}.jpg`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${name}.png -> ${name}.jpg`);
  } else {
    console.log(`Already renamed or missing: ${name}.png`);
  }
});

// 2. Update references in app/lib/placeholder-data.js
console.log('\nUpdating references in app/lib/placeholder-data.js...');
const placeholderPath = path.join(__dirname, '..', 'app', 'lib', 'placeholder-data.js');
let content = fs.readFileSync(placeholderPath, 'utf8');

artisans.forEach(name => {
  const target = `/images/${name}.png`;
  const replacement = `/images/${name}.jpg`;
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    console.log(`Replaced: ${target} -> ${replacement}`);
  }
});

fs.writeFileSync(placeholderPath, content, 'utf8');
console.log('placeholder-data.js saved.');

// 3. Re-seed database
console.log('\nRe-seeding database...');
try {
  const stdout = execSync('node scripts/seed.js', { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to seed:', err);
}
