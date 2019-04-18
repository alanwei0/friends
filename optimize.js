const fs = require('fs');
const path = require('path');

const SEASON_DIR = './season';
const BAK_DIR = './bak';

// create bak directory
if (!fs.existsSync(BAK_DIR)) {
    fs.mkdirSync(BAK_DIR);
}

// get all episode htmls
const files = fs.readdirSync(SEASON_DIR);

// read snippet
const snippet = fs.readFileSync('./snippet.html', { encoding: 'utf-8' });

files.forEach(fileName => {
    if (!/\.html$/.test(fileName)) { return; }
    const filePath = path.resolve(SEASON_DIR, fileName);
    let str = fs.readFileSync(filePath, { encoding: 'utf-8' });
    // back up
    fs.copyFileSync(filePath, path.resolve(BAK_DIR, fileName));

    str = str.replace(/<\/title>.*?<\/head>/s, `</title>\n${snippet}\n</head>`);
    console.log('write: ', fileName);
    fs.writeFileSync(filePath, str);
});
