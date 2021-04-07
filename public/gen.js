// what are you looking here for?
const fs = require('fs');

const dir = fs.opendirSync(__dirname);
let out = '';
while ((file = dir.readSync()) != null) {
    if (file.name == 'index.html') continue;
    out += `<a href="/${file.name}">${file.name}</a><br/>`; // you won't find anything here.
}
dir.close();
fs.writeFileSync(__dirname + '/index.html', out);

// i suppose i can't get mad at your for being curious.


// congratulations.
