/* Orbit shared UI: contextual floating "… with Orbit" button, slide-out chat,
   "What can I do with Orbit?" help modal, and the generic modal used app-wide. */
(function () {
  /* ---------- Context per area ---------- */
  var AREAS = {
    dash: {
      label: 'Ask Orbit', name: 'Dashboard', help: 'How can I help you start your day?',
      chips: [
        ['What needs me today?', '3 things: approve the Just Listed · 3310 Grand mailing (184 pieces), call back the Reyes Family Trust at 11:00, and Alcatraz Partners replied overnight.'],
        ['Who is behind on calls?', 'The team is at 412 of 500 calls this week — 88 behind. Marissa is on pace; David is about 40 short.'],
        ['Any hot replies?', '2 since yesterday: Patricia Nguyen (web form, wants a value) and Alcatraz Partners (email reply about 88 Vernon St).'],
        ['Who replied overnight?', '3 replies overnight: Alcatraz Partners (email, 88 Vernon St), Patricia Nguyen (web form, wants a value) and one QR scan from 1840 Park LLC.', 'team']
      ],
      intro: 'Orbit watches everything happening across PLS — signals, replies, calls, mailings, and team activity. On the Dashboard it pulls that together into what needs your attention today. Ask it to triage your morning instead of clicking through every screen.',
      caps: [
        ['Morning triage', 'Get a short list of what is waiting on you across approvals, callbacks, and replies.', 'What do I need to handle before noon today?'],
        ['Signal roundup', 'See which owners had new signals overnight and why they matter.', 'Which owners had a new signal since yesterday?'],
        ['Team pulse', 'Check whether the team is on pace without opening Your Team.', 'Are we on pace for calls this week?'],
        ['Quick drafting', 'Have Orbit draft a reply or follow-up from anything on the dashboard.', 'Draft a reply to Patricia Nguyen’s value request.']
      ]
    },
    props: {
      label: 'Properties with Orbit', name: 'Properties', help: 'How can I help you manage properties?',
      chips: [
        ['Who owns 4512 Telegraph?', 'The Reyes Family Trust (Walnut Creek), with Teresa Reyes as secondary owner. They own 4 buildings; the last touch was a QR scan on Oct 29.'],
        ['Buildings with a maturing loan', '14 buildings in your ZIPs have a loan that matured or matures within 12 months. 9 have not been touched in 60+ days — the top one is 3120 Grand Ave.'],
        ['Find 2–4 units in 94610', '1,284 buildings with 2–4 units in 94610. 212 are absentee-owned and 61 are Tier A. Want me to save them as a list?'],
        ['Which buildings sold near my listings?', '4 sales within half a mile of your active listings in the last 60 days, led by 1040 59th St (2 units, $805k, 4 offers).', 'team']
      ],
      intro: 'Orbit knows every building in PLS — owners, loans, photos, nearby sales, signals, and the full touch history. On Properties it helps you find the right building fast and size it up before you call. Ask in plain language instead of stacking filters.',
      caps: [
        ['Find buildings', 'Describe what you are looking for and Orbit builds the search.', 'Show me absentee-owned 3-units in 94609 bought before 2010.'],
        ['Size up a building', 'Get a one-paragraph brief on a property before a call.', 'Give me a call brief on 4512 Telegraph Ave.'],
        ['Loan and signal watch', 'See which buildings have loans coming due or a possible ownership change.', 'Which of my Tier A buildings have a loan maturing in the next 12 months?'],
        ['Comps on demand', 'Pull the recent sales that matter for a specific building.', 'What are the best two comps for 3120 Grand Ave?']
      ]
    },
    owners: {
      label: 'Owners with Orbit', name: 'Owners', help: 'How can I help you with your owners?',
      chips: [
        ['Owners not touched in 60 days', '188 owners have not been touched in 60+ days. 22 are Tier A — the biggest is Haddad Properties LLC with 6 buildings.'],
        ['Who are my portfolio owners?', '41 owners hold 3+ buildings. Top three: Haddad Properties LLC (6), Grand Ave Holdings LLC (5), Reyes Family Trust (4).'],
        ['Draft an intro to this owner', 'Here is a draft: “Hi Teresa — I work with owners near Telegraph and noticed your loan matured this spring. Happy to share what similar buildings are trading for. Do you have 10 minutes this week?”'],
        ['Who on the team called this owner recently?', 'Marissa called this owner on Nov 6 (left a voicemail). No other touches in the last 60 days.', 'team']
      ],
      intro: 'Orbit sees each owner across all of their buildings — every call, mailing, reply, and visit in one history. On Owners it helps you understand the relationship and plan the right next touch. Ask about a person or a portfolio the way you would ask a colleague.',
      caps: [
        ['Relationship recap', 'Get the whole history with an owner in a few sentences.', 'Summarize everything we have done with the Reyes Family Trust.'],
        ['Portfolio owners', 'Find owners with several buildings so you treat them accordingly.', 'Which owners have 3+ buildings and no touch in 90 days?'],
        ['Contact check', 'Confirm whether you can reach someone, and how.', 'Can I call Linda Okafor, or is she on do-not-contact?'],
        ['Outreach drafts', 'Have Orbit write a call opener or email for a specific owner.', 'Write a short email to Haddad Properties about their 2027 loan.']
      ]
    },
    prospect: {
      label: 'Prospect with Orbit', name: 'Prospecting', help: 'How can I help you find your next deal?',
      chips: [
        ['Who should I call first?', 'Start with Alcatraz Partners. They replied to our letter this morning and asked about sales on Vernon, so they are expecting a call. Then call Helen Castillo, who scanned the QR code on our postcard yesterday.'],
        ['Loans maturing, untouched 60 days', '7 owners in your targets have a loan likely maturing within 12 months and no touch in 60+ days — 4 of them in 94611 (5+ units). Want them added to a call list?'],
        ['Tell me how to attack 94608 Emeryville border to prospect new sellers', 'Here’s a 3-step plan for 94608 Emeryville border:<ol><li><b>Start with the 38 owners whose loans likely come due in 2027.</b> Call the 22 Hot owners first.</li><li><b>Mail a Market update to the whole ZIP.</b> Lead with “nearly half of sales drew 3+ offers” and add a QR code.</li><li><b>Follow up with the 96 long-time owners within 10 days.</b> Offer a free BOV.</li></ol>Want me to build the step 1 call list now?', 'team'],
        ['Build a target → Build this list → Plan the campaign', 'Recipe started. Step 1, target: 5+ unit owners in 94611 with a signal and no touch in 60 days (23 owners). Step 2, list: saved as “94611 · 5+ units · signals”. Step 3, campaign: a Market update mailer, then calls within 5 days. Want me to open the campaign draft?', 'recipe']
      ],
      intro: 'Orbit ranks owners by fresh signals, time since last touch, and what your team has already done. On Prospecting it builds targets, picks who to call first, and gives you the market context for each call. Let it do the list-building so you can spend your time on the phone.',
      caps: [
        ['Build a target', 'Describe the segment you want to work and Orbit pulls the owners.', 'Build me a list of 2-unit owners in 94610 who have held 15+ years.'],
        ['Call order', 'Get today’s best calls ranked, with the reason for each.', 'Who are my top 5 calls today and why?'],
        ['Collision check', 'See who a teammate already reached so you do not double-dial.', 'Has anyone on the team called Haddad Properties this week?'],
        ['Talk tracks', 'Get a ready opener tied to the owner’s signal and their ZIP.', 'Give me an opener for an owner with a loan maturing in 94611.']
      ]
    },
    market: {
      label: 'Market with Orbit', name: 'Your Market', help: 'How can I help you read the market?',
      chips: [
        ['Where should I campaign next?', '94608 (Emeryville border): 45% of sales drew 3+ offers and 38 owners have loans due in 2027 with no recent touch. Suggested piece: Market update.'],
        ['What moved this week?', 'Rates fell 0.24 to 6.18% over four weeks, Oakland’s allowed rent increase rose to 2.3%, and a Piedmont Ave 12-unit set a 5.4% cap benchmark.'],
        ['Cap rates in 94611', 'Recent 5+ unit trades in 94611 averaged about a 5.6% cap; the Piedmont Ave 12-unit at 5.4% is the new low.'],
        ['Tell me how to attack 94608 Emeryville border to prospect new sellers', '', 'team']
      ],
      intro: 'Orbit reads sales, rents, loan patterns, and local news for the ZIPs you work. On Your Market it turns that data into where and when to campaign, and what to say. Ask about any ZIP instead of digging through charts.',
      caps: [
        ['Where to campaign', 'Get a ranked recommendation with the reason behind it.', 'Which ZIP should I campaign in next, and with which piece?'],
        ['ZIP brief', 'Get a plain-language read on any ZIP for a call or a listing pitch.', 'Give me a 30-second market brief on 94609.'],
        ['Trend check', 'See how a ZIP has moved over time.', 'How have 2–4 unit prices in 94610 changed over the last year?'],
        ['Pricing support', 'Back up a value conversation with numbers.', 'What is a fair price per unit for a 4-unit in Temescal right now?']
      ]
    },
    news: {
      label: 'News with Orbit', name: 'Latest News', help: 'How can I help you with this week’s news?',
      chips: [
        ['Summarize this week', 'Three things matter: rates are easing (6.18%), Oakland’s allowed rent increase is 2.3%, and the soft-story retrofit deadline moved out 12 months.'],
        ['What affects my owners?', 'The retrofit extension touches 37 of your 5+ unit owners, and the new ADU law is relevant to 212 duplex and triplex owners in your targets.'],
        ['Give me a talk track', '“Rates have come down and buyers are back — and with the new ADU rules, your building may be worth more than you think. Want a quick number?”'],
        ['Which of my owners does the retrofit deadline affect?', 'About 37 owners in your targets own soft-story buildings built before 1978. 12 of them have no touch in 90 days — want a call list?', 'team']
      ],
      intro: 'Orbit tracks the news that touches your market — rates, local rules, state law, and national CRE trends. On Latest News it connects each story to your owners and turns it into something to say on the phone. Ask what a story means for your business, not just what it says.',
      caps: [
        ['Weekly summary', 'Get the few stories that matter this week in plain language.', 'What are the 3 news items I should know before calls today?'],
        ['Owner impact', 'See which of your owners a story actually affects.', 'Which of my owners are affected by the new retrofit deadline?'],
        ['Talk tracks', 'Turn a headline into an opener.', 'Write an opener using the new ADU law for a duplex owner.'],
        ['Content ideas', 'Turn news into a mailing or email idea.', 'Suggest a postcard headline based on this week’s rate news.']
      ]
    },
    team: {
      label: 'Team Insights with Orbit', name: 'Your Team', help: 'How can I help you with your team?',
      chips: [
        ['Who is top this month?', 'Marissa Chen leads with 412 touches in 30 days — 68 ahead of David Weglarz. She is also first on appointments (9).'],
        ['Are we on pace?', 'No — 412 of 500 calls this week, 88 behind. At the current daily rate the team finishes around 470.'],
        ['Compare to last campaign', 'Loan maturity · Telegraph is ahead of Just Listed · 3310 Grand on connects (41 vs 29) but behind on appointments (3 vs 5).'],
        ['Who is using Orbit the most?', 'Over the last 30 days: Marissa asked Orbit 142 questions and built 6 targets; David 58; Nolan 31; Edson 9.', 'team']
      ],
      intro: 'Orbit sees every touch, call, and campaign result your team logs. It turns that activity into a read on who is working, what is working, and where the team is falling behind. Ask it in plain language instead of building a report.',
      caps: [
        ['AI adoption', 'Learn how the team is using AI in their prospecting.', 'Tell me which members of my team are using Orbit the most and least in their prospecting.'],
        ['Pace check', 'See whether the team is on track for this week’s call goal and who is driving the gap.', 'Are we on pace this week, and who is furthest behind?'],
        ['Coaching', 'Spot reps with lots of calls but few connects or appointments.', 'Who has the most calls but the lowest connect rate this month?'],
        ['Campaign comparison', 'Compare the current campaign to past ones on the numbers that matter.', 'How does this campaign compare to Just Listed · 3310 Grand on appointments?']
      ]
    },
    lists: {
      label: 'Lists with Orbit', name: 'Owner lists', help: 'How can I help you build a list?',
      chips: [
        ['Build a list of absentee owners', 'Built: absentee owners of 2–4 units in 94609–94610 — 318 owners, 41 with a signal. Want to save it as “Absentee 94609–10”?'],
        ['Who is on do-not-contact?', '62 owners are on do-not-contact: 38 mail only, 17 email only, 7 all channels. 3 were added this week.'],
        ['Clean duplicates', 'I found 9 likely duplicate owners, like “Reyes Family Trust” and “Reyes Family Tr”. Want to review them for merging?'],
        ['Owners with a loan due in 2027', '38 owners on your lists have a loan likely due in 2027, mostly in 94608 and 94609. Want them saved as a list?', 'team']
      ],
      intro: 'Orbit knows who is in every list, who is suppressed, and who overlaps across lists. On Owner lists it helps you build clean audiences fast and keep do-not-contact honored. Describe the audience you want and let Orbit assemble it.',
      caps: [
        ['Build a list', 'Describe the audience in plain words.', 'Make a list of out-of-state owners with 3+ units in Oakland.'],
        ['Clean up', 'Find duplicates and stale records before a send.', 'Are there duplicate owners on my Temescal list?'],
        ['Suppression check', 'Make sure a list respects do-not-contact.', 'How many people on this list are on do-not-contact?'],
        ['Overlap', 'See where lists overlap so owners do not get hit twice.', 'Which owners are on both of my 94610 lists?']
      ]
    },
    campaigns: {
      label: 'Campaigns with Orbit', name: 'Campaigns', help: 'How can I help you run this campaign?',
      chips: [
        ['How is this campaign doing?', 'Loan maturity · Telegraph: 423 mailed, 14 replies or scans, 41 connects, 3 appointments. Calls are 88 behind this week’s pace.'],
        ['Who has not been called?', '225 owners on this campaign have not been called yet. 31 have a fresh signal — start with Haddad Properties and 1840 Park LLC.'],
        ['Suggest the next piece', 'A follow-up Market update to non-responders in 94609, about 3 weeks after the first letter landed.'],
        ['Summarize this campaign’s results', 'Telegraph corridor: 423 mailed, 14 replies and scans, 41 connects, 3 appointments and 2 BOVs so far. Calls are the gap: 225 still to make.', 'team']
      ],
      intro: 'Orbit follows each campaign from list to mailing to calls to appointments. On Campaigns it tells you how a campaign is really doing and what to do next. Ask about results or next steps instead of reading every tab.',
      caps: [
        ['Campaign health', 'Get a quick read on results so far.', 'How is the loan maturity campaign performing against the last one?'],
        ['Call gaps', 'Find owners who got the piece but no call.', 'Who received the MVI letter but has not been called?'],
        ['Next touch', 'Get a recommendation for the follow-up.', 'What should the second touch be for owners who did not respond?'],
        ['Spend check', 'See what a campaign costs per appointment.', 'What is our cost per appointment on this campaign?']
      ]
    },
    mail: {
      label: 'Mailings with Orbit', name: 'Mailings', help: 'How can I help you with your mailings?',
      chips: [
        ['Draft a Just Sold postcard', 'Headline: “Just sold near you — 2 offers over ask.” Body: a short note on the 3310 Grand sale and an invitation to get a value. Want me to drop it into a new asset?'],
        ['What is ready to send?', '1 mailing is waiting for approval: MVI letter · follow-up · Nov 2026 (211 pieces, $1,287). Nothing else is queued.'],
        ['Cost to mail this list', 'Mailing 231 letters runs about $1,410 at current rates — roughly $6.10 a piece including postage.'],
        ['What angle works best for my team?', 'Loan decision letters have done best for your team (4.1% response over 3 runs). Just Sold postcards lead in West Berkeley.', 'team']
      ],
      intro: 'Orbit knows your templates, your brand, your lists, and what each piece costs. On Mailings it helps you draft copy, check what is ready, and estimate cost before you send. Ask for a draft or a number instead of building it by hand.',
      caps: [
        ['Draft copy', 'Get headline and body copy for any piece.', 'Write a Just Listed postcard for 3310 Grand Ave.'],
        ['Send readiness', 'See what is waiting on approval or blocked.', 'Is anything waiting on my approval?'],
        ['Cost estimate', 'Know the cost before you commit.', 'How much to send a flyer to my 94610 list?'],
        ['Results', 'See how a piece performed after it went out.', 'How many QR scans did the October MVI letter get?']
      ]
    },
    calls: {
      label: 'Calls with Orbit', name: 'Calls', help: 'How can I help you with your calls?',
      chips: [
        ['Who is next in the queue?', 'Next up: Haddad Properties LLC (3120 Grand Ave) — loan maturing in 58 days. Note: Marissa called them 2 days ago, no answer.'],
        ['Today’s appointments', '2 today: Reyes Family Trust at 11:00 (callback) and a walk-through at 1840 Park Blvd at 3:30.'],
        ['A good opener for this owner', '“Hi, this is Nolan with Prescott — I am calling owners near Grand Ave whose loans are coming due. Have you thought about what is next for the building?”'],
        ['When should I call LLC owners?', 'Your LLC owners pick up most between 10 am and noon. Individual owners answer best after 4 pm.', 'team']
      ],
      intro: 'Orbit knows your call queue, each owner’s history, and what was said last time. On Calls it gets you ready for the next conversation and keeps the queue moving. Ask for the next call, an opener, or a recap without leaving the screen.',
      caps: [
        ['Next call', 'Get the next owner with the reason they are up.', 'Who should I call next and why?'],
        ['Pre-call brief', 'Get the history and context before you dial.', 'What happened the last time we talked to Alcatraz Partners?'],
        ['Openers', 'Get a short opener tied to the owner’s signal.', 'Give me an opener for an owner who just scanned our QR code.'],
        ['Recap and log', 'Turn your notes into a clean touch log.', 'Log this: talked to Teresa, call back Friday about 4512 Telegraph.']
      ]
    }
  };

  function areaFor(file) {
    var f = (file || '').replace(/\.html$/, '');
    if (/^(Settings_|DataMgmt_|Learning_)/.test(f)) return 'admin';
    var map = {
      Dashboard: 'dash', index: 'dash',
      Properties: 'props', Property_Detail: 'props', Add_Property: 'props',
      Owners: 'owners', Owner_Detail: 'owners',
      Prospecting: 'prospect',
      Market_by_ZIP: 'market', ZIP_Detail: 'market',
      Latest_News: 'news', Your_Team: 'team',
      Owner_Lists: 'lists', List_Detail: 'lists', New_List: 'lists', Edit_List: 'lists', Do_Not_Contact: 'lists',
      Calls: 'calls', Appointments: 'calls'
    };
    if (map[f]) return map[f];
    if (/^Campaign/.test(f)) return 'campaigns';
    if (/^(Mailing|Mailings|Proof|Template|Partner_Ads|Current_Listings|Import_From_Tracker|Asset|Send_|Run_)/.test(f)) return 'mail';
    return 'dash';
  }
  var FILE = (location.pathname.split('/').pop() || 'index.html');
  var AREA_KEY = areaFor(FILE);
  var IS_ADMIN = AREA_KEY === 'admin';
  var A = AREAS[IS_ADMIN ? 'dash' : AREA_KEY];

  /* ---------- Styles ---------- */
  var CSS = `
  .rail nav{flex:1 1 auto!important;min-height:0;overflow-y:auto}.rail .user{flex:0 0 auto}.rail .tenant{flex:0 0 auto}
  .orbit-float{position:fixed;top:12px;right:20px;z-index:800;display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:13px;font-weight:600;
    padding:8px 14px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:999px;cursor:pointer;box-shadow:0 4px 14px rgba(45,46,65,.28)}
  .orbit-float:hover{background:#3b3c54}
  .orbit-float svg{width:15px;height:15px}
  .orbit-float.hide{opacity:0;pointer-events:none}
  .topbar .actions{margin-right:var(--orbit-gap,0)}
  .orbit-ov{position:fixed;inset:0;background:rgba(20,20,22,.28);opacity:0;visibility:hidden;transition:opacity .22s;z-index:900}
  .orbit-ov.on{opacity:1;visibility:visible}
  .orbit-panel{position:fixed;top:0;right:0;height:100vh;width:400px;max-width:92vw;background:#fff;border-left:1px solid #D3D0CB;
    box-shadow:-8px 0 28px rgba(0,0,0,.12);transform:translateX(100%);transition:transform .26s ease;z-index:901;display:flex;flex-direction:column}
  .orbit-panel.on{transform:translateX(0)}
  .orbit-head{display:flex;align-items:flex-start;gap:10px;padding:14px 16px 10px;border-bottom:1px solid #E6E3DE}
  .orbit-head .t{font-weight:600;display:flex;align-items:center;gap:8px}
  .orbit-head .t svg{width:16px;height:16px}
  .orbit-head .sub{font-size:11.5px;color:#6B6A66;margin-top:2px}
  .orbit-help{margin-top:7px;font:inherit;font-size:11.5px;color:#2D2E41;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:999px;padding:3px 10px;cursor:pointer}
  .orbit-help:hover{background:#E8E6F7}
  .orbit-x{margin-left:auto;background:none;border:none;font-size:20px;color:#6B6A66;cursor:pointer;line-height:1;padding:2px 6px}
  .orbit-x:hover{color:#1E1E1E}
  .orbit-ctx{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px 0}
  .orbit-ctx:empty{display:none}
  .orbit-ctx .c{font-size:11.5px;border:1px solid #B5B2AC;background:#F7F6F3;color:#1E1E1E;border-radius:999px;padding:2px 9px}
  .orbit-log{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px}
  .orbit-msg{max-width:86%;padding:8px 11px;border-radius:12px;font-size:13px;line-height:1.5}
  .orbit-msg.u{align-self:flex-end;background:#2D2E41;color:#fff;border-bottom-right-radius:3px}
  .orbit-msg ol{margin:6px 0 4px;padding-left:18px}.orbit-msg ol li{margin-bottom:7px}.orbit-msg .pl-h{font-weight:600;margin-bottom:2px}
  .orbit-msg.a{align-self:flex-start;background:#F0EEEA;color:#1E1E1E;border-bottom-left-radius:3px}
  .orbit-sugg{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:0 16px 12px}
  .orbit-sugg .lbl{font-size:11px;color:#6B6A66;text-transform:uppercase;letter-spacing:.05em}
  .orbit-sugg button{font:inherit;font-size:12px;border:1px solid #B5B2AC;background:#fff;color:#2D2E41;border-radius:999px;padding:4px 11px;cursor:pointer;text-align:left}
  .orbit-sugg .st{font-size:10px;color:#6B6A66;border:1px solid #D3D0CB;border-radius:8px;padding:0 5px;margin-left:4px;white-space:nowrap}.orbit-sugg .st.rc{color:#2D2E41;border-color:#2D2E41}
  .orbit-sugg button.k-recipe{border-color:#2D2E41;background:#EEF1FA}
  .orbit-sugg button:hover{background:#F7F6F3}
  .orbit-plans{padding-bottom:6px}.orbit-plans button.k-plan{border-color:#2D2E41;background:#F2F1FA;font-weight:500}
  .orbit-in{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #E6E3DE}
  .orbit-in input{flex:1;font:inherit;font-size:13px;padding:8px 10px;border:1px solid #B5B2AC;border-radius:6px}
  .orbit-in button{font:inherit;font-size:13px;font-weight:600;padding:8px 13px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:6px;cursor:pointer}
  .orbit-cap p.i{font-size:13.5px;line-height:1.6;margin:0 0 14px}
  .orbit-cap ul{margin:0;padding:0;list-style:none}
  .orbit-cap li{border:1px solid #E6E3DE;border-radius:6px;padding:10px 12px;margin-bottom:8px;font-size:13px;line-height:1.5}
  .orbit-cap li b{display:block;margin-bottom:2px}
  .orbit-cap .pr{display:inline-block;margin-top:6px;font:inherit;font-size:12px;color:#2D2E41;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:6px;padding:4px 9px;cursor:pointer;text-align:left}
  .orbit-cap .pr:hover{background:#E8E6F7}
  .om-ov{position:fixed;inset:0;background:rgba(20,20,22,.4);opacity:0;visibility:hidden;transition:opacity .18s;z-index:950;display:flex;align-items:flex-start;justify-content:center;padding:48px 16px;overflow-y:auto}
  .om-ov.on{opacity:1;visibility:visible}
  .om{background:#fff;border:1px solid #D3D0CB;border-radius:6px;box-shadow:0 20px 50px rgba(0,0,0,.2);width:720px;max-width:100%;transform:translateY(-8px);transition:transform .18s}
  .om-ov.on .om{transform:translateY(0)}
  .om-head{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #E6E3DE}
  .om-head .t{font-weight:600;font-size:15px}
  .om-x{margin-left:auto;background:none;border:none;font-size:18px;color:#6B6A66;cursor:pointer;padding:2px 6px}
  .om-body{padding:16px 18px}
  .om-foot{display:flex;gap:10px;justify-content:flex-end;padding:12px 18px;border-top:1px solid #E6E3DE}
  @media(max-width:520px){.orbit-panel{width:100vw;max-width:100vw}.orbit-float{top:8px;right:12px}}
  `;
  var SPARK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 14l.9 2.6L22.5 17l-2.6.9L19 20.5l-.9-2.6L15.5 17l2.6-.9L19 14z"/></svg>';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ---------- Saved attack plans (written by the How To Attack This modal) ---------- */
  var PKEY = 'pls.orbitPlans';
  function loadPlans() { var ps; try { ps = JSON.parse(localStorage.getItem(PKEY) || '[]'); } catch (e) { ps = window.__orbitPlans || []; } ps.forEach(function (p) { p.name = p.name.replace(/^Pederson - /, 'Nolan - '); }); return ps; }
  window.orbitLoadPlans = loadPlans;
  window.orbitSavePlan = function (p) {
    var ps = loadPlans().filter(function (x) { return x.name !== p.name; }); ps.unshift(p);
    try { localStorage.setItem(PKEY, JSON.stringify(ps)); } catch (e) { window.__orbitPlans = ps; }
    renderPlanChips();
  };
  window.orbitPlanOutline = function (p) {
    return '<div class="pl-h">' + esc(p.name) + '</div><div style="font-size:11.5px;color:#6B6A66;margin-bottom:6px">Saved ' + esc(p.saved || '') + ' · ' + esc(p.zip + ' ' + p.area) + '</div>' +
      '<div><b>Goal.</b> ' + p.goal + '</div><ol>' + p.steps.map(function (st) {
        return '<li><b>' + st.t + '</b>' + (st.when ? ' <span style="color:#6B6A66">(' + st.when + ')</span>' : '') + (st.who ? '<br>' + st.who : (st.body ? '<br>' + st.body : '')) + '</li>';
      }).join('') + '</ol><div><b>What to track.</b> ' + p.track + '</div><div style="margin-top:8px">Ask me to expand any step, or tell me what you’ve done so far and I’ll mark it.</div>';
  };
  function planFor(q) {
    var ql = (q || '').toLowerCase(), ps = loadPlans();
    var hit = ps.filter(function (p) { return ql.indexOf(p.name.toLowerCase()) > -1 || (ql.indexOf(p.zip) > -1 && ql.indexOf('plan') > -1); })[0];
    if (!hit && /\b(attack )?plans?\b/.test(ql) && /(my|saved|attack|the) /.test(ql)) {
      if (ps.length === 1) hit = ps[0];
      else if (ps.length > 1) return 'You have ' + ps.length + ' saved plans: ' + ps.map(function (p) { return '<b>' + esc(p.name) + '</b>'; }).join(', ') + '. Which one do you want?';
      else return 'You don’t have a saved attack plan yet. Open Your Market, pick a ZIP and press <b>How To Attack This</b>. I’ll save the plan so you can pull it up here from any screen.';
    }
    return hit ? window.orbitPlanOutline(hit) : null;
  }
  var plansEl = null;
  function renderPlanChips() {
    if (!plansEl) return;
    var ps = loadPlans(); plansEl.innerHTML = '';
    if (!ps.length) { plansEl.style.display = 'none'; return; }
    plansEl.style.display = '';
    plansEl.appendChild(el('span', 'lbl', 'Your saved plans'));
    ps.forEach(function (p) { var b = el('button', 'k-plan', '▤ ' + esc(p.name)); b.onclick = function () { ask(p.name); }; plansEl.appendChild(b); });
  }

  /* ---------- Answers ---------- */
  function answerFor(q) {
    var pl = planFor(q); if (pl) return pl;
    if (typeof window.orbitAnswer === 'function') { var pa = window.orbitAnswer(q); if (pa) return pa; }
    var ql = (q || '').toLowerCase().trim();
    for (var i = 0; i < A.chips.length; i++) { if (A.chips[i][0].toLowerCase() === ql) return A.chips[i][1]; }
    if (ql.indexOf('call first') > -1 || ql.indexOf('who should') > -1 || ql.indexOf('call next') > -1) return 'Your strongest call right now is Haddad Properties LLC (3120 Grand Ave) — loan maturing within 60 days and no touch in 74 days. Then 1840 Park LLC (held 19 years, never contacted).';
    if (ql.indexOf('matur') > -1 || ql.indexOf('loan') > -1) return '7 owners in your targets have a loan likely maturing within 12 months and no touch in 60+ days — 4 of them in 94611. Want them added to a call list?';
    if (ql.indexOf('orbit the most') > -1 || ql.indexOf('using orbit') > -1) return 'Over the last 30 days: Marissa asked Orbit 142 questions and built 6 targets; David 58; Nolan 31; Edson 9. Edson is the lightest user — mostly lookups, no target building yet.';
    if (ql.indexOf('talk track') > -1 || ql.indexOf('opener') > -1) return '“Buyers are competing for buildings like yours — 45% of nearby sales drew 3+ offers. Have you thought about what yours would bring?”';
    if (ql.indexOf('team') > -1 || ql.indexOf('pace') > -1) return 'The team is at 412 of 500 calls this week — 88 behind. Marissa is on pace; David is about 40 short.';
    if (ql.indexOf('market') > -1 || ql.indexOf('zip') > -1 || ql.indexOf('comp') > -1) return 'In 94610 (2-unit): about $512k per unit, 24 days on market, sales up 6% vs last quarter. In 94611 (5+ unit): about $291k per unit, 61 days, flat.';
    return 'Here is what I found for “' + esc(q) + '”. In the live product I would pull this from your PLS data — in this demo, try one of the suggested questions to see a full answer.';
  }

  var logEl, inEl, panelEl, ovEl, floatEl;
  function addMsg(cls, html) { var m = el('div', 'orbit-msg ' + cls, html); logEl.appendChild(m); logEl.scrollTop = logEl.scrollHeight; }
  function ask(q, top) { if (!q) { q = inEl.value.trim(); if (!q) return; } addMsg('u', esc(q)); var um = logEl.lastChild; inEl.value = ''; var a = answerFor(q); setTimeout(function () { addMsg('a', a); if (top) logEl.scrollTop = Math.max(0, um.offsetTop - logEl.offsetTop - 8); }, 280); }

  function showHelp() {
    var b = '<div class="orbit-cap"><p class="i">' + A.intro + '</p><ul>' + A.caps.map(function (c, i) {
      return '<li><b>' + c[0] + '</b>' + c[1] + '<br><button class="pr" onclick="__orbitTry(' + i + ')">Try: “' + c[2] + '”</button></li>';
    }).join('') + '</ul></div>';
    window.openModal('What can I do with Orbit? · ' + A.name, b, '<button class="btn" onclick="closeModal()">Close</button>');
  }
  window.__orbitTry = function (i) { window.closeModal(); if (!panelEl.classList.contains('on')) window.openOrbit(); ask(A.caps[i][2]); };

  function buildModal() {
    var mov = el('div', 'om-ov'); mov.id = 'om-ov';
    mov.onclick = function (e) { if (e.target === mov) window.closeModal(); };
    mov.innerHTML = '<div class="om"><div class="om-head"><span class="t" id="om-title"></span><button class="om-x" onclick="closeModal()">&times;</button></div><div class="om-body" id="om-body"></div><div class="om-foot" id="om-foot"></div></div>';
    document.body.appendChild(mov);
  }

  function buildOrbit() {
    floatEl = el('button', 'orbit-float', SPARK + esc(A.label));
    floatEl.onclick = function () { window.openOrbit(); };
    document.body.appendChild(floatEl);
    // keep topbar action buttons clear of the floating button
    document.documentElement.style.setProperty('--orbit-gap', (floatEl.offsetWidth + 24) + 'px');

    ovEl = el('div', 'orbit-ov'); ovEl.onclick = window.closeOrbit;
    panelEl = el('div', 'orbit-panel');
    var head = el('div', 'orbit-head', '<div><div class="t">' + SPARK + 'Orbit</div><div class="sub">Your copilot for ' + esc(A.name) + '</div></div>');
    var help = el('button', 'orbit-help', 'What can I do with Orbit?'); help.onclick = showHelp; head.firstChild.appendChild(help);
    var x = el('button', 'orbit-x', '&rsaquo;'); x.title = 'Close'; x.onclick = window.closeOrbit; head.appendChild(x);
    panelEl.appendChild(head);
    var ctx = el('div', 'orbit-ctx'); ctx.id = 'orbit-ctx'; panelEl.appendChild(ctx);
    logEl = el('div', 'orbit-log'); panelEl.appendChild(logEl);
    plansEl = el('div', 'orbit-sugg orbit-plans'); panelEl.appendChild(plansEl);
    var sugg = el('div', 'orbit-sugg'); sugg.appendChild(el('span', 'lbl', 'Try asking'));
    A.chips.forEach(function (c) { var tag = c[2] === 'team' ? ' <span class="st">Popular with your team</span>' : (c[2] === 'recipe' ? ' <span class="st rc">Recipe</span>' : ''); var b = el('button', c[2] ? 'k-' + c[2] : null, (c[2] === 'recipe' ? '↻ ' : '') + esc(c[0]) + tag); b.onclick = function () { ask(c[0]); }; sugg.appendChild(b); });
    panelEl.appendChild(sugg);
    var inWrap = el('div', 'orbit-in');
    inEl = el('input'); inEl.type = 'text'; inEl.placeholder = 'Ask Orbit about ' + A.name.toLowerCase() + '…';
    inEl.onkeydown = function (e) { if (e.key === 'Enter') ask(); };
    var go = el('button', null, 'Ask'); go.onclick = function () { ask(); };
    inWrap.appendChild(inEl); inWrap.appendChild(go); panelEl.appendChild(inWrap);
    document.body.appendChild(ovEl); document.body.appendChild(panelEl);
  }

  window.openOrbit = function (ctxChips, seed, opts) {
    opts = opts || {};
    if (IS_ADMIN || !panelEl) return;
    var ctx = document.getElementById('orbit-ctx'); ctx.innerHTML = '';
    if (ctxChips && ctxChips.length) ctxChips.forEach(function (c) { ctx.appendChild(el('span', 'c', esc(c))); });
    if (!logEl.dataset.greeted && !opts.noGreet) {
      addMsg('a', 'Hi Nolan — welcome to Orbit.');
      addMsg('a', A.help);
      logEl.dataset.greeted = '1';
    }
    renderPlanChips();
    if (seed) ask(seed, opts.top);
    ovEl.classList.add('on'); panelEl.classList.add('on'); floatEl.classList.add('hide');
    setTimeout(function () { inEl.focus(); }, 300);
  };
  window.closeOrbit = function () { if (!panelEl) return; ovEl.classList.remove('on'); panelEl.classList.remove('on'); floatEl.classList.remove('hide'); };
  window.openModal = function (title, bodyHTML, footHTML) {
    document.getElementById('om-title').textContent = title || '';
    document.getElementById('om-body').innerHTML = bodyHTML || '';
    document.getElementById('om-foot').innerHTML = footHTML || '<button class="btn" onclick="closeModal()">Close</button>';
    document.getElementById('om-ov').classList.add('on');
  };
  window.closeModal = function () { document.getElementById('om-ov').classList.remove('on'); };

  function init() {
    var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
    buildModal();
    if (!IS_ADMIN) buildOrbit();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
