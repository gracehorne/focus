# Template Library

Reference document. Edit this first, then apply changes to `DEFAULT_TEMPLATES` in `index.html`.
After any changes, bump `TPL_RESET_VERSION` in `index.html` to force a cache refresh for all users.

Format: each template has a heading with its display name and `id` in backticks, followed by a bullet list of steps.

---

## life

### morning routine (`morning-routine`)

- go outside!
- drink a glass of water
- do one quiet thing before the day starts: stretch, journal, sip coffee
- set one intention for today

### shutdown routine (`shutdown-routine`)

- look at calendar
- write down narrative for tomorrow
- write down anything still on your mind
- close tabs and apps

### tomorrow prep (`tomorrow-prep`)

- pack bag / lay out clothes
- prep or plan lunch
- check your calendar: what's the first thing tomorrow?

---

## work

### brain dump (`brain-dump`)

- write everything in your head: tasks, worries, ideas, half-thoughts
- highlight tasks
- sort into: do today, do later, delegate, drop

### eat the frog (`eat-the-frog`)

- identify the task you've been most avoiding
- do it before email or anything else
- start with the smallest possible first step
- stay with it until it's done

### data analysis sesh (`data-analysis-session`)

- what's the question?
- project folder, relevant scripts, and a notes doc
- add a short comment before each chunk of code
- end by writing what you found and what the next question is

### writing session (`writing-session`)

- name the specific section or goal for this session
- close email and unrelated tabs
- re-read the last paragraph you wrote to get back into the flow
- write without editing while you draft
- when you stop: note what comes next so you can pick it up easily

### read journal article (`read-journal-article`)

- read the abstract and conclusion first
- read the methods critically
- write 2–3 sentences from memory after finishing
- tag and file it

### park uphill (`project-shutdown`)

- write down progress
- write where you stopped
- write the very first action for next session: make it tiny enough to start in 30 seconds
- put project folder in an obvious place for next time

---

## body

### movement (`movement`)

- pick the form of movement
- pick a podcast / playlist / album
- leave phone behind!

---

## mind

### before you sit down (`body-check`)

- hungry? eat something before sitting down
- thirsty? fill a glass of water
- stiff or restless? walk around the block
- overstimulated? close extra tabs, dim screen, put on headphones

---

## Notes for editing

- To add a template: add it here, then add the object to `DEFAULT_TEMPLATES` in `index.html`, then bump `TPL_RESET_VERSION`.
- To remove a template: add its `id` to `REMOVED_TEMPLATE_IDS` in `index.html` (don't delete from `DEFAULT_TEMPLATES` directly, to preserve history).
- Categories are: `life`, `work`, `body`, `mind`, `liminal`.
- The `id` must be unique, kebab-case, and stable — it's used as a key in localStorage for use counts.
