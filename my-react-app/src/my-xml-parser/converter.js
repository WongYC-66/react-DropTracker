const OUTPUT_LOCATION = "./data/"

import * as fs from 'fs';
// var fs = require('node:fs');
import { diskWriter, parseXML } from './utility.js';
import { MBdataFormatting,
    MobIdDataFormatting,
    ConsumeItemIdDataFormatting,
    EtcItemIdDataFormatting,
    EqpItemIdDataFormatting,
} from './dataFormatting.js';

async function MB() {
    const obj = await parseXML(OUTPUT_LOCATION + 'MonsterBook.img.xml')
    const simpleData = MBdataFormatting(obj)
    diskWriter(OUTPUT_LOCATION + 'data_MB.json', simpleData)
}

async function Mob() {
    const obj = await parseXML(OUTPUT_LOCATION + 'Mob.img.xml')
    const simpleData = MobIdDataFormatting(obj)
    diskWriter(OUTPUT_LOCATION + 'data_Mob.json', simpleData)
}

async function Consume() {
    const obj = await parseXML(OUTPUT_LOCATION + 'Consume.img.xml')
    const simpleData = ConsumeItemIdDataFormatting(obj)
    diskWriter(OUTPUT_LOCATION + 'data_Consume.json', simpleData)
}

async function Etc() {
    const obj = await parseXML(OUTPUT_LOCATION + 'Etc.img.xml')
    const simpleData = EtcItemIdDataFormatting(obj)
    diskWriter(OUTPUT_LOCATION + 'data_Etc.json', simpleData)
}

async function Eqp() {
    const obj = await parseXML(OUTPUT_LOCATION + 'Eqp.img.xml')
    const simpleData = EqpItemIdDataFormatting(obj)
    diskWriter(OUTPUT_LOCATION + 'data_Eqp.json', simpleData)
}

function main() {
    MB()
    Mob()
    Consume()
    Etc()
    Eqp()
}

main()