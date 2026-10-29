import{paletteRegistry}from'./palette-registry.js';import{shapeMask}from'./shape-mask.js';
export function randomFromSeed(seed){let state=2166136261;for(const c of String(seed))state=Math.imul(state^c.charCodeAt(0),16777619);return()=>{state=(state+0x6D2B79F5)|0;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
export function generatePlate({kind,value,seed,paletteId='provisional',targetDensity=.70}){
 const start=performance.now(),random=randomFromSeed(seed),mask=shapeMask(kind,value),palette=paletteRegistry[paletteId];if(!palette||![.65,.70,.75].includes(targetDensity))throw Error('Invalid palette or density');
 const dots=[],cells=new Map(),cellSize=.12;let area=0;
 for(const[min,max,attempts]of[[.042,.066,14000],[.025,.042,24000],[.013,.025,60000],[.007,.013,120000],[.004,.007,200000]])for(let attempt=0;attempt<attempts&&area<targetDensity;attempt++){
 const r=min+random()*(max-min),x=random()*2-1,y=random()*2-1;if(Math.hypot(x,y)+r>1||area+r*r>targetDensity+.0001)continue;
 const cx=Math.floor(x/cellSize),cy=Math.floor(y/cellSize);let collision=false;
 for(let ix=cx-2;ix<=cx+2&&!collision;ix++)for(let iy=cy-2;iy<=cy+2&&!collision;iy++)for(const other of cells.get(`${ix},${iy}`)||[])if(Math.hypot(x-other.x,y-other.y)<r+other.r+.0005){collision=true;break;}
 if(collision)continue;const colors=mask(x,y,r)?palette.foreground:palette.background,dot={x,y,r,color:colors[Math.floor(random()*colors.length)]};dots.push(dot);area+=r*r;const key=`${cx},${cy}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(dot);
 }return{dots,density:area,count:dots.length,elapsed:performance.now()-start,seed,kind,value};
}
export function renderPlate(canvas,input){const diameter=input.diameter??480;if(!Number.isFinite(diameter)||diameter<1||diameter>4096)throw Error('Invalid diameter');const plate=generatePlate(input);canvas.width=diameter;canvas.height=diameter;const ctx=canvas.getContext('2d');ctx.fillStyle='#fffdf6';ctx.fillRect(0,0,diameter,diameter);const scale=diameter*.48;for(const d of plate.dots){ctx.beginPath();ctx.arc(diameter/2+d.x*scale,diameter/2+d.y*scale,d.r*scale,0,Math.PI*2);ctx.fillStyle=d.color;ctx.fill();}return plate;}


