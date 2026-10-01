/* Shared validation and statistics, also exercised by the Node tests. */
(function(root) {
  'use strict';
  const dateOK = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
  const validSet = s => s && Number.isFinite(s.weight) && s.weight >= 0 && s.weight <= 2000 && Number.isFinite(s.reps) && s.reps > 0 && s.reps <= 10000 && Number.isInteger(s.reps) && typeof s.done === 'boolean';
  function validateSession(s) {
    if (!s || typeof s.id !== 'string' || !(/^[A-Za-z0-9_-]{1,100}$/).test(s.id) || (s.editOf !== undefined && (typeof s.editOf !== 'string' || !(/^[A-Za-z0-9_-]{1,100}$/).test(s.editOf) || s.status !== 'draft')) || !['upper-a','lower-a','upper-b','lower-b'].includes(s.workoutId) || !dateOK(s.date) || !['draft','saved'].includes(s.status) || typeof s.notes !== 'string' || s.notes.length > 5000 || !Number.isFinite(s.startedAt) || !Number.isFinite(s.updatedAt) || !Number.isFinite(s.duration) || s.duration < 0 || s.duration > 86400 || !Array.isArray(s.exercises) || s.exercises.length !== 7) return false;
    return s.exercises.every((e,i) => e && e.key === `${s.workoutId}:${i+1}` && typeof e.name === 'string' && e.name.trim().length > 0 && e.name.length <= 150 && ['reps','seconds'].includes(e.unit) && typeof e.warmup === 'boolean' && Array.isArray(e.sets) && e.sets.length <= 30 && e.sets.length > 0 && e.sets.every(validSet));
  }
  function validateData(d) {
    if (!d || d.version !== 2 || !Array.isArray(d.sessions) || d.sessions.length > 10000 || !d.sessions.every(validateSession) || new Set(d.sessions.map(s=>s.id)).size !== d.sessions.length) throw new Error('La copia no tiene un formato válido. Importa un JSON exportado desde My Gym.');
    return d;
  }
  function merge(a,b) {
    const byId = new Map(a.sessions.map(s=>[s.id,s]));
    b.sessions.forEach(s=>{ if (!byId.has(s.id) || s.updatedAt > byId.get(s.id).updatedAt) byId.set(s.id,s); });
    return {...a,sessions:[...byId.values()],legacyProgress:{...b.legacyProgress,...a.legacyProgress}};
  }
  const completed = s => s.exercises.flatMap(e=>e.sets.filter(t=>t.done).map(t=>({...t,key:e.key,name:e.name,unit:e.unit,warmup:e.warmup})));
  const volume = s => completed(s).filter(t=>t.unit === 'reps' && !t.warmup).reduce((n,t)=>n+t.weight*t.reps,0);
  function weightUsage(sessions,key,name,unit) {
    const rows=new Map();
    sessions.filter(s=>s.status==='saved').forEach(s=>{
      const seen=new Set();
      s.exercises.filter(e=>e.key===key && e.name===name && e.unit===unit).forEach(e=>e.sets.filter(t=>t.done).forEach(t=>{
        const row=rows.get(t.weight)||{weight:t.weight,sets:0,sessions:0,reps:0};
        row.sets++; row.reps+=t.reps;
        if(!seen.has(t.weight)){row.sessions++;seen.add(t.weight);}
        rows.set(t.weight,row);
      }));
    });
    return [...rows.values()].sort((a,b)=>a.weight-b.weight);
  }
  const api={dateOK,validSet,validateSession,validateData,merge,completed,volume,weightUsage};
  if(typeof module!=='undefined') module.exports=api; else root.Gym=api;
})(typeof window!=='undefined'?window:globalThis);
