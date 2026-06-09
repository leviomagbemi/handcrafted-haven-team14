const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');
const images = [
  'aisha_al_farsi.png',
  'clara_dupont.png',
  'elena_rossi.png',
  'julian_vance.png',
  'marcus_thorne.png',
  'oliver_schmidt.png'
];

images.forEach(imgName => {
  const imgPath = path.join(imgDir, imgName);
  if (!fs.existsSync(imgPath)) {
    console.log(`${imgName}: DOES NOT EXIST`);
    return;
  }
  const buffer = fs.readFileSync(imgPath);
  const size = buffer.length;
  // Get first 8 bytes
  const header = buffer.slice(0, 8).toString('hex');
  console.log(`${imgName}: size=${size} bytes, header=${header}`);
  
  // PNG header signature: 89 50 4e 47 0d 0a 1a 0a
  if (header.startsWith('89504e470d0a1a0a')) {
    console.log(`  -> Valid PNG`);
  } else if (header.startsWith('52494646') && buffer.slice(8, 12).toString('ascii') === 'WEBP') {
    console.log(`  -> Actually WEBP`);
  } else if (header.startsWith('ffd8ff')) {
    console.log(`  -> Actually JPEG`);
  } else {
    console.log(`  -> Unknown format!`);
  }
});
