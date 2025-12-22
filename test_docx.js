import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('static/templatex.docx');
const zip = new PizZip(content);

const xmlFile = zip.file('word/document.xml');
if (xmlFile) {
    let xml = xmlFile.asText();
    console.log("Original XML length:", xml.length);
    
    const replacements = {
        a: 'NAME_A',
        b: 'NIK_B',
        c: 'ORG_C',
        d: 'LOC_D',
        e: 'email@example.com',
        f: 'MGR_F',
        g: 'MGR_NIK_G',
        i: 'NAME_I',
        j: 'NIK_J'
    };

    // Block-based replacement
    // Matches {{ ... }} without bridging across paragraphs <w:p>
    xml = xml.replace(/\{\{(?:(?!<w:p).)*?\}\}/g, (match) => {
        // Strip XML tags to see the content inside the placeholder
        const cleanKey = match.replace(/<[^>]+>/g, '').replace(/[\{\}]/g, '').trim();
        console.log(`Found block: "${match.substring(0, 50)}...", clean key: "${cleanKey}"`);
        
        if (replacements[cleanKey]) {
            console.log(`  Replacing "${cleanKey}" with "${replacements[cleanKey]}"`);
            return replacements[cleanKey];
        }
        return match; // Keep unchanged if no replacement found
    });

    console.log("Final XML length:", xml.length);
    fs.writeFileSync('static/cleaned_debug.xml', xml);
    zip.file('word/document.xml', xml);

    const out = zip.generate({ type: 'nodebuffer' });
    fs.writeFileSync('static/result_debug.docx', out);
    console.log("Success!");
}
