/* Local routine builder and portable sharing. Sessions keep a routine snapshot. */
let editorModel=null, editorRoute='', shareCandidate=null;
const editorStorageKey='myGymRoutineEditor.v1';
const editorIconNames={bench:'Press',row:'Remo',pulldown:'Jalón',lateral:'Hombros',curl:'Bíceps',triceps:'Tríceps',squat:'Piernas',deadlift:'Peso muerto',calf:'Gemelos',crunch:'Abdominales',plank:'Plancha',warmup:'General'};
function routineFromWorkout(w){
  if(w.id.startsWith('custom-'))return structuredClone(w);
  return {id:`custom-preset-${w.id}`,title:w.title,subtitle:w.subtitle,day:w.day,time:w.time,accent:w.accent,icon:w.icon,focus:w.focus,supersets:w.supersets,updatedAt:0,exerciseIds:['warmup',...w.exercises.slice(1).map((_,i)=>`exercise-${i+1}`)],units:w.exercises.map(e=>e[0]==='plank'?'seconds':'reps'),exercises:w.exercises.map((e,i)=>i===0?[...e]:[e[0],e[1],`${parseInt(e[2])||3} sets`,`${parseInt(e[3])||10} ${e[0]==='plank'?'s':'reps'}`,`${parseInt(e[4])||60} s`,e[5]])};
}
function modelFromRoutine(r){return {id:r.id,title:r.title,subtitle:r.subtitle,day:r.day,warmup:parseInt(r.exercises[0][3])||0,warmupNotes:r.exercises[0][5],updatedAt:r.updatedAt,items:r.exercises.slice(1).map((e,i)=>({id:r.exerciseIds[i+1],name:e[1],icon:e[0],sets:parseInt(e[2]),reps:parseInt(e[3]),rest:parseInt(e[4]),unit:r.units[i+1],notes:e[5]}))};}
function emptyEditor(){return {id:`custom-${uid()}`,title:'',subtitle:'',day:'Flexible',warmup:5,warmupNotes:'',updatedAt:Date.now(),items:[newEditorItem()]};}
function newEditorItem(){return {id:uid(),name:'',icon:'warmup',sets:3,reps:10,rest:60,unit:'reps',notes:''};}
function saveEditorDraft(){try{const drafts=JSON.parse(localStorage.getItem(editorStorageKey)||'{}');drafts[editorRoute||'new']=editorModel;localStorage.setItem(editorStorageKey,JSON.stringify(drafts));$('editorSaveHint').textContent=I18n.text('Borrador guardado en este navegador');}catch{if($('editorSaveHint'))$('editorSaveHint').textContent=I18n.text('No se pudo guardar. Exporta una copia.');}}
function clearEditorDraft(){try{const drafts=JSON.parse(localStorage.getItem(editorStorageKey)||'{}');delete drafts[editorRoute||'new'];localStorage.setItem(editorStorageKey,JSON.stringify(drafts));}catch{}editorModel=null;}
function renderEditor(id=''){
  if(editorModel===null||editorRoute!==id){editorRoute=id;editorModel=null;try{const draft=JSON.parse(localStorage.getItem(editorStorageKey)||'{}')[id||'new'];if(draft&&Array.isArray(draft.items)&&draft.items.length<=30)editorModel=draft;}catch{}
    if(!editorModel){const source=wById(id);if(source){editorModel=modelFromRoutine(routineFromWorkout(source));if(!id.startsWith('custom-')){editorModel.id=`custom-${uid()}`;editorModel.title=source.title+' · '+I18n.text('Mi copia');}}else editorModel=emptyEditor();}
  }
  const m=editorModel;
  $('editorContainer').innerHTML=`<form id="routineForm"><div class="diet-card"><div class="editor-fields"><label>Nombre de la rutina<input name="title" data-editor-field="title" value="${esc(m.title)}" required maxlength="100" placeholder="Ej.: Mi entrenamiento de cuerpo completo"></label><label>Día<select data-editor-field="day">${Object.entries(dayNames).map(([key,name])=>`<option value="${key}" ${m.day===key?'selected':''}>${name}</option>`).join('')}</select></label><label class="wide">Descripción<input data-editor-field="subtitle" value="${esc(m.subtitle)}" maxlength="300" placeholder="Mi objetivo, enfoque o indicaciones generales"></label><label>Calentamiento (min)<input data-editor-field="warmup" type="number" value="${m.warmup}" min="0" max="30" step="1" required></label><label>Indicaciones del calentamiento<input data-editor-field="warmupNotes" value="${esc(m.warmupNotes)}" maxlength="500"></label></div></div><div class="editor-items">${m.items.map((item,i)=>editorItem(item,i)).join('')}</div><button type="button" class="secondary-light" id="addEditorExercise">＋ Añadir ejercicio</button><p class="muted">Puedo cambiar el orden con las flechas. Los nombres y notas que escribo se conservan en su idioma original.</p><div class="session-actions"><span id="editorSaveHint">Borrador guardado en este navegador</span><div class="button-row"><button type="button" class="secondary-light" id="cancelEditor">Cancelar</button><button type="submit" class="open-button">Guardar rutina ✓</button></div></div></form>`;
}
function editorItem(item,i){return `<article class="diet-card editor-item"><div class="card-top"><h3>Ejercicio ${i+1}</h3><div class="button-row"><button type="button" class="editor-order" data-editor-move="${i}:-1" aria-label="Subir ejercicio" ${i===0?'disabled':''}>↑</button><button type="button" class="editor-order" data-editor-move="${i}:1" aria-label="Bajar ejercicio" ${i===editorModel.items.length-1?'disabled':''}>↓</button><button type="button" class="delete-button" data-editor-remove="${i}" ${editorModel.items.length===1?'disabled':''}>Eliminar</button></div></div><div class="editor-fields"><label class="wide">Nombre del ejercicio<input data-editor-item="${i}" data-field="name" value="${esc(item.name)}" maxlength="150" required placeholder="Ej.: Sentadilla con barra"></label><label>Series<input data-editor-item="${i}" data-field="sets" type="number" value="${item.sets}" min="1" max="30" step="1" required></label><label>Repeticiones / segundos<input data-editor-item="${i}" data-field="reps" type="number" value="${item.reps}" min="1" max="10000" step="1" required></label><label>Unidad<select data-editor-item="${i}" data-field="unit"><option value="reps" ${item.unit==='reps'?'selected':''}>Repeticiones</option><option value="seconds" ${item.unit==='seconds'?'selected':''}>Segundos</option></select></label><label>Descanso (s)<input data-editor-item="${i}" data-field="rest" type="number" value="${item.rest}" min="0" max="9999" step="1" required></label><label>Ilustración orientativa<select data-editor-item="${i}" data-field="icon">${Object.entries(editorIconNames).map(([key,name])=>`<option value="${key}" ${item.icon===key?'selected':''}>${name}</option>`).join('')}</select></label><label class="wide">Notas / técnica<textarea data-editor-item="${i}" data-field="notes" maxlength="500">${esc(item.notes)}</textarea></label></div></article>`;}
function routineFromModel(){const m=editorModel;return {id:m.id,title:m.title.trim(),subtitle:m.subtitle.trim(),day:m.day,time:'',focus:'',supersets:'',accent:'#176655',icon:'↗',updatedAt:Date.now(),exerciseIds:['warmup',...m.items.map(e=>e.id)],units:['reps',...m.items.map(e=>e.unit)],exercises:[['warmup','Warm-up',m.warmupNotes,`${m.warmup} min`,'—',m.warmupNotes],...m.items.map(e=>[e.icon,e.name.trim(),`${e.sets} sets`,`${e.reps} ${e.unit==='seconds'?'s':'reps'}`,`${e.rest} s`,e.notes])]};}
function saveRoutine(){
  const routine=routineFromModel();if(!Gym.validateRoutine(routine)){notify('Revisa el nombre y los datos de cada ejercicio.');return;}
  if(!data.routines.some(r=>r.id===routine.id)&&data.routines.length>=200){notify('Máximo 200 rutinas guardadas.');return;}
  const old=structuredClone(data);data.routines=data.routines.filter(r=>r.id!==routine.id);data.routines.push(routine);if(!persist()){data=old;return;}clearEditorDraft();location.hash='workouts';notify('Rutina guardada. Ya puedo entrenar o compartirla.');
}
function encodeRoutine(r){const bytes=new TextEncoder().encode(JSON.stringify({format:'my-gym-routine',version:1,routine:r}));return btoa(Array.from(bytes,b=>String.fromCharCode(b)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decodeRoutine(payload){
  if(payload.length>30000||!/^[A-Za-z0-9_-]+$/.test(payload))throw new Error('El enlace compartido no es válido.');
  const str=atob(payload.replace(/-/g,'+').replace(/_/g,'/')),obj=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(str,c=>c.charCodeAt(0))));
  if(obj.format!=='my-gym-routine'||obj.version!==1||!Gym.validateRoutine(obj.routine))throw new Error('La rutina compartida no tiene un formato válido.');return obj.routine;
}
function openShare(id){
  const w=wById(id);if(!w)return;shareCandidate=routineFromWorkout(w);const payload=encodeRoutine(shareCandidate);
  const url=payload.length<=30000?`${location.origin}${location.pathname}#share/${payload}`:'';
  $('shareDialog').innerHTML=`<div class="dialog-heading"><h2>Compartir rutina</h2><button class="editor-order" id="closeShare" aria-label="Cerrar">×</button></div><p class="muted">Comparto solo el plan de ejercicios. Mi historial, mis pesos registrados y mis notas de sesiones no se incluyen.</p>${url?`<label>Enlace para mis amigos<textarea id="shareUrl" readonly translate="no">${esc(url)}</textarea></label><div class="button-row"><button class="open-button" id="copyRoutineLink">Copiar enlace</button>${navigator.share?'<button class="secondary-light" id="nativeShareRoutine">Compartir…</button>':''}<button class="secondary-light" id="downloadRoutine">Descargar rutina JSON</button></div>`:'<p>Esta rutina es demasiado larga para un enlace. Puedo compartirla como archivo JSON.</p><button class="open-button" id="downloadRoutine">Descargar rutina JSON</button>'}`;
  $('shareDialog').showModal();
}
function renderShared(payload){
  try{shareCandidate=payload==='import'&&shareCandidate?shareCandidate:decodeRoutine(payload);const r=shareCandidate;$('sharedContainer').innerHTML=`<article class="diet-card"><p class="eyebrow">UNA RUTINA PARA COMPARTIR</p><h2 translate="no">${esc(r.title)}</h2><p translate="no">${esc(r.subtitle)}</p><p class="muted">${r.exercises.length-1} ejercicios + calentamiento · ${dayNames[r.day]}</p><div class="shared-exercises">${r.exercises.slice(1).map((e,i)=>`<div><strong translate="no">${esc(e[1])}</strong><span>${esc(e[2])} · ${esc(e[3])} · Descanso ${esc(e[4])}</span><small translate="no">${esc(e[5])}</small></div>`).join('')}</div><p class="muted">Al añadirla, guardo una copia en mi navegador. Mis entrenamientos y estadísticas serán independientes.</p><button class="open-button" id="addSharedRoutine">Añadir a mis rutinas</button></article>`;}catch{shareCandidate=null;$('sharedContainer').innerHTML='<div class="empty-state"><h3>No se ha podido abrir esta rutina.</h3><p>El enlace puede estar incompleto o tener un formato incorrecto.</p><a class="open-button" href="#workouts">Ir a mi rutina</a></div>';}
}
function addSharedRoutine(){
  if(!shareCandidate)return;
  const existing=data.routines.find(r=>r.sharedFrom===shareCandidate.id&&r.sharedVersion===shareCandidate.updatedAt);
  if(existing){location.hash='workouts';notify('Esta rutina ya está en mis rutinas.');return;}
  if(data.routines.length>=200){notify('Máximo 200 rutinas guardadas.');return;}
  const copy={...structuredClone(shareCandidate),id:`custom-${uid()}`,sharedFrom:shareCandidate.id,sharedVersion:shareCandidate.updatedAt,updatedAt:Date.now()};
  data.routines.push(copy);if(!persist()){data.routines.pop();return;}location.hash='workouts';notify('Rutina añadida. Ya puedo registrar mis entrenamientos.');
}
document.addEventListener('input',event=>{
  const el=event.target;if(!editorModel)return;
  if(el.dataset.editorField){editorModel[el.dataset.editorField]=el.type==='number'?Number(el.value):el.value;saveEditorDraft();}
  if(el.dataset.editorItem!==undefined){editorModel.items[Number(el.dataset.editorItem)][el.dataset.field]=el.type==='number'?Number(el.value):el.value;saveEditorDraft();}
});
document.addEventListener('change',event=>{const el=event.target;if(el.tagName==='SELECT'&&(el.dataset.editorField||el.dataset.editorItem!==undefined))el.dispatchEvent(new Event('input',{bubbles:true}));});
document.addEventListener('submit',event=>{if(event.target.id==='routineForm'){event.preventDefault();saveRoutine();}});
document.addEventListener('click',async event=>{
  const el=event.target.closest('button');if(!el)return;
  if(el.dataset.routineEdit){location.hash=`editor/${el.dataset.routineEdit}`;}
  if(el.dataset.routineDelete&&confirmText('¿Eliminar esta rutina? Los entrenamientos ya registrados se conservarán.')){const old=data.routines;data.routines=data.routines.filter(r=>r.id!==el.dataset.routineDelete);if(!persist()){data.routines=old;return;}renderWorkoutGrid();}
  if(el.dataset.share)openShare(el.dataset.share);
  if(el.id==='closeShare')$('shareDialog').close();
  if(el.id==='copyRoutineLink'){try{await navigator.clipboard.writeText($('shareUrl').value);notify('Enlace copiado. Ya puedo enviarlo a mis amigos.');}catch{$('shareUrl').focus();$('shareUrl').select();notify('Selecciona y copia el enlace para compartirlo.');}}
  if(el.id==='nativeShareRoutine'){try{await navigator.share({title:shareCandidate.title,url:$('shareUrl').value});}catch{}}
  if(el.id==='downloadRoutine')download(JSON.stringify({format:'my-gym-routine',version:1,routine:shareCandidate},null,2),'my-gym-routine.json','application/json');
  if(el.id==='addSharedRoutine')addSharedRoutine();
  if(el.id==='addEditorExercise'){if(editorModel.items.length>=30){notify('Máximo 30 ejercicios por rutina.');return;}editorModel.items.push(newEditorItem());saveEditorDraft();renderEditor(editorRoute);}
  if(el.dataset.editorRemove!==undefined){const i=Number(el.dataset.editorRemove);if(editorModel.items.length>1){editorModel.items.splice(i,1);saveEditorDraft();renderEditor(editorRoute);}}
  if(el.dataset.editorMove){const [i,d]=el.dataset.editorMove.split(':').map(Number);const j=i+d;if(j>=0&&j<editorModel.items.length){[editorModel.items[i],editorModel.items[j]]=[editorModel.items[j],editorModel.items[i]];saveEditorDraft();renderEditor(editorRoute);}}
  if(el.id==='cancelEditor'){if(confirmText('¿Descartar los cambios de este borrador de rutina?')){clearEditorDraft();location.hash='workouts';}}
});
$('importRoutine').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>50000)throw Error('El archivo de rutina supera el límite de 50 KB.');const obj=JSON.parse(await file.text());if(obj.format!=='my-gym-routine'||obj.version!==1||!Gym.validateRoutine(obj.routine))throw Error('La rutina compartida no tiene un formato válido.');shareCandidate=obj.routine;const encoded=encodeRoutine(shareCandidate);location.hash=encoded.length<=30000?`share/${encoded}`:'share/import';route();}catch{notify('No se ha podido importar esta rutina. Revisa el archivo JSON.');}finally{event.target.value='';}});
renderWeek();renderDiet();route();I18n.start();
if(storageBlocked)notify('No se pudieron leer los datos guardados. Consulta Mis datos.');
