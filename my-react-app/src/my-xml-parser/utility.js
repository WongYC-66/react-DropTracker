import * as fs from 'fs';
import util from 'util'

// import * as parse from 'xml-parser';
import parse from 'xml-parser'

export function diskWriter(path, simpleData) {
    try {
        fs.writeFileSync(path, JSON.stringify(simpleData));
        // file written successfully
    } catch (err) {
        console.error(err);
    }
}

export async function parseXML(FilePath) {
    // read and parsing xml file from e.g. MonsterBook.img.xml 
    // var parse = require('xml-parser');
    var xml = fs.readFileSync(FilePath, 'utf8');
    var inspect = util.inspect;
    var obj = parse(xml);
    // console.log(inspect(obj, { colors: true, depth: Infinity }));
    return obj
}


// module.exports = {
//     diskWriter,
//     parseXML,
// };