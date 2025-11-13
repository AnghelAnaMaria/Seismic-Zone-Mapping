// build config.js
require('dotenv').config();
const fs = require('fs');

const content = `const GOOGLE_MAPS_API_KEY = "${process.env.GOOGLE_MAPS_API_KEY}";`;
fs.writeFileSync('config.js', content);
console.log('config.js created!');
