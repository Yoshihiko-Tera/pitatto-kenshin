import {practicePaletteIds} from './palette-registry.js?v1121';
import {randomFromSeed} from './plate-renderer.js?v1121';
export function shuffle(items,random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function generateQuestions(seed){
 const random=randomFromSeed(seed),single=Array.from({length:9},(_,i)=>i+1),double=Array.from({length:90},(_,i)=>i+10).filter(n=>n%11!==0);
 const numbers=shuffle([...shuffle(single,random).slice(0,4),...shuffle(double,random).slice(0,4)],random);
 const questions=numbers.map(value=>({kind:'number',value,choices:shuffle([value,...shuffle(value<10?single.filter(n=>n!==value):double.filter(n=>n!==value),random).slice(0,3)],random)}));
 for(const value of shuffle(['up','down','left','right'],random))questions.push({kind:'landolt',value,choices:['up','down','left','right']});
 const palettes=shuffle(practicePaletteIds,random);
 return questions.map((question,i)=>({...question,paletteId:palettes[i%palettes.length],seed:`${seed}:${i}`}));
}
