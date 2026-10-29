const segments={0:'abcdef',1:'bc',2:'abdeg',3:'abcdg',4:'bcfg',5:'acdfg',6:'acdefg',7:'abc',8:'abcdefg',9:'abcdfg'};
const lines={a:[0,0,1,0],b:[1,0,1,1],c:[1,1,1,2],d:[0,2,1,2],e:[0,1,0,2],f:[0,0,0,1],g:[0,1,1,1]};
function distance(x,y,[ax,ay,bx,by]){const t=Math.max(0,Math.min(1,((x-ax)*(bx-ax)+(y-ay)*(by-ay))/((bx-ax)**2+(by-ay)**2)));return Math.hypot(x-ax-t*(bx-ax),y-ay-t*(by-ay));}
export function shapeMask(kind,value){
 if(kind==='landolt'){const angle={right:0,down:Math.PI/2,left:Math.PI,up:-Math.PI/2}[value];if(angle===undefined)throw Error('Invalid direction');return(x,y,r=0)=>{const radial=Math.hypot(x,y),along=x*Math.cos(angle)+y*Math.sin(angle),across=-x*Math.sin(angle)+y*Math.cos(angle);return radial>=.37&&radial<=.69&&!(along>0&&Math.abs(across)<.18+r);};}
 if(kind!=='number'||!Number.isInteger(value)||value<1||value>99)throw Error('Invalid number');
 const digits=String(value).split(''),width=digits.length===1?.53:.42,gap=.17,total=digits.length*width+(digits.length-1)*gap;
 return(x,y)=>digits.some((digit,i)=>{const dx=(x+total/2-i*(width+gap))/width,dy=(y+.60)/.60;return [...segments[digit]].some(s=>distance(dx,dy,lines[s])<.19);});
}
