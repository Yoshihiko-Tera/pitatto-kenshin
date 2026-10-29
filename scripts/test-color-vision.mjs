import assert from 'node:assert/strict';
import {generatePlate} from '../public/color-vision/plate-renderer.js';
import {shapeMask} from '../public/color-vision/shape-mask.js';
const cases=[['number',5],['number',12],['number',29],['landolt','left'],['landolt','up'],['landolt','right']];
for(const [kind,value] of cases) for(const targetDensity of [.65,.70,.75]){
 const input={kind,value,seed:'20261028',targetDensity},a=generatePlate(input),b=generatePlate(input);
 assert.deepEqual(a.dots,b.dots);assert.notDeepEqual(a.dots,generatePlate({...input,seed:'other'}).dots);
 assert.ok(Math.abs(a.density-targetDensity)<.002,`density ${a.density}`);
 for(let i=0;i<a.dots.length;i++){const p=a.dots[i];assert.ok(Math.hypot(p.x,p.y)+p.r<=1);for(let j=0;j<i;j++){const q=a.dots[j];assert.ok(Math.hypot(p.x-q.x,p.y-q.y)>=p.r+q.r);}}
 console.log(kind,value,targetDensity,a.count,a.density.toFixed(4));
}
for(const [direction,x,y] of [['right',.5,0],['left',-.5,0],['up',0,-.5],['down',0,.5]]){const mask=shapeMask('landolt',direction);assert.equal(mask(x,y),false);assert.equal(mask(-x,-y),true);}
console.log('PASS: determinism, seed variation, density, containment, non-overlap, four gap directions');
