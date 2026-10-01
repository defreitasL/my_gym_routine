# My Gym Routine

Mobile-first static training journal for Lucas's original four-day Upper/Lower routine. Hosted on GitHub Pages; no build step or runtime dependencies.

## Features

- Spanish navigation and journal interface, retaining the original exercises, coaching cues, SVG illustrations and nutrition plan.
- Date-based sessions with weights, reps or seconds, completed sets, optional duration and notes.
- Automatic local draft saving, previous-session loads, adding/removing sets, saving, editing and deleting sessions.
- Weekly session and set totals, training volume, workout history and 30/90-day filters.
- Per-exercise load chart and weight-use table: distinct sessions, sets and total reps/seconds.
- Separate exercise variants and units to avoid combining unrelated loads (e.g. squat vs leg press).
- JSON backup/import with validation and newest-version merge by session ID; CSV export of completed sets.

## Storage and statistics

Data stays in `localStorage` under `myGymRoutineJournal.v2`. There is no server, account or automatic device sync. Export JSON regularly, and import it on another device to transfer records. JSON includes drafts; CSV includes only completed sets in saved sessions. A saved session may have uncompleted sets; those sets do not contribute to statistics.

The weekly target is four **sessions**, with weeks beginning Monday. The dashboard includes saved sessions from Monday through today. Progress filters exclude future-dated sessions. Volume is external weight × completed repetitions; exercises recorded in seconds and warmups are excluded. Load charts show maximum external weight per session, not estimated 1RM. Zero kg means no external load. Keep a consistent per-hand/total-weight convention for dumbbells. For assisted machines, record the variant explicitly and interpret the load accordingly.

Legacy checkbox data under `myGymRoutineProgress.v1` is retained in place and in JSON backups, without inventing historical dates. Unreadable journal storage is not overwritten. If storage fails, export a backup before closing the page. When another tab changes journal storage, writes are blocked until reload to avoid overwriting that tab's history.

## Files

- `index.html`: application shell and navigation.
- `style.css`: responsive layout, keyboard focus and reduced-motion support.
- `app.js`: original routine/nutrition data and journal interface.
- `tracker.js`: validation, backup merging and statistics.
- `tests/tracker.test.cjs`: calculation and import-integrity tests.

## Local development and checks

```sh
python -m http.server 8000
node --check app.js
node --check tracker.js
node --test tests/tracker.test.cjs
```

Open `http://localhost:8000`. For GitHub Pages, use the `main` branch and repository root. All asset paths are relative so the site works under `/my_gym_routine/`.
