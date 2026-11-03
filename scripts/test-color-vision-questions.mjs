import assert from 'node:assert/strict';
import {generateQuestions} from '../public/color-vision/question-generator.js';
import {paletteRegistry} from '../public/color-vision/palette-registry.js';
const q=generateQuestions('learning');assert.equal(q.length,6);assert.deepEqual(q.map(x=>x.kind),['number','number','number','landolt','landolt','landolt']);
for(const phase of [q.slice(0,3),q.slice(3)]){
 assert.deepEqual(phase.map(x=>x.stage),['clear','soft','color']);assert.equal(new Set(phase.map(x=>x.value)).size,3);assert.equal(new Set(phase.map(x=>x.seed)).size,3);
 assert.equal(phase[0].presentation,'dots');assert.equal(phase[0].paletteId,'intro-clear');assert.equal(phase[1].paletteId,'intro-mid');assert(!phase[1].soften);assert(!phase[2].soften);
 for(const x of phase){assert.equal(x.choices.length,4);assert(x.choices.includes(x.value));assert(paletteRegistry[x.paletteId]);}
 assert.notEqual(phase[2].paletteId,'intro-mono');
}
assert.deepEqual(q,generateQuestions('learning'));console.log('PASS: six guided steps, distinct answers at each stage, choices, monochrome and color stages');
