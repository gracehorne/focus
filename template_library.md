# Template Library

Reference document. Edit this first, then apply changes to `DEFAULT_TEMPLATES` in `index.html`.
After any changes, bump `TPL_RESET_VERSION` in `index.html` to force a cache refresh for all users.

Format: each template has a heading with its display name and `id` in backticks, followed by a bullet list of steps.

---

## life

### morning routine (`morning-routine`)
- go outside before checking your phone
- drink a glass of water
- do one quiet thing before the day starts: stretch, journal, sit with your coffee
- set one intention for today

### shutdown routine (`shutdown-routine`)
- close tabs and apps
- write down what tomorrow needs from you
- write down anything still on your mind
- leave your workspace. physically step away
- name one thing that went okay today

### tomorrow prep (`tomorrow-prep`)
- pack your bag or lay out what you'll need
- set out clothes for tomorrow
- prep or plan lunch so morning-you doesn't have to decide
- check your calendar: what's the first thing tomorrow?
- write one thing you want to remember to do first
- charge your phone and anything else that needs it
- close out today: tabs, apps, kitchen, whatever feels open

### house cleaning (`house-cleaning`)
- start with the most visible mess
- move through rooms in one direction
- put on something good to listen to
- do a final walk-through before stopping

### email (`inbox-zero`)
- archive or delete anything older than two weeks that needs no action
- for each remaining email: reply, flag, or delete
- unsubscribe from anything you've been skipping
- close email when done

---

## work

### write it all down (`brain-dump`)
- write everything in your head: tasks, worries, ideas, half-thoughts
- don't organize yet, just get it all out
- sort into: do today, do later, delegate, drop
- pick one thing to start with and close the list

### the thing you're avoiding (`eat-the-frog`)
- identify the task you've been most avoiding
- do it before email or anything else
- start with the smallest possible first step
- stay with it until it's done

### meeting prep (`meeting-prep`)
- write the one thing you need to get out of this meeting
- review relevant context: previous notes, open questions
- prepare one question to ask if the conversation stalls
- have somewhere to capture action items

### data analysis session (`data-analysis-session`)
- write the question you're trying to answer before opening any software
- open your project folder, relevant scripts, and a notes doc
- do a quick look at your data before diving in: dimensions, gaps, distributions
- add a short comment before each chunk of code describing what you're doing
- end by writing what you found and what the next question is

### writing session (`writing-session`)
- name the specific section or goal for this session
- close email and unrelated tabs
- re-read the last paragraph you wrote to get back into the flow
- write without editing while you draft
- when you stop: note what comes next so you can pick it up easily

### project startup (`project-startup`)
- read your last session's notes or breadcrumb — where did you leave off?
- name the current blockers: what's actually in the way right now?
- write the 3 most important next actions (not a full list — just 3)
- pick the first one. set a timer for 25 minutes and start
- if you feel stuck: shrink the first step until it's embarrassingly small

### read journal article (`read-journal-article`)
- read the abstract and conclusion first
- read the methods critically: could you replicate this? what are the limits?
- note what stood out, what you question, and what connects to your work
- write 2–3 sentences from memory after finishing
- tag and file it

### peer review (`peer-review`)
- read the paper once through without taking notes
- read again: is the question clear? do the methods fit? do the results support the claims?
- identify the 2–3 most important issues
- note smaller things separately: writing, framing, missing references
- lead your review with what the paper does well
- check your tone. be direct but fair

### writing a blog post (`writing-a-blog-post`)
- know who you're writing for and what they'll walk away with
- write the opening first. if it's boring, the rest won't matter
- outline the main points before drafting
- draft fast and get to the end before going back
- read it aloud before publishing

### talk prep (`talk-prep`)
- write the one thing you want the audience to leave knowing
- sketch the structure: how does it open, what are the main points, how does it end
- do a full out-loud run-through, timed
- think through the moments most likely to make you nervous
- the night before: one slow read-through, then stop. you're ready enough

---

## body

### movement (`movement`)
- pick the form of movement you'll actually do today
- even 10 minutes counts
- leave your phone behind if you can

### PT stretches (`pt-stretches`)
- do these before the day gets busy
- move slowly. don't rush through them
- breathe through each stretch
- note anything uneven or uncomfortable

---

## mind

### before you sit down (`body-check`)
- are you hungry? eat something real before sitting down
- are you thirsty? fill a glass of water now
- are you tired? a short rest is faster than two hours of not working
- are you stiff or restless? move for a few minutes first
- is everything feeling like too much? close extra tabs, dim your screen, put on headphones

### time alone (`social-recharge`)
- spend some time in real quiet
- do one thing that's entirely for you
- let yourself be slow for a bit

### getting feedback (`feedback-separation`)
- read it all the way through before reacting
- write down what's actually useful
- pick one thing to act on
- set the rest aside. it'll read differently tomorrow

### when you're going quiet (`minimum-viable-response`)
- notice if you're going quiet. it's a reflex, not a decision
- send something short to keep the conversation open
- write your real response once you've had some time

---

## liminal

### field to desk (`context-switch-field-to-desk`)
- give yourself time before opening your laptop
- write rough field notes while everything is fresh
- write one sentence about what question you're working on today
- start with the easiest writing task

### after a hard week (`recalibration-after-an-off-week`)
- don't try to catch up on everything at once
- write down everything unfinished or weighing on you, then sort it
- pick one thing to finish today
- be easy on yourself about the week

### park uphill (`project-shutdown`)
- write what you actually did this session (2–3 sentences)
- write where you stopped — the exact sentence, the exact file, the exact thought
- write the very first action for next session: make it tiny enough to start in 30 seconds
- close the open loops: browser tabs, scratch notes, half-written messages
- put your project folder in an obvious place for next time

---

## Notes for editing

- To add a template: add it here, then add the object to `DEFAULT_TEMPLATES` in `index.html`, then bump `TPL_RESET_VERSION`.
- To remove a template: add its `id` to `REMOVED_TEMPLATE_IDS` in `index.html` (don't delete from `DEFAULT_TEMPLATES` directly, to preserve history).
- Categories are: `life`, `work`, `body`, `mind`, `liminal`.
- The `id` must be unique, kebab-case, and stable — it's used as a key in localStorage for use counts.
