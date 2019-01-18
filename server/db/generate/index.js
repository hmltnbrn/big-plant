const fs = require('fs');

fs.readFileAsync = function(filename, enc) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, enc, function(err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};

fs.writeFileAsync = function(filename, input) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filename, input, function(err) {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
};

const baseUrl = './server/db/sql/';

async function getDrops(type) {
  try {
    let content = await fs.readFileAsync(baseUrl + type + '.sql', 'utf8')
    let include = false;
    let lines = content.split('\n');
    let drops = [];
    for(var i=0; i<lines.length; i++) {
      if(lines[i] == '\n' || lines[i] == '\r') {
        continue;
      }
      if(lines[i].replace(/[\n\r]+/g, '') == '/* END DROPS */') {
        break;
      }
      if(lines[i].replace(/[\n\r]+/g, '') == '/* START DROPS */') {
        include = true;
        continue;
      }
      if(include == true) {
        drops.push(encodeURIComponent(lines[i].replace(/[\n\r]+/g, '')));
      }
    }
    return drops;
  } catch(err) {
    console.log(err);
  }
}

async function getCreates(type) {
  try {
    let content = await fs.readFileAsync(baseUrl + type + '.sql', 'utf8')
    let include = false;
    let lines = content.split('\n');
    let creates = [];
    for(var i=0; i<lines.length; i++) {
      if(lines[i] == '\n' || lines[i] == '\r') {
        continue;
      }
      if(lines[i].replace(/[\n\r]+/g, '') == '/* END CREATES */') {
        break;
      }
      if(lines[i].replace(/[\n\r]+/g, '') == '/* START CREATES */') {
        include = true;
        continue;
      }
      if(include == true) {
        creates.push(encodeURIComponent(lines[i].replace(/[\n\r]+/g, '')));
      }
    }
    return creates;
  } catch(err) {
    console.log(err);
  }
}

async function compileType(type, template) {
  let drops = await getDrops(type);
  let creates = await getCreates(type);
  let newTemplate = template
    .replace(`-${type}_drops-`, drops.join('\n'))
    .replace(`-${type}_creates-`, creates.join('\n'));
  return newTemplate;
}

async function generateFile() {
  let types = ["data", "domains", "functions", "tables", "views"];
  try {
    var template = await fs.readFileAsync('./server/db/generate/sql_template.txt', 'utf8');
  } catch(err) {
    console.log(err);
  }
  for(var i=0; i<types.length; i++) {
    template = await compileType(types[i], template);
  }
  return decodeURIComponent(template);
}

async function main() {
  let fileContent = await generateFile();
  try {
    await fs.writeFileAsync('./server/db/generate/create.sql', fileContent);
    console.log("Generated create.sql in db/generate/");
  } catch(err) {
    console.log(err);
  }
  process.exit();
}

main();
