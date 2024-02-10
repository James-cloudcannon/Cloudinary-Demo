const fs = require('fs');
const path = require('path');
const os = require('os');

const outFile = 'src/_data/filter-tags.yml';
const tempFile = path.join(os.tmpdir(), 'filter-tags-temp.yml');

console.log(`🏷️ Generating tags at ${outFile}`);

if (!fs.existsSync(path.dirname(outFile))) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
}

if (!fs.existsSync(outFile)) {
    fs.writeFileSync(outFile, '');
}

if (fs.existsSync(outFile)) {
    console.log(`🏷️ Copying ${outFile} to ${tempFile}`);
    fs.copyFileSync(outFile, tempFile);
}

if (fs.existsSync(tempFile)) {
    const lines = fs.readFileSync(tempFile, 'utf8').split('\n');
    let currentFile = '';

    lines.forEach(line => {
        if (line.endsWith(':')) {
            const key = line.slice(0, -1);
            const currentFilePath = `src/_data/${key}.yml`;
            currentFile = currentFilePath;

            if (!fs.existsSync(path.dirname(currentFile))) {
                fs.mkdirSync(path.dirname(currentFile), { recursive: true });
            }
            fs.writeFileSync(currentFile, ''); 
        } else {
            line = line.trimStart();
            if (currentFile) {
                fs.appendFileSync(currentFile, line + '\n');
            }
        }
    });

    fs.unlinkSync(tempFile);
}

fs.unlinkSync(outFile);

let syncPaths = '';

fs.readdirSync('src/_data').filter(file => file.startsWith('filter-') && file.endsWith('.yml')).forEach(file => {
    console.log(`🏷️ Reading src/_data/${file}...`);
    const key = path.basename(file, '.yml');

    fs.appendFileSync(outFile, `${key}:\n`);

    const lines = fs.readFileSync(`src/_data/${file}`, 'utf8').split('\n');

    lines.forEach(line => {
        if (line.trim()) {
            line = line.trimStart();
            fs.appendFileSync(outFile, `  ${line}\n`);
        }
    });

    syncPaths += `src/_data/${file},`;
});

syncPaths = syncPaths.slice(0, -1);

console.log(`🏷️ SYNC_PATHS=${syncPaths}`);


const outputFileContent = fs.readFileSync(outFile, 'utf8');
console.log(outputFileContent);

console.log('🏷️ Done generating tags at ' + outFile + ', listing files:');
fs.readdirSync('src/_data').forEach(file => {
    console.log(`src/_data/${file}`);
});
