import {generateQuestions} from './question-generator.js?v1121-gentle5';
import {renderPlate} from './plate-renderer.js?v1121-gentle5';
export function createSession(onHome){
 const root=document.querySelector('#color-vision-screen'),intro=root.querySelector('[data-cv-intro]'),practice=root.querySelector('[data-cv-practice]'),end=root.querySelector('[data-cv-end]'),answers=root.querySelector('[data-cv-answers]'),prompt=root.querySelector('[data-cv-prompt]'),progress=root.querySelector('[data-cv-progress]'),canvas=root.querySelector('canvas'),error=root.querySelector('[data-cv-error]');
 let demo=false;
 const stepCopy=document.createElement('p');stepCopy.className='cv-step-copy';prompt.before(stepCopy);
 const demoHint=root.querySelector("[data-cv-demo-hint]"),demoNext=root.querySelector("[data-cv-demo-next]");
 let responses=[],questions=[],index=0,locked=false,active=false;
 const labels={up:'↑ うえ',down:'↓ した',left:'← ひだり',right:'→ みぎ'};
 function panel(visible){for(const element of [intro,practice,end])element.hidden=element!==visible;}
 function showIntro(){demo=false;demoHint.hidden=true;demoNext.hidden=true;active=false;responses=[];questions=[];index=0;answers.replaceChildren();error.hidden=true;panel(intro);root.querySelector('h1').focus();}
 function draw(){
  if(!active)return;
  if(index===questions.length){active=false;panel(end);root.querySelector('[data-cv-finish]').focus();return;}
  demo=true; panel(practice);locked=true;demoHint.hidden=true;demoNext.hidden=true;error.hidden=true;root.querySelector('[data-cv-error-retry]').hidden=true;answers.replaceChildren();const question=questions[index];
  const number=index+1, phase=index%3;
  progress.textContent=(question.kind==='number'?'すうじ':'むき')+'の れんしゅう '+(phase+1)+' / 3';
  stepCopy.textContent=question.kind==='number'?[
   'これから れんしゅうを します。\nまず、この えを みてください。',
   'つぎは、すこし ぼやっとした えです。\n1もん やってみましょう。',
   'ほんばんは、いろが ついた えが でます。\nいろつきを 1もん やってみましょう。'
  ][phase]:[
   'つぎは、わっかの むきを きかれます。\nあいている むきを えらびましょう。',
   'では、すこし ぼやっとした えです。\n1もん やってみましょう。',
   'ほんばんは、いろが ついた えが でます。\nいろつきを 1もん やってみましょう。'
  ][phase];
  prompt.textContent=question.kind==='number'?'なんの すうじが でていますか？':'わっかの あいている むきは どこですか？';
  try{renderPlate(canvas,{...question,diameter:600});
   for(const choice of [...question.choices,'unknown']){const button=document.createElement('button');button.type='button';button.className=choice==='unknown'?'secondary-button cv-unknown':'primary-button';button.textContent=choice==='unknown'?'わからない':question.kind==='number'?String(choice):labels[choice];button.addEventListener('click',()=>{if(locked||!active)return;locked=true;for(const b of answers.children)b.disabled=true;responses.push({question,choice,number});if(demo){
    const answerLabel=question.kind==='number'?String(question.value):labels[question.value].split(' ')[1];demoHint.textContent=question.kind==='number'?'これは「'+answerLabel+'」です。「'+answerLabel+'」を えらぶと こたえられるよ。':'わっかは「'+answerLabel+'」が あいているよ。「'+answerLabel+'」を えらぶと こたえられるよ。';
    demoHint.hidden=false;demoNext.textContent=index===5?'れんしゅうを おえる':index===2?'むきの れんしゅうへ':'つぎの れんしゅうへ';demoNext.hidden=false;demoNext.focus();return;
   }});answers.append(button);}
   locked=false;prompt.focus();
  }catch{root.querySelector('[data-cv-error-retry]').hidden=false;error.hidden=false;error.textContent='ずを つくれませんでした。「もういちど」で やりなおしてください。';}
 }
 function start(){
  responses=[];
  questions=generateQuestions(crypto.randomUUID());
  index=0;active=true;panel(practice);draw();
 }
 demoNext.addEventListener('click',()=>{if(!active||!demo)return;index++;draw();});
 root.querySelector('[data-cv-start]').addEventListener('click',start);root.querySelector('[data-cv-retry]').addEventListener('click',start);root.querySelector('[data-cv-error-retry]').addEventListener('click',start);
 for(const button of root.querySelectorAll('[data-cv-home]'))button.addEventListener('click',()=>{active=false;responses=[];questions=[];onHome();});
 return{showIntro};
}
