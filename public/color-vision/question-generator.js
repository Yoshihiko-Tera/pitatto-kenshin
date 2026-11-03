import {randomFromSeed} from './plate-renderer.js?v1121-gentle5';
export function generateQuestions(seed){
 const random=randomFromSeed(seed),shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const numbers=[5,...shuffle([1,2,3,4,6,7,8,9]).slice(0,2)],directions=['right',...shuffle(['up','down','left']).slice(0,2)];
 return ['number','landolt'].flatMap(kind=>['clear','soft','color'].map((stage,i)=>{const value=(kind==='number'?numbers:directions)[i];return {kind,stage,value,choices:kind==='number'?shuffle([value,...shuffle([1,2,3,4,5,6,7,8,9].filter(n=>n!==value)).slice(0,3)]):['up','down','left','right'],paletteId:stage==='color'?(kind==='number'?'orange-green':'green-purple'):stage==='soft'?'intro-mid':'intro-clear',seed:seed+':'+kind+':'+i,presentation:'dots',soften:false};}));
}
