const STORAGE_KEY = 'myGymRoutineProgress.v1';

const iconSvg = (type) => {
  const common = `viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg"`;
  const person = `stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`;
  const floor = `<path d="M18 132H162" ${person} opacity=".25"/>`;
  const head = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="10" fill="currentColor" opacity=".88"/>`;
  const map = {
    warmup: `<svg ${common}>${floor}<path d="M50 95c25-34 55-34 80 0" ${person}/><path d="M55 58c18 14 52 14 70 0" ${person}/><circle cx="90" cy="45" r="12" fill="currentColor"/><path d="M42 30l18 12M138 30l-18 12" ${person} opacity=".55"/></svg>`,
    bench: `<svg ${common}>${floor}<path d="M45 100h80M55 100v25M115 100v25" ${person}/><path d="M55 78h70" ${person}/>${head(78,78)}<path d="M82 85h34" ${person}/><path d="M38 58h104M38 48v20M142 48v20" ${person}/><path d="M60 58v-14M120 58v-14" ${person} opacity=".65"/></svg>`,
    row: `<svg ${common}>${floor}<path d="M48 113c20-18 52-30 86-20" ${person}/>${head(78,64)}<path d="M80 75l28 28M108 103l38-20" ${person}/><path d="M144 76l12 14M154 74l-8 18" ${person}/><path d="M66 92l-20 25" ${person}/></svg>`,
    pulldown: `<svg ${common}>${floor}<path d="M42 32h96M50 32v16M130 32v16" ${person}/>${head(90,58)}<path d="M90 70v38" ${person}/><path d="M90 78L60 44M90 78l30-34" ${person}/><path d="M75 108l-20 24M105 108l20 24" ${person}/></svg>`,
    lateral: `<svg ${common}>${floor}${head(90,44)}<path d="M90 56v45" ${person}/><path d="M90 72L45 58M90 72l45-14" ${person}/><path d="M35 54h16M129 54h16" ${person}/><path d="M78 101l-20 28M102 101l20 28" ${person}/></svg>`,
    facepull: `<svg ${common}>${floor}<path d="M34 54h60" ${person}/><path d="M34 44v20" ${person}/>${head(116,54)}<path d="M112 66v40" ${person}/><path d="M112 76L82 54M112 76l-31 10" ${person}/><path d="M100 106l-18 25M124 106l20 25" ${person}/></svg>`,
    curl: `<svg ${common}>${floor}${head(90,38)}<path d="M90 50v50" ${person}/><path d="M72 62l-22 30M108 62l22 30" ${person}/><path d="M45 88l14 8M135 88l-14 8" ${person}/><path d="M78 100l-18 30M102 100l18 30" ${person}/></svg>`,
    triceps: `<svg ${common}>${floor}<path d="M90 24v42" ${person} opacity=".6"/><path d="M66 66h48" ${person}/>${head(90,62)}<path d="M90 74v38" ${person}/><path d="M75 82l-20 30M105 82l20 30" ${person}/><path d="M62 112h56" ${person}/><path d="M78 112l-18 18M102 112l18 18" ${person}/></svg>`,
    squat: `<svg ${common}>${floor}<path d="M48 42h84" ${person}/><path d="M55 42v18M125 42v18" ${person}/>${head(90,58)}<path d="M90 70l-6 34" ${person}/><path d="M84 102l-34 16M96 102l34 16" ${person}/><path d="M66 82l-20 20M114 82l20 20" ${person}/></svg>`,
    deadlift: `<svg ${common}>${floor}<path d="M45 125h90" ${person}/><path d="M45 115v20M135 115v20" ${person}/>${head(74,52)}<path d="M76 64l34 38" ${person}/><path d="M105 100l-55 18M110 102l25 20" ${person}/><path d="M92 84l-35 20" ${person}/></svg>`,
    extension: `<svg ${common}>${floor}<path d="M52 76h48M52 76v42M100 76v32" ${person}/>${head(78,50)}<path d="M76 62l20 38" ${person}/><path d="M96 100h48" ${person}/><path d="M142 92v16" ${person}/></svg>`,
    curlleg: `<svg ${common}>${floor}<path d="M36 85h82" ${person}/>${head(58,73)}<path d="M66 84h50" ${person}/><path d="M112 86l30 22M142 108l-18 20" ${person}/><path d="M40 95v28M105 95v28" ${person} opacity=".55"/></svg>`,
    calf: `<svg ${common}>${floor}${head(90,38)}<path d="M90 50v58" ${person}/><path d="M72 65l-20 28M108 65l20 28" ${person}/><path d="M82 108l-8 24M98 108l8 24" ${person}/><path d="M66 132h22M92 132h22" ${person}/><path d="M72 122c10-14 26-14 36 0" ${person} opacity=".45"/></svg>`,
    crunch: `<svg ${common}>${floor}<path d="M45 105h86" ${person}/>${head(66,82)}<path d="M74 91c22 2 42 14 52 35" ${person}/><path d="M55 98l-22 15M93 108l-20 22" ${person}/><path d="M120 70v46M108 70h24" ${person} opacity=".55"/></svg>`,
    plank: `<svg ${common}>${floor}${head(42,84)}<path d="M54 86h72" ${person}/><path d="M54 90l-16 28M126 86l24 28" ${person}/><path d="M65 118h82" ${person}/></svg>`,
    shoulder: `<svg ${common}>${floor}${head(90,50)}<path d="M90 62v48" ${person}/><path d="M70 78l-22-30M110 78l22-30" ${person}/><path d="M43 42h20M117 42h20" ${person}/><path d="M78 110l-20 22M102 110l20 22" ${person}/></svg>`,
    hipthrust: `<svg ${common}>${floor}<path d="M48 98h76" ${person}/><path d="M55 98v28M120 98v28" ${person} opacity=".45"/>${head(60,88)}<path d="M72 94c28-20 52-18 72 8" ${person}/><path d="M116 101l20 28M80 102l-22 28" ${person}/><path d="M82 86h50" ${person} opacity=".65"/></svg>`,
    reversecrunch: `<svg ${common}>${floor}${head(52,98)}<path d="M62 104h50" ${person}/><path d="M106 104l28-34M134 70l18 4" ${person}/><path d="M74 115l-20 16M102 115l-12 16" ${person}/><path d="M118 72c-5 20-20 32-42 34" ${person} opacity=".45"/></svg>`,
    pallof: `<svg ${common}>${floor}<path d="M24 72h58" ${person}/><path d="M24 62v20" ${person}/>${head(112,52)}<path d="M112 64v48" ${person}/><path d="M112 78H74M112 78h28" ${person}/><path d="M98 112l-18 20M126 112l20 20" ${person}/></svg>`
  };
  return map[type] || map.warmup;
};

const workouts = [
  {id:'upper-a', day:'Monday', title:'Upper A', subtitle:'Chest + back + shoulders + arms', time:'50–60 min', accent:'#1f6feb', icon:'💪', focus:'Push/pull supersets and shoulder width', exercises:[
    ['warmup','Warm-up','Shoulder mobility + light sets','5–7 min','—','Do not spend energy here. Prepare shoulders, elbows and pressing pattern.'],
    ['bench','Bench press','4 sets','6–10 reps','90 s','Control the descent, keep shoulder blades stable, press strongly.'],
    ['row','Low row / machine / dumbbell row','4 sets','8–12 reps','90 s','Pull elbows back, squeeze the back, avoid shrugging.'],
    ['pulldown','Pull-ups or lat pulldown','4 sets','6–12 reps','75–90 s','Drive elbows down, full stretch at the top, last set close to failure.'],
    ['lateral','Lateral raise','4 sets','12–20 reps','45–60 s','Think elbows out, not hands up. Keep traps relaxed.'],
    ['facepull','Face pull / reverse fly','3 sets','15–20 reps','45–60 s','Rear delts and posture. Use light load and clean form.'],
    ['curl','Dumbbell curls','3 sets','10–15 reps','45–60 s','Controlled eccentric; avoid swinging.'],
    ['triceps','Cable triceps pushdown','3 sets','10–15 reps','45–60 s','Lock elbows at your sides and fully extend.']
  ], supersets:'Bench + row | lateral raise + face pull | biceps + triceps'},
  {id:'lower-a', day:'Tuesday', title:'Lower A', subtitle:'Legs + core', time:'50–60 min', accent:'#16833a', icon:'🦵', focus:'Squat pattern, posterior chain and core', exercises:[
    ['warmup','Warm-up','Easy bike + hip/ankle mobility','5–7 min','—','Raise temperature without fatigue.'],
    ['squat','Barbell squat or leg press','4 sets','6–10 reps','90–120 s','Technique first. Stable feet and controlled depth.'],
    ['deadlift','Stiff-leg / Romanian deadlift','4 sets','8–10 reps','90 s','Hips back, neutral spine, feel hamstrings and glutes.'],
    ['extension','Leg extension','3 sets','12–15 reps','45–60 s','Short pause at the top. Control the return.'],
    ['curlleg','Leg curl','3 sets','10–15 reps','45–60 s','Do not rush; squeeze hamstrings.'],
    ['calf','Standing or seated calf raise','4 sets','12–20 reps','45–60 s','Full stretch and full contraction.'],
    ['crunch','Cable crunch','3 sets','10–15 reps','30–45 s','Crunch through the ribs; do not pull with arms.'],
    ['plank','Plank + side plank','3 sets','30–60 s','30 s','Brace hard; keep hips level.']
  ], supersets:'Extension + curl | core circuit'},
  {id:'upper-b', day:'Thursday', title:'Upper B', subtitle:'Incline chest + back + shoulders', time:'50–60 min', accent:'#f26b21', icon:'🔥', focus:'Upper chest, shoulders and back thickness', exercises:[
    ['warmup','Warm-up','Shoulder mobility + light sets','5–7 min','—','Prepare shoulders and elbows.'],
    ['bench','Incline bench press','4 sets','6–10 reps','90 s','Slight arch, chest high, controlled descent.'],
    ['row','One-arm row or machine row','4 sets','8–12 reps','90 s','Reach forward, then pull elbow toward the hip.'],
    ['pulldown','Wide-grip pulldown or assisted pull-up','4 sets','8–12 reps','75–90 s','Keep ribs down and pull with lats.'],
    ['shoulder','Shoulder press / overhead press','3 sets','6–10 reps','75–90 s','Do not overarch the lower back.'],
    ['lateral','Lateral raise','4 sets','12–20 reps','45–60 s','Final set can go close to technical failure.'],
    ['curl','Incline curl / cable curl','3 sets','10–15 reps','45–60 s','Stretch the biceps and keep shoulders back.'],
    ['triceps','Rope triceps pushdown','3 sets','10–15 reps','45–60 s','Split the rope at the bottom.']
  ], supersets:'Priority: shoulders and back'},
  {id:'lower-b', day:'Friday', title:'Lower B', subtitle:'Legs + core', time:'50–60 min', accent:'#6f42c1', icon:'⚡', focus:'Controlled leg volume and core stability', exercises:[
    ['warmup','Warm-up','Easy bike + mobility','5–7 min','—','Move hips, knees and ankles before loading.'],
    ['squat','Leg press or squat','4 sets','8–12 reps','90 s','Smooth reps, no ego load.'],
    ['hipthrust','Stiff-leg deadlift or hip thrust','3 sets','8–12 reps','75–90 s','Choose the version that feels best on your back.'],
    ['extension','Leg extension','3 sets','12–15 reps','45–60 s','Controlled tempo.'],
    ['curlleg','Leg curl','3 sets','12–15 reps','45–60 s','Keep hips fixed.'],
    ['calf','Calf raises','4 sets','12–20 reps','45–60 s','Pause at top and bottom.'],
    ['reversecrunch','Reverse crunch or leg raises','3 sets','10–15 reps','30–45 s','Move pelvis, not just legs.'],
    ['pallof','Pallof press / side plank','3 sets','10–15 reps or 30–45 s','30 s','Anti-rotation core: stay tall and braced.']
  ], supersets:'Technique + controlled volume'}
];

const week = [
  ['Monday','Upper A','Strength','Progressive overload','blue'],
  ['Tuesday','Lower A + Core','Strength','Technique and posterior chain','green'],
  ['Wednesday','Cardio','40–50 min','Light/moderate run, skate or mobility','gray'],
  ['Thursday','Upper B','Strength','Shoulders and back','orange'],
  ['Friday','Lower B + Core','Strength','Controlled leg volume','purple'],
  ['Saturday','Cardio','40–60 min','Fun cardio or running','gray'],
  ['Sunday','Recovery','Optional 20–40 min','Walk, sleep and meal prep','gray']
];

const meals = [
  ['🥤','Post-workout','30 g whey + 1 banana','If the workout is light, whey with water is enough.'],
  ['🥣','12:00 — Breakfast / Brunch','Overnight oats with chia + 30 g whey + berries + almond milk','Add 10 g peanut powder or peanut butter.'],
  ['🍚','15:00 — Lunch','Quinoa or rice + chicken/tuna + leafy greens + carrot','Add one drizzle of olive oil. Rotate with eggs, salmon or legumes.'],
  ['🍌','17:30 — Snack','Greek/protein yogurt + banana','Alternative: shake with whey + fruit.'],
  ['🥗','21:00 — Dinner','Large salad + 3 eggs or chicken/tuna + vegetables','Replace avocado with extra virgin olive oil, hummus or olives.']
];

const targets = [['💪','Protein','170–190 g/day'],['👣','Steps','8,000–12,000/day'],['🌙','Sleep','7–8 h/night'],['⚖️','Weight loss','0.4–0.7 kg/week'],['💧','Water + fiber','2–3 L/day + vegetables and fruit']];
const rules = [['🥩','Have protein in every meal'],['🚫','Do not follow an extreme diet'],['🍚','More carbs around training if energy is low'],['🍱','Meal prep'],['🎯','Consistency > perfection']];

const DATA_KEY = 'myGymRoutineJournal.v2';
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const uid = () => crypto.randomUUID();
const number = n => new Intl.NumberFormat('es-ES',{maximumFractionDigits:1}).format(n);
const displayDate = d => new Date(d+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'});
const dayNames={Monday:'Lunes',Tuesday:'Martes',Wednesday:'Miércoles',Thursday:'Jueves',Friday:'Viernes',Saturday:'Sábado',Sunday:'Domingo'};
let data={version:2,sessions:[],legacyProgress:{}};
let storageBlocked=false, storageChanged=false, activeId=null, toastTimer;
try {
  const raw=localStorage.getItem(DATA_KEY);
  if(raw) data=Gym.validateData(JSON.parse(raw));
  else { try { const old=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); if(old && typeof old==='object' && !Array.isArray(old)) data.legacyProgress=old; } catch {} }
} catch { storageBlocked=true; }
function notify(message){ $('toast').textContent=message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),5000); }
function persist(){
  if(storageChanged){ notify('Otra pestaña ha actualizado el historial. Exporta tus cambios y recarga antes de seguir para evitar sobrescribirlos.'); return false; }
  if(storageBlocked){ notify('No puedo guardar: los datos existentes no se han podido leer. Descarga una copia desde Mis datos antes de continuar.'); return false; }
  try{ localStorage.setItem(DATA_KEY,JSON.stringify(data)); return true; }
  catch{ notify('No se ha podido guardar en el navegador. Exporta una copia JSON de tus datos antes de cerrar.'); return false; }
}
const saved = () => data.sessions.filter(s=>s.status==='saved');
const current = () => data.sessions.find(s=>s.id===activeId);
const wById = id => workouts.find(w=>w.id===id);
const totalSets = s => s.exercises.reduce((n,e)=>n+e.sets.length,0);
function startSession(workoutId){
  if(storageBlocked){location.hash='backup';notify('Revisa el almacenamiento antes de empezar.');return;}
  const existing=data.sessions.find(s=>s.status==='draft'&&s.workoutId===workoutId&&!s.editOf);
  if(existing){location.hash=`session/${existing.id}`;return;}
  const w=wById(workoutId), previous=saved().filter(s=>s.workoutId===workoutId).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt-a.updatedAt)[0];
  const session={id:uid(),workoutId,date:today(),status:'draft',notes:'',startedAt:Date.now(),updatedAt:Date.now(),duration:0,exercises:w.exercises.slice(1).map((e,i)=>{
    const old=previous?.exercises[i], reps=parseInt(e[3])||10;
    return {key:`${workoutId}:${i+1}`,name:old?.name||e[1],unit:old?.unit||(e[0]==='plank'?'seconds':'reps'),warmup:false,sets:old?old.sets.map(t=>({...t,done:false})):Array.from({length:parseInt(e[2])||3},()=>({weight:0,reps,done:false}))};
  })};
  data.sessions.push(session);persist();location.hash=`session/${session.id}`;
}
function renderWeek(){
  $('weekGrid').innerHTML=week.map(([day,type,duration,focus,color])=>{const w=workouts.find(w=>w.day===day);return `<article class="day-card ${w?'strength':''}"><div class="card-top"><span class="tag ${color}">${w?'FUERZA':day==='Sunday'?'DESCANSO':'CARDIO'}</span><small>${dayNames[day]}</small></div><h3>${type}</h3><p>${w?w.subtitle:day==='Sunday'?'Paseo, descanso y preparación de comidas':'Carrera suave, skate o movilidad'}</p>${w?`<button class="text-link" data-start="${w.id}">Empezar sesión ↗</button>`:`<span class="muted">${duration}</span>`}</article>`;}).join('');
}
function renderWorkoutGrid(){
  $('workoutGrid').innerHTML=workouts.map((w,i)=>{
    const last=saved().filter(s=>s.workoutId===w.id).sort((a,b)=>b.date.localeCompare(a.date))[0],draft=data.sessions.find(s=>s.status==='draft'&&s.workoutId===w.id&&!s.editOf);
    return `<article class="workout-card" style="--accent:${w.accent}"><div><div class="card-top"><span class="workout-index">0${i+1}</span><span class="tag">${dayNames[w.day]}</span></div><h3>${w.title}</h3><p>${w.subtitle}</p><div class="session-meta"><span class="pill">${w.time}</span><span class="pill">7 ejercicios + calentamiento</span></div><p class="muted">${last?`Última sesión: ${displayDate(last.date)}`:'Mi primera sesión está por llegar.'}</p></div><button class="open-button" data-start="${w.id}">${draft?'Continuar borrador':'Empezar sesión'} →</button></article>`;
  }).join('');
}
function renderSession(id){
  activeId=id;const s=current();
  if(!s){$('sessionContainer').innerHTML='<div class="empty-state"><h3>Esta sesión no está disponible.</h3><a href="#workouts">Volver a mi rutina →</a></div>';return;}
  const w=wById(s.workoutId),count=Gym.completed(s).length;
  $('sessionContainer').innerHTML=`<section class="session-head"><div><p class="eyebrow">${s.editOf?'EDITANDO MI ENTRENAMIENTO':'MI SESIÓN · BORRADOR AUTOMÁTICO'}</p><h2>${w.title}</h2><p class="muted">${w.subtitle} · ${w.supersets}</p></div><span class="session-counter" id="sessionCounter">${count} / ${totalSets(s)} series</span></section>
  <div class="session-controls diet-card"><label>Fecha<input type="date" id="sessionDate" value="${s.date}" required></label><label>Duración (min, opcional)<input type="number" id="sessionDuration" min="0" max="1440" step="1" value="${s.duration?Math.round(s.duration/60):''}" placeholder="—"></label><span class="muted">Los campos se guardan al cambiarlos. Solo las series marcadas como realizadas entran en las estadísticas.</span></div>
  <details class="warmup diet-card"><summary>Calentamiento · ${w.exercises[0][3]}</summary><p>${w.exercises[0][2]}</p><p>${w.exercises[0][5]}</p></details>
  <div class="exercise-list">${s.exercises.map((e,i)=>exerciseCard(s,w,e,i)).join('')}</div>
  <div class="diet-card session-notes"><label for="sessionNotes">Notas de mi entrenamiento</label><textarea id="sessionNotes" maxlength="5000" placeholder="Cómo me sentí, técnica, molestias…">${esc(s.notes)}</textarea></div>
  <div class="session-actions"><span id="saveHint">Borrador guardado en este navegador</span><div class="button-row"><button class="secondary-light" data-discard="${s.id}">${s.editOf?'Cancelar edición':'Descartar borrador'}</button><button class="open-button" id="finishSession">${s.editOf?'Guardar cambios':'Guardar entrenamiento'} ✓</button></div></div>`;
}
function exerciseCard(s,w,e,i){
  const original=w.exercises[i+1],previous=saved().filter(x=>x.id!==s.editOf&&x.workoutId===s.workoutId&&x.date<=s.date).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt-a.updatedAt).map(x=>({session:x,ex:x.exercises.find(t=>t.key===e.key&&t.name===e.name&&t.unit===e.unit)})).find(x=>x.ex?.sets.some(t=>t.done));
  return `<article class="exercise-card" style="--accent:${w.accent}"><div class="exercise-art" aria-label="Ilustración orientativa de ${esc(original[1])}">${iconSvg(original[0])}</div><div class="exercise-body"><div class="exercise-title-row"><div><span class="eyebrow">EJERCICIO ${String(i+1).padStart(2,'0')}</span><h3>${esc(original[1])}</h3></div></div><div class="prescription"><span class="pill">${original[2]} · ${original[3]}</span><span class="pill">Descanso ${original[4]}</span></div><details class="coaching"><summary>Ver indicaciones de mi rutina</summary><p>${original[5]}</p></details>
  <div class="exercise-settings"><label>Ejercicio / variante que hago<input data-ex="${i}" data-field="name" value="${esc(e.name)}" maxlength="150" required></label><label>Registro<select data-ex="${i}" data-field="unit"><option value="reps" ${e.unit==='reps'?'selected':''}>Repeticiones</option><option value="seconds" ${e.unit==='seconds'?'selected':''}>Segundos</option></select></label></div>
  <p class="previous">${previous?`Última vez · ${displayDate(previous.session.date)}: ${previous.ex.sets.filter(t=>t.done).map(t=>`${number(t.weight)} kg × ${t.reps}${e.unit==='seconds'?' s':''}`).join(' / ')}`:'Todavía no tengo un registro anterior para esta variante.'}</p>
  <div class="set-header"><span>Serie</span><span>Kg</span><span>${e.unit==='seconds'?'Segundos':'Reps'}</span><span>Hecha</span><span></span></div><div class="set-list">${e.sets.map((t,j)=>setRow(t,i,j,e)).join('')}</div>
  <button class="add-set" data-add="${i}">＋ Añadir serie</button><small class="muted">0 kg = sin carga externa. En mancuernas, uso siempre el mismo criterio (por mano o total). Las series en segundos no suman volumen.</small></div></article>`;
}
function setRow(t,i,j,e){return `<div class="set-row ${t.done?'completed':''}"><span class="set-number">${j+1}</span><input aria-label="Peso en kg, ejercicio ${i+1}, serie ${j+1}" type="number" min="0" max="2000" step="any" required value="${t.weight}" data-ex="${i}" data-set="${j}" data-field="weight"><input aria-label="${e.unit==='seconds'?'Segundos':'Repeticiones'}, ejercicio ${i+1}, serie ${j+1}" type="number" min="1" max="10000" step="1" required value="${t.reps}" data-ex="${i}" data-set="${j}" data-field="reps"><label class="set-check"><input aria-label="Serie ${j+1} realizada, ejercicio ${i+1}" type="checkbox" data-ex="${i}" data-set="${j}" data-field="done" ${t.done?'checked':''}><span aria-hidden="true">✓</span></label><button class="remove-set" aria-label="Eliminar serie ${j+1} del ejercicio ${i+1}" data-remove="${i}:${j}" ${e.sets.length===1?'disabled':''}>×</button></div>`;}
function updateSessionCount(){const s=current();if(!s)return;$('sessionCounter').textContent=`${Gym.completed(s).length} / ${totalSets(s)} series`;updateWeeklySummary();}
function editSession(id){
  const original=data.sessions.find(s=>s.id===id);if(!original)return;
  let draft=data.sessions.find(s=>s.editOf===id);
  if(!draft){draft={...structuredClone(original),id:uid(),status:'draft',editOf:id,updatedAt:Date.now()};data.sessions.push(draft);persist();}
  location.hash=`session/${draft.id}`;
}
function finishSession(){
  const s=current();if(!s)return;
  const invalid=$('sessionContainer').querySelector(':invalid');if(invalid){invalid.reportValidity();return;}
  if(!Gym.completed(s).length){notify('Marca al menos una serie como realizada para guardar la sesión.');return;}
  if(!Gym.validateSession(s)){notify('Revisa los datos de las series antes de guardar.');return;}
  const backup=structuredClone(data);
  if(s.editOf){const target=s.editOf;data.sessions=data.sessions.filter(x=>x.id!==target);s.id=target;delete s.editOf;}
  s.status='saved';s.updatedAt=Date.now();
  if(!persist()){data=backup;return;}
  activeId=null;location.hash='history';notify('Entrenamiento guardado. ¡Una sesión más!');
}
function renderHistory(){
  const filter=$('historyFilter')?.value||'all';
  const sessions=saved().filter(s=>filter==='all'||s.workoutId===filter).sort((a,b)=>b.date.localeCompare(a.date)||b.updatedAt-a.updatedAt);
  $('historyContainer').innerHTML=`<div class="filter-bar"><label>Rutina<select id="historyFilter"><option value="all">Todas mis rutinas</option>${workouts.map(w=>`<option value="${w.id}" ${filter===w.id?'selected':''}>${w.title}</option>`).join('')}</select></label><span class="muted">${sessions.length} sesiones guardadas</span></div>${data.sessions.some(s=>s.status==='draft')?`<div class="draft-list">${data.sessions.filter(s=>s.status==='draft').map(s=>`<a href="#session/${s.id}" class="resume-banner">${s.editOf?'Edición pendiente':'Sesión pendiente'} · ${wById(s.workoutId).title} · ${displayDate(s.date)} <strong>Continuar →</strong></a>`).join('')}</div>`:''}${sessions.length?sessions.map(s=>`<article class="history-card diet-card"><div class="history-top"><div><p class="eyebrow">${displayDate(s.date)}</p><h3>${wById(s.workoutId).title}</h3></div><span class="pill">${Gym.completed(s).length} series${s.duration?' · '+Math.round(s.duration/60)+' min':''}</span></div><p class="muted">${number(Gym.volume(s))} kg · rep de volumen</p><details><summary>Ver series y notas</summary>${s.exercises.filter(e=>e.sets.some(t=>t.done)).map(e=>`<p><strong>${esc(e.name)}</strong><br>${e.sets.filter(t=>t.done).map(t=>`${number(t.weight)} kg × ${t.reps}${e.unit==='seconds'?' s':' reps'}`).join(' · ')}</p>`).join('')}${s.notes?`<p class="notes">${esc(s.notes)}</p>`:''}</details><div class="button-row"><button class="secondary-light" data-edit="${s.id}">Editar sesión</button><button class="delete-button" data-delete="${s.id}">Eliminar</button></div></article>`).join(''):'<div class="empty-state"><span>↗</span><h3>Mi historial empieza con una sesión.</h3><p>Registro mis series y pulso «Guardar entrenamiento» para verlas aquí.</p><a class="open-button" href="#workouts">Ir a mi rutina</a></div>'}`;
}
let statsKey='',statsVariant='',statsPeriod='all';
function filteredStats(){const cutoff=new Date();cutoff.setDate(cutoff.getDate()-Number(statsPeriod));const limit=statsPeriod==='all'?'0000-00-00':`${cutoff.getFullYear()}-${String(cutoff.getMonth()+1).padStart(2,'0')}-${String(cutoff.getDate()).padStart(2,'0')}`;return saved().filter(s=>s.date>=limit&&s.date<=today());}
function renderStats(){
  const sessions=filteredStats(), sets=sessions.flatMap(Gym.completed),volume=sessions.reduce((n,s)=>n+Gym.volume(s),0);
  const keys=workouts.flatMap(w=>w.exercises.slice(1).map((e,i)=>({key:`${w.id}:${i+1}`,name:`${w.title} · ${e[1]}`})));
  if(!statsKey)statsKey=keys[0].key;
  const variants=[...new Map(sessions.flatMap(s=>s.exercises.filter(e=>e.key===statsKey&&e.sets.some(t=>t.done))).map(e=>[JSON.stringify([e.name,e.unit]),{name:e.name,unit:e.unit}])).entries()];
  if(!variants.some(([key])=>key===statsVariant))statsVariant=variants[0]?.[0]||'';
  const variant=variants.find(([key])=>key===statsVariant)?.[1];
  const usage=variant?Gym.weightUsage(sessions,statsKey,variant.name,variant.unit):[];
  const points=variant?sessions.map(s=>{const values=s.exercises.filter(e=>e.key===statsKey&&e.name===variant.name&&e.unit===variant.unit).flatMap(e=>e.sets.filter(t=>t.done));return values.length?{date:s.date,value:Math.max(...values.map(t=>t.weight))}:null;}).filter(Boolean).sort((a,b)=>a.date.localeCompare(b.date)):[];
  const weekMap=new Map();sessions.forEach(s=>{const k=weekStart(s.date);const row=weekMap.get(k)||{sessions:0,volume:0};row.sessions++;row.volume+=Gym.volume(s);weekMap.set(k,row);});
  $('statsContainer').innerHTML=`<div class="filter-bar"><label>Periodo<select id="statsPeriod"><option value="all">Todo mi historial</option><option value="30" ${statsPeriod==='30'?'selected':''}>Últimos 30 días</option><option value="90" ${statsPeriod==='90'?'selected':''}>Últimos 90 días</option></select></label></div>
  <div class="stat-grid">${[[sessions.length,'Entrenamientos'],[sets.length,'Series realizadas'],[number(volume),'Kg · rep de volumen'],[new Set(sessions.map(s=>s.date)).size,'Días de entrenamiento']].map(([n,l])=>`<div class="stat-card"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>
  <div class="diet-card stats-detail"><div class="section-heading"><p class="eyebrow">CADA EJERCICIO TIENE SU HISTORIA</p><h3>Mi evolución por ejercicio</h3></div><div class="stats-filters"><label>Ejercicio<select id="statsExercise">${keys.map(k=>`<option value="${k.key}" ${k.key===statsKey?'selected':''}>${esc(k.name)}</option>`).join('')}</select></label>${variants.length?`<label>Variante y unidad<select id="statsVariant">${variants.map(([key,v])=>`<option value="${esc(key)}" ${key===statsVariant?'selected':''}>${esc(v.name)} · ${v.unit==='seconds'?'segundos':'repeticiones'}</option>`).join('')}</select></label>`:''}</div>
  ${points.length?`<div class="chart-heading"><div><p class="muted">Mi mayor carga registrada</p><strong>${number(Math.max(...points.map(p=>p.value)))} <small>kg</small></strong></div><span class="pill">${points.length} sesiones</span></div>${lineChart(points)}<p class="muted">Máximo peso realizado en cada sesión. Comparo la misma variante y unidad; el gráfico no estima mi fuerza máxima.</p><h3>¿Cuántas veces utilicé cada peso?</h3><div class="table-wrap"><table><thead><tr><th>Peso</th><th>Series</th><th>Sesiones</th><th>${variant.unit==='seconds'?'Segundos totales':'Reps totales'}</th></tr></thead><tbody>${usage.map(r=>`<tr><td><strong>${number(r.weight)} kg</strong></td><td>${r.sets}</td><td>${r.sessions}</td><td>${r.reps}</td></tr>`).join('')}</tbody></table></div><details class="chart-data"><summary>Ver datos del gráfico</summary><div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Carga máxima</th></tr></thead><tbody>${points.map(p=>`<tr><td>${displayDate(p.date)}</td><td>${number(p.value)} kg</td></tr>`).join('')}</tbody></table></div></details>`:'<div class="empty-state"><h3>Aún no tengo series para este ejercicio.</h3><p>Al guardar un entrenamiento, sus pesos aparecerán aquí.</p></div>'}</div>
  <div class="diet-card"><h3>Mi constancia semanal</h3>${weekMap.size?`<div class="week-bars">${[...weekMap].sort(([a],[b])=>a.localeCompare(b)).slice(-12).map(([date,row])=>`<div class="week-bar-row"><span>${displayDate(date)}</span><div class="bar-track"><div style="width:${row.sessions/Math.max(4,...[...weekMap.values()].map(r=>r.sessions))*100}%"></div></div><strong>${row.sessions} sesiones</strong></div>`).join('')}</div><p class="muted">Semanas que empiezan en lunes; se muestran hasta 12 semanas con actividad.</p>`:'<p class="muted">Aquí veré mis semanas de entrenamiento.</p>'}</div><p class="muted stats-footnote">Volumen = peso × repeticiones de series realizadas con unidad «Repeticiones». No incluye calentamiento ni ejercicios registrados en segundos. El peso de máquinas, variantes y mancuernas solo es comparable si mantengo el mismo criterio de registro.</p>`;
}
function lineChart(points){
  const width=760,height=230,left=52,right=24,top=25,bottom=38,max=Math.max(1,...points.map(p=>p.value))*1.12;
  const first=Date.parse(points[0].date),last=Date.parse(points.at(-1).date);
  const x=p=>left+(last===first?(width-left-right)/2:(Date.parse(p.date)-first)/(last-first)*(width-left-right));const y=v=>height-bottom-v/max*(height-top-bottom);
  const path=points.map((p,i)=>`${i?'L':'M'}${x(p)},${y(p.value)}`).join(' ');
  return `<svg class="progress-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolución de la carga máxima por sesión en kg. Datos disponibles en la tabla debajo.">${[0,.5,1].map(t=>`<line x1="${left}" x2="${width-right}" y1="${y(max*t)}" y2="${y(max*t)}" stroke="var(--line)"/><text x="${left-9}" y="${y(max*t)+4}" text-anchor="end">${number(max*t)}</text>`).join('')}<path d="${path}" fill="none" stroke="var(--blue)" stroke-width="3"/>${points.map(p=>`<circle cx="${x(p)}" cy="${y(p.value)}" r="5" fill="var(--blue)"><title>${displayDate(p.date)}: ${number(p.value)} kg</title></circle>`).join('')}<text x="${left}" y="${height-8}">${displayDate(points[0].date)}</text>${points.length>1?`<text x="${width-right}" y="${height-8}" text-anchor="end">${displayDate(points.at(-1).date)}</text>`:''}</svg>`;
}
function weekStart(date){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function updateWeeklySummary(){
  const monday=weekStart(today()),sessions=saved().filter(s=>s.date>=monday&&s.date<=today());
  $('weeklyCount').textContent=sessions.length;$('weeklyFill').style.width=`${Math.min(sessions.length/4*100,100)}%`;
  $('weeklySets').textContent=sessions.flatMap(Gym.completed).length;$('weeklyVolume').textContent=number(sessions.reduce((n,s)=>n+Gym.volume(s),0));
  $('weekRange').textContent=displayDate(monday);$('weeklySummary').textContent=sessions.length?'Cada entrenamiento suma. Sigo a mi ritmo.':'Mi siguiente sesión empieza aquí.';
  $('resumeBanner').innerHTML=data.sessions.filter(s=>s.status==='draft').map(s=>`<a class="resume-banner" href="#session/${s.id}"><span>${s.editOf?'Tengo una edición pendiente':'Tengo una sesión empezada'} · ${wById(s.workoutId).title}</span><strong>Continuar →</strong></a>`).join('');
}
function renderDiet(){
  $('dietContainer').innerHTML=`<div class="diet-layout"><section class="diet-card"><h3>Mi alimentación diaria</h3><div class="meal-timeline">${meals.map(m=>`<article class="meal-card"><div class="meal-icon">${m[0]}</div><div><h4>${m[1]}</h4><p>${m[2]}</p><small>${m[3]}</small></div></article>`).join('')}</div></section><aside class="diet-card"><h3>Mis objetivos diarios</h3><div class="target-grid">${targets.map(t=>`<div class="target-item"><span>${t[0]}</span><div><strong>${t[1]}</strong><br><span>${t[2]}</span></div></div>`).join('')}</div><h3 style="margin-top:22px">Mis hábitos</h3><div class="rules-grid">${rules.map(r=>`<div class="rule-item"><span>${r[0]}</span><strong>${r[1]}</strong></div>`).join('')}</div><div class="notes" style="margin-top:18px"><strong>Adjustment rule:</strong> weigh yourself every morning and use the weekly average. If after 2 weeks the average is not going down, reduce 200–300 kcal/day or increase steps/cardio. If strength drops too much, add more carbs around training.</div></aside></div>`;
}
function route(){
  const hash=location.hash.slice(1)||'home',page=hash.startsWith('session/')?'session':['home','workouts','history','stats','diet','backup'].includes(hash)?hash:'home';
  document.body.dataset.view=page;
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.dataset.page===page));
  document.querySelectorAll('.nav-links a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('navLinks').classList.remove('open');$('navToggle').setAttribute('aria-expanded','false');
  if(page==='session')renderSession(hash.slice(8));else activeId=null;
  if(page==='workouts')renderWorkoutGrid();if(page==='history')renderHistory();if(page==='stats')renderStats();
  if(page==='backup')$('storageStatus').textContent=storageBlocked?'No se pudieron leer los datos existentes. La exportación JSON permite rescatar el contenido original; no se sobrescribirá.':`${saved().length} sesiones guardadas · ${data.sessions.filter(s=>s.status==='draft').length} borradores.`;
  updateWeeklySummary();
}
function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportCsv(){
  const rows=[['session_id','date','workout','exercise','set','weight_kg','value','unit','notes']];saved().forEach(s=>s.exercises.forEach(e=>e.sets.forEach((t,i)=>{if(t.done)rows.push([s.id,s.date,wById(s.workoutId).title,e.name,i+1,t.weight,t.reps,e.unit,s.notes]);})));
  const safe=v=>{let text=String(v);if(/^[=+@\-\t\r]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';};download('\ufeff'+rows.map(row=>row.map(safe).join(',')).join('\r\n'),`my-gym-series-${today()}.csv`,'text/csv;charset=utf-8');
}
document.addEventListener('click',event=>{
  const el=event.target.closest('button,[data-route]');if(!el)return;
  if(el.dataset.start)startSession(el.dataset.start);
  if(el.dataset.route)location.hash=el.dataset.route;
  if(el.dataset.edit)editSession(el.dataset.edit);
  if(el.id==='finishSession')finishSession();
  if(el.dataset.add!==undefined){const s=current(),e=s?.exercises[Number(el.dataset.add)];if(e&&e.sets.length<30){e.sets.push({...e.sets.at(-1),done:false});s.updatedAt=Date.now();persist();renderSession(s.id);}else notify('Máximo 30 series por ejercicio.');}
  if(el.dataset.remove){const [i,j]=el.dataset.remove.split(':').map(Number),s=current();if(s&&s.exercises[i].sets.length>1){if(s.exercises[i].sets[j].done&&!confirm('¿Eliminar esta serie realizada del borrador?'))return;s.exercises[i].sets.splice(j,1);s.updatedAt=Date.now();persist();renderSession(s.id);}}
  if(el.dataset.discard||el.dataset.delete){const id=el.dataset.discard||el.dataset.delete;if(confirm(el.dataset.delete?'¿Eliminar este entrenamiento y sus series? Esta acción no se puede deshacer.':'¿Descartar este borrador?')){const old=data;data={...data,sessions:data.sessions.filter(s=>s.id!==id&&s.editOf!==id)};if(!persist()){data=old;return;}location.hash='history';route();}}
});
document.addEventListener('change',event=>{
  const el=event.target,s=current();
  if(el.id==='historyFilter'){renderHistory();return;}
  if(el.id==='statsPeriod'){statsPeriod=el.value;renderStats();return;}
  if(el.id==='statsExercise'){statsKey=el.value;statsVariant='';renderStats();return;}
  if(el.id==='statsVariant'){statsVariant=el.value;renderStats();return;}
  if(!s)return;
  if(!el.checkValidity()){el.reportValidity();notify('Revisa el valor: peso entre 0 y 2000 kg; repeticiones o segundos enteros mayores que 0.');return;}
  if(el.dataset.ex!==undefined){const e=s.exercises[Number(el.dataset.ex)],field=el.dataset.field;
    if(el.dataset.set!==undefined){const set=e.sets[Number(el.dataset.set)];if(field==='done'){const row=el.closest('.set-row');if(el.checked&&[...row.querySelectorAll('input[type="number"]')].some(n=>!n.checkValidity())){el.checked=false;notify('Completa correctamente el peso y las repeticiones antes de marcar la serie.');return;}set.done=el.checked;row.classList.toggle('completed',el.checked);}else set[field]=Number(el.value);}
    else{if(field==='name'&&!el.value.trim()){el.value=e.name;return;}e[field]=el.value.trim();}
    s.updatedAt=Date.now();const ok=persist();if($('saveHint'))$('saveHint').textContent=ok?'Borrador guardado en este navegador':'No se pudo guardar. Exporta una copia.';updateSessionCount();if(field==='unit'||field==='name')renderSession(s.id);
  }
  if(el.id==='sessionDate'){if(!Gym.dateOK(el.value)){el.value=s.date;return;}s.date=el.value;s.updatedAt=Date.now();persist();}
  if(el.id==='sessionDuration'){s.duration=Number(el.value)*60;s.updatedAt=Date.now();persist();}
  if(el.id==='sessionNotes'){s.notes=el.value;s.updatedAt=Date.now();persist();}
});
$('exportJson').addEventListener('click',()=>{const content=storageBlocked?localStorage.getItem(DATA_KEY)||'{}':JSON.stringify(data,null,2);download(content,`my-gym-backup-${today()}.json`,'application/json');});
$('exportCsv').addEventListener('click',exportCsv);
$('importJson').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  try{if(storageBlocked)throw new Error('Primero rescata los datos existentes. No se puede importar sobre un almacenamiento que no se ha podido leer.');if(file.size>20*1024*1024)throw new Error('La copia supera el límite de 20 MB.');const incoming=Gym.validateData(JSON.parse(await file.text()));if(!confirm(`¿Importar ${incoming.sessions.length} registros? Se combinarán con mis datos actuales, conservando la versión más reciente de cada registro.`))return;const old=data;data=Gym.merge(data,incoming);if(!persist()){data=old;return;}route();notify('Copia importada. Mi historial está actualizado.');}catch(error){notify(error instanceof SyntaxError?'No se ha podido leer este JSON.':error.message);}finally{event.target.value='';}
});
$('navToggle').addEventListener('click',()=>{$('navLinks').classList.toggle('open');$('navToggle').setAttribute('aria-expanded',$('navLinks').classList.contains('open'));});
window.addEventListener('storage',e=>{if(e.key===DATA_KEY){storageChanged=true;notify('Mis datos han cambiado en otra pestaña. Exporta tus cambios y recarga antes de continuar.');}});
window.addEventListener('hashchange',route);
renderWeek();renderDiet();route();
if(storageBlocked)notify('No se pudieron leer los datos guardados. Consulta Mis datos.');
