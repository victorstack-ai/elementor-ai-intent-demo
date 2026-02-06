const fs = require('fs');
const path = require('path');

const examplesDir = path.join(__dirname, '..', 'examples');

const intentOptions = new Set([
  'generate_page',
  'generate_section',
  'generate_widget',
  'edit_copy',
  'style_update',
  'layout_optimize',
  'explain',
  'audit'
]);

const targetOptions = new Set([
  'page',
  'section',
  'container',
  'widget',
  'global',
  'template'
]);

const exampleFiles = fs
  .readdirSync(examplesDir)
  .filter((file) => file.endsWith('.json'))
  .sort();

let hasErrors = false;

const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

for (const file of exampleFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(examplesDir, file), 'utf8'));
  const errors = [];

  if (!isString(data.version) || !/^\d+\.\d+\.\d+$/.test(data.version)) {
    errors.push('version must be a semver string');
  }

  if (!isString(data.intent) || !intentOptions.has(data.intent)) {
    errors.push('intent must be a supported enum');
  }

  if (!data.target || typeof data.target !== 'object') {
    errors.push('target must be an object');
  } else if (!isString(data.target.type) || !targetOptions.has(data.target.type)) {
    errors.push('target.type must be a supported enum');
  }

  if (!isString(data.prompt) || data.prompt.trim().length < 10) {
    errors.push('prompt must be at least 10 characters');
  }

  if (data.output && data.output.confidence !== undefined) {
    if (!isNumber(data.output.confidence) || data.output.confidence < 0 || data.output.confidence > 1) {
      errors.push('output.confidence must be between 0 and 1');
    }
  }

  if (errors.length) {
    hasErrors = true;
    console.error(`\n${file} failed validation:`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
  } else {
    console.log(`${file} OK`);
  }
}

if (hasErrors) {
  console.error('\nIntent validation failed.');
  process.exit(1);
}

console.log('\nAll intents validated successfully.');
