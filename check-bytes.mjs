import fs from 'fs';

const raw = fs.readFileSync('D:\\rajubhai-website-ordering\\README.md');
console.log('File size:', raw.length, 'bytes');
console.log('First 4 bytes (hex):', [...raw.slice(0, 4)].map(b => b.toString(16).padStart(2, '0')).join(' '));

// Check for BOM
if (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) {
  console.log('Has UTF-8 BOM');
} else {
  console.log('No UTF-8 BOM');
}

// Check for null bytes or other control characters
let nullCount = 0;
let controlCount = 0;
let highByteCount = 0;
for (let i = 0; i < raw.length; i++) {
  if (raw[i] === 0) nullCount++;
  if (raw[i] < 32 && raw[i] !== 10 && raw[i] !== 13 && raw[i] !== 9) controlCount++;
  if (raw[i] > 127) highByteCount++;
}
console.log('Null bytes:', nullCount);
console.log('Control chars (excluding LF/CR/TAB):', controlCount);
console.log('High bytes (>127):', highByteCount);

// Try to decode as UTF-8
const text = raw.toString('utf8');
console.log('\nDecoded text length:', text.length, 'chars');
console.log('Contains replacement char:', text.includes('\uFFFD'));
console.log('\nFirst 300 chars:');
console.log(text.slice(0, 300));
