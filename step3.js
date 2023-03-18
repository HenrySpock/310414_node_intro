const axios = require('axios');
const { promises: fs } = require('fs');

async function cat(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (err) {
    console.error(`Error reading ${path}: ${err.message}`);
    return null;
  }
}

async function webCat(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(`Error fetching ${url}: ${err.message}`);
    return null;
  }
} 

async function writeToFile(outputPath, data) {
    try {
      await fs.appendFile(outputPath, data);
      console.log(`Appended to ${outputPath}`);
    } catch (err) {
      console.error(`Couldn't write to ${outputPath}: ${err.message}`);
    }
  }

  async function main() {
    const args = process.argv.slice(2);
  
    const outputIndex = args.indexOf('--out');
    let output = null;
  
    if (outputIndex !== -1 && outputIndex + 1 < args.length) {
      output = args[outputIndex + 1];
      try {
        await fs.writeFile(output, ''); // Creates the file if it doesn't exist
      } catch (err) {
        console.error(`Couldn't create ${output}: ${err.message}`);
        return;
      }
    }
  
    for (const input of args) {
      if (input === '--out' || input === output) continue;
  
      if (!input) {
        console.error('No input file or URL specified');
        return;
      }
  
      let data;
      if (input.startsWith('http://') || input.startsWith('https://')) {
        data = await webCat(input);
      } else {
        data = await cat(input);
      }
  
      if (output) {
        await writeToFile(output, data);
      } else {
        console.log(data);
      }
    }
  }
  

main();
 