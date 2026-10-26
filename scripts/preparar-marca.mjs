import sharp from 'sharp';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Deterministic resize/composition of the official matrix. Never redraws the mark.
const source = new URL('../public/assets/bm-capital-logo-transparente.png', import.meta.url);
const original = await readFile(source);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const brandDir = new URL('../public/assets/brand/', import.meta.url);
const iconDir = new URL('../public/icons/', import.meta.url);
await mkdir(brandDir, {recursive:true});
await mkdir(iconDir, {recursive:true});
const outputs = [];
for (const width of [155,310]) {
 const file = new URL(`bm-capital-${width}.webp`, brandDir);
 await sharp(original).resize({width}).webp({lossless:true}).toFile(file.pathname);
 outputs.push({file:file.pathname,bytes:(await stat(file)).size});
}
async function icon(size) {
 const width = Math.round(size*.88);
 const mark = await sharp(original).resize({width}).png().toBuffer();
 return sharp({create:{width:size,height:size,channels:4,background:'#071827'}}).composite([{input:mark,gravity:'centre'}]).png().toBuffer();
}
for (const [size,name] of [[32,'favicon-32.png'],[180,'apple-touch-icon.png'],[192,'icon-192.png']]) {
 const file=new URL(name,iconDir);await writeFile(file,await icon(size));
 outputs.push({file:file.pathname,bytes:(await stat(file)).size});
}
// ICO container with the full official mark, centred; no monogram crop.
const icons=await Promise.all([16,32,48].map(icon));
const header=Buffer.alloc(6+16*icons.length);header.writeUInt16LE(1,2);header.writeUInt16LE(icons.length,4);
let offset=header.length;
for (let i=0;i<icons.length;i++) {
 const size=[16,32,48][i],entry=6+16*i;
 header[entry]=size;header[entry+1]=size;header.writeUInt16LE(1,entry+4);header.writeUInt16LE(32,entry+6);header.writeUInt32LE(icons[i].length,entry+8);header.writeUInt32LE(offset,entry+12);offset+=icons[i].length;
}
await writeFile(new URL('favicon.ico',iconDir),Buffer.concat([header,...icons]));
const backdrop=Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#071827"/><path d="M80 68H240M1120 562H960" stroke="#cba45e" stroke-width="2"/><text x="600" y="390" text-anchor="middle" font-family="Georgia,DejaVu Serif,serif" font-size="42" fill="#f7f4ee">Não começamos pelo produto.</text><text x="600" y="451" text-anchor="middle" font-family="Georgia,DejaVu Serif,serif" font-size="42" fill="#cba45e">Começamos pelo objetivo.</text><text x="600" y="552" text-anchor="middle" font-family="Arial,DejaVu Sans,sans-serif" font-size="23" fill="#c5cdd1">www.solucoesbmcapital.com.br</text></svg>`);
const logo=await sharp(original).resize({width:460}).png().toBuffer();
await sharp(backdrop).composite([{input:logo,left:370,top:70}]).png().toFile(new URL('bm-capital-compartilhamento.png',brandDir).pathname);
if (hash(original)!==hash(await readFile(source))) throw new Error('Official matrix changed');
console.log(JSON.stringify({matrixSha256:hash(original),matrixBytes:original.length,outputs},null,2));
