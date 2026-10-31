import {generateQuestions} from './question-generator.js';
import {renderPlate} from './plate-renderer.js';
export function createSession(onHome){
 const root=document.querySelector('#color-vision-screen'),intro=root.querySelector('[data-cv-intro]'),practice=root.querySelector('[data-cv-practice]'),end=root.querySelector('[data-cv-end]'),answers=root.querySelector('[data-cv-answers]'),prompt=root.querySelector('[data-cv-prompt]'),progress=root.querySelector('[data-cv-progress]'),canvas=root.querySelector('canvas'),error=root.querySelector('[data-cv-error]');
 let demo=false;
 const demoHint=root.querySelector("[data-cv-demo-hint]"),demoNext=root.querySelector("[data-cv-demo-next]");
 let responses=[],questions=[],index=0,locked=false,active=false;
 const labels={up:'↑ うえ',down:'↓ した',left:'← ひだり',right:'→ みぎ'};
 function panel(visible){for(const element of [intro,practice,end])element.hidden=element!==visible;}
 function showIntro(){demo=false;demoHint.hidden=true;demoNext.hidden=true;active=false;responses=[];root.querySelector("[data-cv-review]").replaceChildren();questions=[];index=0;answers.replaceChildren();error.hidden=true;panel(intro);root.querySelector('h1').focus();}
 function draw(){
  if(!active)return;
  if(index===questions.length){active=false;showReview();panel(end);root.querySelector('[data-cv-finish]').focus();return;}
  demo=Boolean(questions[index].demo);
  panel(practice);
  locked=true;demoHint.hidden=true;demoNext.hidden=true;error.hidden=true;root.querySelector('[data-cv-error-retry]').hidden=true;answers.replaceChildren();const question=questions[index];
  const number=questions.slice(0,index+1).filter(q=>!q.demo).length;
  progress.textContent=demo?(question.kind==='number'?'こんな すうじが でるよ。まずは こたえてみよう':'すうじは おしまい。つぎは むきを こたえるよ'):(number+' / 12 もん');
  prompt.textContent=demo?(question.kind==='number'?'すうじを こたえる れんしゅう':'むきを こたえる れんしゅう'):(question.kind==='number'?'みえる すうじは どれ？':'わっかの あいている ところは どこ？');
  try{renderPlate(canvas,{...question,diameter:600});
   for(const choice of [...question.choices,'unknown']){const button=document.createElement('button');button.type='button';button.className=choice==='unknown'?'secondary-button cv-unknown':'primary-button';button.textContent=choice==='unknown'?'わからない':question.kind==='number'?String(choice):labels[choice];button.addEventListener('click',()=>{if(locked||!active)return;locked=true;for(const b of answers.children)b.disabled=true;if(demo){
    demoHint.textContent=question.kind==='number'?'これは「5」です。「5」を えらぶと こたえられるよ。':'わっかは「みぎ」が あいているよ。「みぎ」を えらぶと こたえられるよ。';
    demoHint.hidden=false;demoNext.textContent=question.kind==='number'?'すうじの 8もんへ':'むきの 4もんへ';demoNext.hidden=false;demoNext.focus();return;
   }responses.push({question,choice,number});index++;draw();});answers.append(button);}
   locked=false;prompt.focus();
  }catch{root.querySelector('[data-cv-error-retry]').hidden=false;error.hidden=false;error.textContent='ずを つくれませんでした。「もういちど」で やりなおしてください。';}
 }
 function showReview(){
  const review=root.querySelector('[data-cv-review]');review.replaceChildren();
  const heading=document.createElement('h3');heading.textContent='先生と ふりかえろう';review.append(heading);
  const note=document.createElement('p');note.className='cv-note';note.textContent='「わからない」と答えた図柄と、答えが一致しなかった図柄です。見え方や色覚の判定を示すものではありません。';review.append(note);
  const items=responses.filter(({question,choice})=>choice==='unknown'||choice!==question.value);
  if(!items.length){const message=document.createElement('p');message.textContent='今回、ふりかえる図柄はありません。';review.append(message);return;}
  const list=document.createElement('div');list.className='cv-review-grid';review.append(list);
  for(const {question,choice,number} of items){
   const card=document.createElement('article'),title=document.createElement('h4'),image=document.createElement('canvas'),detail=document.createElement('p');
   title.textContent=number+'もんめ';image.setAttribute('aria-label',number+'もんめの図柄');
   try{renderPlate(image,{...question,diameter:360});}catch{image.setAttribute('aria-label','図柄を表示できませんでした');}
   detail.textContent=choice==='unknown'?'わからない と こたえました':'こたえ：'+(question.kind==='number'?String(choice):labels[choice])+'（図柄と一致しませんでした）';
   card.append(title,image,detail);list.append(card);
  }
 }
 function start(){
  responses=[];root.querySelector('[data-cv-review]').replaceChildren();
  const regular=generateQuestions(crypto.randomUUID());
  questions=[{demo:true,kind:'number',value:5,choices:[2,5,3,8],paletteId:'intro-clear',seed:'intro-number'},...regular.slice(0,8),{demo:true,kind:'landolt',value:'right',choices:['up','down','left','right'],paletteId:'intro-clear',seed:'intro-direction'},...regular.slice(8)];
  index=0;active=true;panel(practice);draw();
 }
 demoNext.addEventListener('click',()=>{if(!active||!demo)return;index++;draw();});
 root.querySelector('[data-cv-start]').addEventListener('click',start);root.querySelector('[data-cv-retry]').addEventListener('click',start);root.querySelector('[data-cv-error-retry]').addEventListener('click',start);
 for(const button of root.querySelectorAll('[data-cv-home]'))button.addEventListener('click',()=>{active=false;responses=[];questions=[];root.querySelector("[data-cv-review]").replaceChildren();onHome();});
 return{showIntro};
}
