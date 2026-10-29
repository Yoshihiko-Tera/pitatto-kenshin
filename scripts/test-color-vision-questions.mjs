import assert from 'node:assert/strict';
import {generateQuestions} from '../public/color-vision/question-generator.js';
for(let seed=0;seed<1000;seed++){
 const questions=generateQuestions(seed),numbers=questions.slice(0,8);
 assert.deepEqual(questions,generateQuestions(seed));assert.equal(questions.length,12);
 assert(numbers.every(q=>q.kind==='number'));assert.equal(numbers.filter(q=>q.value<10).length,4);
 assert.equal(new Set(numbers.map(q=>q.value)).size,8);assert(numbers.every(q=>q.value<10||q.value%11!==0));
 assert(questions.slice(8).every(q=>q.kind==='landolt'));assert.equal(new Set(questions.slice(8).map(q=>q.value)).size,4);
 for(const q of questions){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert(q.choices.includes(q.value));if(q.kind==='number')assert(q.choices.every(c=>(c<10)===(q.value<10)));}
}
console.log('PASS: 1000 sessions, counts, uniqueness, no repeated digits, four directions, choices and determinism');
