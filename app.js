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

let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
const exerciseKey = (workoutId, index) => `${workoutId}:${index}`;
const doneCount = (workout) => workout.exercises.filter((_,i)=>progress[exerciseKey(workout.id,i)]).length;
const totalExercises = workouts.reduce((s,w)=>s+w.exercises.length,0);

function renderWeek(){
  document.getElementById('weekGrid').innerHTML = week.map(([day,type,duration,focus,color])=>`<article class="day-card"><span class="tag ${color}">${duration}</span><strong>${day}</strong><h3>${type}</h3><span>${focus}</span></article>`).join('');
}

function renderWorkoutGrid(){
  document.getElementById('workoutGrid').innerHTML = workouts.map(w=>{
    const done = doneCount(w), pct = Math.round(done / w.exercises.length * 100);
    return `<article class="workout-card" style="--accent:${w.accent}"><div><div class="workout-icon">${w.icon}</div><h3>${w.day} — ${w.title}</h3><p>${w.subtitle}</p><div class="session-meta"><span class="pill">${w.time}</span><span class="pill">${w.exercises.length} exercises</span></div><div class="progress-row"><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><small>${done}/${w.exercises.length} completed</small></div></div><button class="open-button" type="button" data-session="${w.id}">Open workout</button></article>`;
  }).join('');
}

function renderSession(id){
  const w = workouts.find(x=>x.id===id) || workouts[0];
  const done = doneCount(w), pct = Math.round(done / w.exercises.length * 100);
  document.getElementById('sessionContainer').innerHTML = `<section class="session-head" style="--accent:${w.accent}"><div><p class="eyebrow">${w.day} session</p><h2>${w.title}</h2><p class="section-heading-p">${w.subtitle}. ${w.focus}.</p><div class="session-meta"><span class="pill">${w.time}</span><span class="pill">${w.supersets}</span><span class="pill">${done}/${w.exercises.length} done</span></div></div><div class="ring" style="--p:${pct};color:${w.accent}"><span>${pct}%</span></div></section><div class="exercise-list">${w.exercises.map((e,i)=>exerciseCard(w,e,i)).join('')}</div>`;
}

function exerciseCard(w,e,i){
  const [icon,title,detail,sets,reps,note]=e;
  const key = exerciseKey(w.id,i);
  return `<article class="exercise-card" style="--accent:${w.accent}"><div class="exercise-art" aria-label="Illustration of ${title}">${iconSvg(icon)}</div><div class="exercise-body"><div class="exercise-title-row"><h3>${title}</h3><label class="check"><span>Done</span><input type="checkbox" data-check="${key}" ${progress[key]?'checked':''}></label></div><p class="cue"><strong>${detail}</strong></p><div class="prescription"><span class="pill">${sets}</span><span class="pill">${reps}</span><span class="pill">Rest: ${e[4]}</span></div><div class="notes">${note}</div></div></article>`;
}

function renderDiet(){
  document.getElementById('dietContainer').innerHTML = `<div class="diet-layout"><section class="diet-card"><h3>Daily routine</h3><div class="meal-timeline">${meals.map(m=>`<article class="meal-card"><div class="meal-icon">${m[0]}</div><div><h4>${m[1]}</h4><p>${m[2]}</p><small>${m[3]}</small></div></article>`).join('')}</div></section><aside class="diet-card"><h3>Daily targets</h3><div class="target-grid">${targets.map(t=>`<div class="target-item"><span>${t[0]}</span><div><strong>${t[1]}</strong><br><span>${t[2]}</span></div></div>`).join('')}</div><h3 style="margin-top:22px">Quick rules</h3><div class="rules-grid">${rules.map(r=>`<div class="rule-item"><span>${r[0]}</span><strong>${r[1]}</strong></div>`).join('')}</div><div class="notes" style="margin-top:18px"><strong>Adjustment rule:</strong> weigh yourself every morning and use the weekly average. If after 2 weeks the average is not going down, reduce 200–300 kcal/day or increase steps/cardio. If strength drops too much, add more carbs around training.</div></aside></div>`;
}

function updateWeeklySummary(){
  const done = workouts.reduce((s,w)=>s+doneCount(w),0);
  const pct = Math.round(done / totalExercises * 100);
  document.getElementById('weeklyPercent').textContent = `${pct}%`;
  document.getElementById('weeklyRing').style.setProperty('--p', pct);
  document.getElementById('weeklySummary').textContent = done ? `${done}/${totalExercises} exercises completed across your strength week.` : 'No exercises checked yet.';
}

function route(){
  const hash = location.hash.replace('#','') || 'home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  if(hash.startsWith('session-')){ document.getElementById('sessionPage').classList.add('active'); renderSession(hash.replace('session-','')); }
  else if(hash==='workouts'){ document.getElementById('workoutsPage').classList.add('active'); renderWorkoutGrid(); }
  else if(hash==='diet'){ document.getElementById('dietPage').classList.add('active'); renderDiet(); }
  else { document.getElementById('homePage').classList.add('active'); }
  document.getElementById('navLinks').classList.remove('open');
  updateWeeklySummary();
}

document.addEventListener('click', e=>{
  const session = e.target.closest('[data-session]');
  if(session) location.hash = `session-${session.dataset.session}`;
  const routeBtn = e.target.closest('[data-route]');
  if(routeBtn) location.hash = routeBtn.dataset.route;
});

document.addEventListener('change', e=>{
  if(e.target.matches('[data-check]')){ progress[e.target.dataset.check] = e.target.checked; save(); route(); }
});

document.getElementById('resetAllBtn').addEventListener('click',()=>{ if(confirm('Reset all workout checkboxes for this device?')){ progress={}; save(); route(); }});
document.getElementById('navToggle').addEventListener('click',()=>{ const nav=document.getElementById('navLinks'); nav.classList.toggle('open'); document.getElementById('navToggle').setAttribute('aria-expanded', nav.classList.contains('open')); });
window.addEventListener('hashchange', route);
renderWeek(); renderWorkoutGrid(); renderDiet(); updateWeeklySummary(); route();
