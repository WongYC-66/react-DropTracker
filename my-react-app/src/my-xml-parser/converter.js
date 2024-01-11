import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname)

const OUTPUT_LOCATION = "./data/"
// var fs = require('node:fs');
import { diskWriter, parseXML } from './utility.js';
import { MBdataFormatting,
    MobIdDataFormatting,
    ConsumeItemIdDataFormatting,
    EtcItemIdDataFormatting,
    EqpItemIdDataFormatting,
    InsItemIdDataFormatting,
} from './dataFormatting.js';

async function MB() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'MonsterBook.img.xml'))
    const simpleData = MBdataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_MB.json'), simpleData)
}

async function Mob() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'Mob.img.xml'))
    const simpleData = MobIdDataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_Mob.json'), simpleData)
}

async function Consume() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'Consume.img.xml'))
    const simpleData = ConsumeItemIdDataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_Consume.json'), simpleData)
}

async function Etc() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'Etc.img.xml'))
    const simpleData = EtcItemIdDataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_Etc.json'), simpleData)
}

async function Eqp() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'Eqp.img.xml'))
    const simpleData = EqpItemIdDataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_Eqp.json'), simpleData)
}

async function Ins() {
    const obj = await parseXML(path.join(__dirname, "../../data/", 'Ins.img.xml'))
    const simpleData = InsItemIdDataFormatting(obj)
    diskWriter(path.join(__dirname, "../../data/", 'data_Ins.json'), simpleData)
}

function main() {
    MB()
    Mob()
    Consume()
    Etc()
    Eqp()
    Ins()
}

main()