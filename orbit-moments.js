/* Orbit moments (Orbit AI PRD v0.4): explicit, button-started Orbit flows that open in a modal.
   1. Use Orbit inside Log a touch: speak or type a debrief, Orbit asks only what is missing,
      then returns the filled form plus "Orbit also found" items on one bundled card (Save all).
   2. Attack Brief: a pre-call brief already written in an Orbit chat, with follow-up questions.
   Loads after orbit.js and modals.js. Pages set window.ORBIT_PAGE = {brief:'key', debrief:'key'}. */
(function () {
  var CSS = `
  .om{width:760px}
  .ob-sec{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0;border-color:#2D2E41!important;color:#2D2E41!important;font-weight:500}
  .ob-sec:hover{background:#F2F1FA!important}
  .ob-sm{font:inherit;font-size:12px;padding:3px 9px;border:1px solid #2D2E41;background:#fff;color:#2D2E41;border-radius:999px;cursor:pointer;white-space:nowrap}
  .ob-sm:hover{background:#F2F1FA}
  .uo-strip{display:flex;align-items:center;gap:12px;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:6px;padding:10px 12px;margin:0 0 14px}
  .uo-strip .tx{flex:1;font-size:12.5px;line-height:1.45;color:#1E1E1E}
  .uo-strip .tx b{display:block;font-size:13px;color:#2D2E41}
  .uo-strip button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:999px;cursor:pointer;white-space:nowrap}
  .uo-strip.pulse{animation:uoP 1.1s ease 3}
  @keyframes uoP{0%,100%{box-shadow:0 0 0 0 rgba(45,46,65,0)}50%{box-shadow:0 0 0 5px rgba(45,46,65,.18)}}
  .ox-log{display:flex;flex-direction:column;gap:10px}
  .ox-msg{max-width:88%;padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.55}
  .ox-msg.a{align-self:flex-start;background:#F0EEEA;border-bottom-left-radius:3px}
  .ox-msg.u{align-self:flex-end;background:#2D2E41;color:#fff;border-bottom-right-radius:3px}
  .ox-who{font-size:11px;color:#6B6A66;display:flex;align-items:center;gap:5px;margin-bottom:-4px}
  .ox-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start}
  .ox-chips button{font:inherit;font-size:12px;border:1px solid #2D2E41;background:#fff;color:#2D2E41;border-radius:999px;padding:5px 12px;cursor:pointer}
  .ox-chips button:hover{background:#F2F1FA}
  .ox-in{display:flex;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid #E6E3DE}
  .ox-in input{flex:1;font:inherit;font-size:13px;padding:8px 10px;border:1px solid #B5B2AC;border-radius:6px;max-width:none}
  .ox-in button{font:inherit;font-size:13px;font-weight:600;padding:8px 13px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:6px;cursor:pointer}
  .ox-sugg{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-top:12px}
  .ox-sugg .lbl{font-size:11px;color:#6B6A66;text-transform:uppercase;letter-spacing:.05em}
  .ox-sugg button{font:inherit;font-size:12px;border:1px solid #B5B2AC;background:#fff;color:#2D2E41;border-radius:999px;padding:4px 11px;cursor:pointer;text-align:left}
  .ox-sugg button:hover{background:#F7F6F3}
  .br{background:#fff;border:1px solid #E6E3DE;border-radius:8px;padding:12px 14px;margin-top:6px}
  .br h4{margin:0 0 2px;font-size:14px}
  .br .ct{font-size:12px;color:#6B6A66;margin-bottom:8px}
  .br dl{margin:0;display:grid;grid-template-columns:118px 1fr;gap:7px 12px;font-size:12.5px;line-height:1.5}
  .br dt{color:#6B6A66;font-weight:500}
  .br dd{margin:0}
  .br .op{margin-top:10px;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:6px;padding:9px 11px;font-size:13px;line-height:1.5}
  .br .op b{display:block;font-size:11px;color:#2D2E41;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}
  .br .wf{margin-top:8px;font-size:12px;color:#8A6500}
  .br .src{margin-top:8px;font-size:11px;color:#6B6A66}
  .cap{display:flex;flex-direction:column;align-items:center;gap:10px;margin:14px 0 4px}
  .mic{width:76px;height:76px;border-radius:50%;border:none;background:#2D2E41;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;position:relative}
  .mic svg{width:30px;height:30px}
  .mic.on::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:3px solid rgba(45,46,65,.35);animation:mp 1.2s ease-out infinite}
  .mic.on{background:#B03A2E}
  @keyframes mp{0%{transform:scale(.9);opacity:1}100%{transform:scale(1.25);opacity:0}}
  .cap .st{font-size:12.5px;color:#6B6A66}
  .tr{width:100%;min-height:64px;background:#F7F6F3;border:1px dashed #B5B2AC;border-radius:6px;padding:10px 12px;font-size:13px;line-height:1.55;color:#1E1E1E}
  .tr:empty::before{content:"Your words appear here as you talk.";color:#9A9892}
  .tr .caret{display:inline-block;width:7px;height:14px;background:#2D2E41;vertical-align:-2px;margin-left:2px;animation:bl 1s steps(1) infinite}
  @keyframes bl{50%{opacity:0}}
  .lk{font:inherit;font-size:12.5px;background:none;border:none;color:#2D2E41;text-decoration:underline;cursor:pointer;padding:0}
  .typ{width:100%;display:none}
  .typ textarea{width:100%;max-width:none;font:inherit;font-size:13px;padding:8px 10px;border:1px solid #B5B2AC;border-radius:4px}
  .rv-note{background:#F2F1FA;border:1px solid #D6D4EA;border-radius:6px;padding:8px 11px;font-size:12.5px;margin-bottom:14px;line-height:1.45}
  .rv-h{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#6B6A66;margin:14px 0 8px;display:flex;align-items:center;gap:8px}
  .rv-h:first-of-type{margin-top:0}
  .rv-form{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
  .rv-form .field{margin-bottom:12px}
  .rv-form .full{grid-column:1/-1}
  .rv-form select,.rv-form input,.rv-form textarea{max-width:none}
  .of{font-size:10.5px;color:#2D2E41;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:8px;padding:0 6px;margin-left:6px;vertical-align:1px;white-space:nowrap}
  .filled{background:#FAFAFE!important;border-color:#A9A6D6!important}
  .it{display:flex;gap:10px;align-items:flex-start;border:1px solid #D3D0CB;border-radius:6px;padding:10px 12px;margin-bottom:8px;background:#fff}
  .it input[type=checkbox]{width:16px;height:16px;margin:2px 0 0;flex:0 0 16px;accent-color:#2D2E41}
  .it .bd{flex:1;font-size:13px;line-height:1.45}
  .it .bd b{display:block}
  .it .bd .d{color:#1E1E1E}
  .it .bd .m{font-size:12px;color:#6B6A66;margin-top:2px}
  .it .ed{font-size:12px;color:#2D2E41;text-decoration:underline;cursor:pointer;background:none;border:none;font-family:inherit}
  .it .edw{display:none;gap:8px;margin-top:8px;flex-wrap:wrap}
  .it .edw input,.it .edw select{width:auto;max-width:200px}
  .it.off{opacity:.55}
  .it.dnc{border-color:#B03A2E;background:#FDF5F4}
  .it.dnc b{color:#B03A2E}
  .tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
  .tags span{font-size:11px;border:1px solid #B5B2AC;border-radius:10px;padding:0 7px;color:#6B6A66;background:#fff}
  .trx{display:none;margin-top:6px;font-size:12px;color:#6B6A66;background:#F7F6F3;border-left:3px solid #D3D0CB;padding:6px 10px;line-height:1.5}
  .om-foot .lft{margin-right:auto}
  li.new{background:#F7F7FD;animation:nw 2.4s ease}
  @keyframes nw{0%{background:#E6E4F7}100%{background:#F7F7FD}}
  .pc{background:#fff;border:1px solid #E6E3DE;border-radius:8px;padding:14px 16px;margin-top:6px}
  .pc .pch{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .pc h4{margin:0;font-size:15px}
  .pc .sv{font-size:11px;color:#2E7D4F;border:1px solid #2E7D4F;border-radius:10px;padding:0 8px;background:#fff}
  .pc .sub{font-size:12px;color:#6B6A66;margin:3px 0 10px}
  .pc .gl{font-size:13px;line-height:1.55;margin-bottom:6px}
  .pc .gl b{color:#2D2E41}
  .ps{display:grid;grid-template-columns:28px 1fr;gap:4px 10px;border-top:1px solid #E6E3DE;padding:12px 0 4px}
  .ps .n{width:24px;height:24px;border-radius:50%;background:#2D2E41;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center}
  .ps .tt{font-weight:600;font-size:13.5px;line-height:1.4}
  .ps .wh{display:inline-block;font-size:11px;font-weight:500;color:#2D2E41;background:#F2F1FA;border:1px solid #D6D4EA;border-radius:10px;padding:0 8px;margin-left:6px;vertical-align:1px;white-space:nowrap}
  .ps dl{grid-column:2;margin:4px 0 0;display:grid;grid-template-columns:86px 1fr;gap:4px 10px;font-size:12.5px;line-height:1.5}
  .ps dt{color:#6B6A66}.ps dd{margin:0}
  .ps .bd{grid-column:2;font-size:12.5px;line-height:1.5}
  .ps.new{background:#F7F7FD}
  .fn{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border:1px solid #E6E3DE;border-radius:6px;margin:8px 0 10px;background:#fff}
  .fn div{padding:8px 10px;border-right:1px solid #E6E3DE}.fn div:last-child{border-right:0}
  .fn b{display:block;font-size:17px}.fn span{display:block;font-size:11.5px;color:#6B6A66;line-height:1.35}
  .br ul{margin:4px 0 0;padding-left:18px;font-size:12.5px;line-height:1.55}.br ul li{margin-bottom:3px}
  .br .sh{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#6B6A66;margin:12px 0 2px}
  .thm{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.thm span{font-size:12px;border:1px solid #D3D0CB;border-radius:12px;padding:2px 10px;background:#fff}.thm b{margin-left:4px}
  .ob-toast{position:fixed;bottom:40px;right:20px;background:#1E1E1E;color:#fff;padding:10px 14px;font-size:12px;border-radius:2px;z-index:999;opacity:0;transition:opacity .2s;pointer-events:none}
  .ob-toast.on{opacity:1}
  `;
  var MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  var NOW = { date: '2026-11-13', time: '13:05', label: 'Nov 13, 2026 1:05 PM' };

  /* ---------------- Brief data ---------------- */
  var BRIEFS = {
    reyes: {
      owner: 'Reyes Family Trust', prop: '4512 Telegraph Ave', contact: 'Teresa Reyes, trustee · (925) 555-0142',
      who: 'Family trust in Walnut Creek, managed by Teresa Reyes. Owns 4 buildings in 94608 and 94609 (11 units). Bought 4512 Telegraph in 2009 for $610,000.',
      why: 'Scanned the QR code on the MVI letter on Oct 29, eight days after it landed. The $380,000 Fremont Bank loan on this building matured Mar 4, 2026, with no new loan recorded.',
      got: 'MVI letter, delivered Oct 21. It led with Telegraph rents up 6% year on year and three nearby sales above $430,000 per unit. Recent activity flyer by email in July (opened).',
      touches: 'Oct 24 · You · call · no answer, no voicemail set up.<br>Aug 12 · David Weglarz · visit · met the on-site manager, not Teresa.',
      others: '5318 Telegraph Ave (2 units) and 472 41st St (4 units) also got the MVI letter. 3201 Adeline St got only the flyer.',
      opener: '“Hi Teresa, this is Nolan with Prescott. You scanned the code on the letter we sent about Telegraph. Most owners who do want a sense of where their building stands today. Is that what you were after?”',
      watch: 'Don’t quote a number on the call. Offer a BOV instead.',
      src: 'From Touch Timeline, Signals, Loans and the MVI letter copy · updated today',
      sugg: [
        ['What comps would go into a BOV?', 'The closest 2–4 unit sales in 94609 are 5210 Telegraph Ave (4 units, $402,500 per unit, Sep 2026) and 4007 Shafter Ave (3 units, $446,667 per unit, Jun 2026), both within half a mile. I can’t give a value for her building; that’s what the BOV is for.'],
        ['What if she says she’s not selling?', 'Try: “Totally fair. Most owners I talk to aren’t selling today. A BOV just tells you where you stand, and with the loan having matured it’s useful to know. No obligation.” Then offer to email her the recent Telegraph sales.'],
        ['Has anyone on the team spoken with her?', 'Not directly. David met the on-site manager on Aug 12. Your Oct 24 call went unanswered. This would be the team’s first conversation with Teresa.']
      ]
    },
    haddad: {
      owner: 'Haddad Properties LLC', prop: '3120 Grand Ave', contact: 'Sam Haddad, managing member · (510) 555-0187',
      who: 'LLC based in Oakland with 6 buildings in 94610 and 94611 (31 units). Has held 3120 Grand Ave since 2012.',
      why: 'The loan on 3120 Grand Ave matures in 58 days. No touch from you yet; the team’s last contact was Marissa’s call 2 days ago.',
      got: 'Market update letter for 94610, delivered Oct 21, leading with cap rates tightening as regional banks return to lending.',
      touches: 'Nov 11 · Marissa Chen · call · left a voicemail.<br>Sep 3 · Edson Ruiz · email · Recent activity flyer (not opened).',
      others: '5 more buildings, 2 of them with loans maturing in 2027. None has had a call yet.',
      opener: '“Hi Sam, Nolan with Prescott. Marissa from my team left you a message this week. I’m calling owners on Grand whose loans are coming up, to see how you’re thinking about the building.”',
      watch: 'Recently contacted: mention Marissa’s voicemail so this doesn’t feel like a second cold call.',
      src: 'From Touch Timeline, Signals and Loans · updated today',
      sugg: [
        ['What are his other buildings?', '6 buildings in total: 3120 Grand Ave (6 units), 3301 Lakeshore Ave (8), 512 Mandana Blvd (4), 3890 Harrison St (5), 410 Vernon St (4) and 66 Santa Rosa Ave (4). Lakeshore and Mandana have loans maturing in 2027.'],
        ['What if he says he’s refinancing?', 'Ask what the new terms look like compared with what buyers are paying on Grand right now, and offer a BOV so he can compare the two paths side by side.']
      ]
    },
    alcatraz: {
      owner: 'Alcatraz Partners', prop: '88 Vernon St', contact: 'Dana Whitfield · (415) 555-0110',
      who: 'Partnership based in San Francisco. Owns 2 buildings in 94610 (9 units).',
      why: 'Replied by email this morning to the Market update letter, asking how many units are selling on Vernon.',
      got: 'Market update letter for 94610, delivered Oct 21.',
      touches: 'Nov 8 · Edson Ruiz · email · sent the Market update.<br>Today · Owner · email reply.',
      others: '412 Lee St (4 units), not yet contacted.',
      opener: '“Hi Dana, Nolan with Prescott, thanks for writing back about Vernon. I pulled the recent sales on your block and wanted to walk you through them.”',
      watch: 'They wrote in first, so reply today if you can.',
      src: 'From Touch Timeline and the reply email · updated today',
      sugg: [['What did their email say?', '“Curious how many units are trading on Vernon right now and at what range. We may be open to a conversation next year.”']]
    },
    park1840: {
      owner: '1840 Park LLC', prop: '1840 Park Blvd', contact: 'No named contact on file',
      who: 'LLC with one building, 1840 Park Blvd (8 units), held for 19 years.',
      why: 'Long hold and never contacted by the team.',
      got: 'Nothing yet.',
      touches: 'None.',
      others: 'None.',
      opener: '“Hi, this is Nolan with Prescott. I work with owners around Park Blvd and wanted to introduce myself and share what’s been trading nearby.”',
      watch: 'No named contact. Ask who manages the building.',
      src: 'From Owners and Signals · updated today',
      sugg: [['Who might manage the building?', 'The registered mailing address is a property-management office on Lakeshore Ave. Asking for the manager by name is the fastest route to the owner.']]
    },
    grandave: {
      owner: 'Grand Ave Holdings LLC', prop: '475 Grand Ave', contact: 'Michael Tran · (510) 555-0163',
      who: 'LLC with 5 buildings near Lake Merritt (38 units).',
      why: 'Ownership may have changed: the mailing address moved between the August and September uploads.',
      got: 'Nothing yet.',
      touches: 'None.',
      others: '4 more buildings on Grand and Lakeshore.',
      opener: '“Hi Michael, Nolan with Prescott. I noticed your mailing address changed recently and wanted to make sure we have the right contact for 475 Grand.”',
      watch: 'Confirm who owns it now before you pitch anything.',
      src: 'From Signals and Owners · updated today',
      sugg: [['What changed exactly?', 'The mailing address moved from 475 Grand Ave to a PO Box in Piedmont between the Aug 29 and Sep 30 uploads. No sale has been recorded.']]
    },
    castillo: {
      owner: 'Helen Castillo', prop: '612 Walavista Ave', contact: '(510) 555-0129',
      who: 'Individual owner, lives out of the area. One building, 612 Walavista Ave (2 units).',
      why: 'Scanned the QR code on the Recent activity postcard yesterday.',
      got: 'Recent activity postcard for 94610, delivered Nov 9.',
      touches: 'Yesterday · Owner · QR scan.',
      others: 'None.',
      opener: '“Hi Helen, Nolan with Prescott. You looked at the sales page on the postcard we sent. Happy to walk you through what’s trading near Walavista.”',
      watch: 'Fresh scan: a good first call.',
      src: 'From Touch Timeline · updated today',
      sugg: [['What did she look at on the page?', 'She viewed the 94610 recent-sales page for about two minutes and opened the 2-unit sale at 544 Lester Ave.']]
    },
    manila: {
      owner: 'Manila Ave Partners LP', prop: '540 Manila Ave', contact: 'Robert Lin · (510) 555-0174',
      who: 'Limited partnership with one building, 540 Manila Ave (12 units).',
      why: 'The loan likely comes due in 2027. The last touch was a July email.',
      got: 'Recent activity flyer by email, Jul 9 (opened).',
      touches: 'Jul 9 · Edson Ruiz · email · flyer opened.',
      others: 'None.',
      opener: '“Hi Robert, Nolan with Prescott. With a few 2027 loan dates coming up on Manila, I’m checking in with owners on what they’re planning.”',
      watch: 'Larger building: a good candidate for a BOV conversation.',
      src: 'From Loans and Touch Timeline · updated today',
      sugg: [['Any recent sales of 10+ units nearby?', 'One: a Piedmont Ave 12-unit traded in September at about a 5.4% cap rate, the lowest on record in 94611.']]
    }
  };

  /* ---------------- Debrief data ---------------- */
  var DEBRIEFS = {
    reyes: {
      owner: 'Reyes Family Trust', first: 'Teresa', mode: 'single', prop: '4512 Telegraph Ave',
      said: 'Just talked to Teresa Reyes. She got our letter and scanned the code because she wants to know where the building stands today. She’s open to a BOV, so we’re meeting at the property Tuesday at two. She asked me to email her the recent Telegraph sales before then.',
      ack: 'Got it. Two quick questions so the log is complete.',
      qs: [
        ['Who’s going to the meeting on Tuesday, Nov 17?', ['Me (Nolan)', 'David Weglarz', 'Me and David']],
        ['Should I set you a reminder to email Teresa the Telegraph sales?', ['Yes, today at 4 PM', 'Yes, Monday morning', 'No, I’ll send it now']]
      ],
      touch: { how: 'Call', dir: 'We reached out', outcome: 'Appointment set', notes: 'Spoke with Teresa Reyes (trustee). She scanned the MVI letter code because she wants to know where the building stands today. Open to a BOV. Asked for the recent Telegraph sales by email before the meeting.' },
      tags: ['Wants a value', 'Open to a BOV'],
      found: function (a) {
        var who = a[0] === 'Me and David' ? 'Nolan Jones and David Weglarz' : (a[0] === 'David Weglarz' ? 'David Weglarz' : 'Nolan Jones');
        var items = [{ k: 'appt', t: 'Create appointment', d: 'Tue, Nov 17, 2026 · 2:00 PM · at 4512 Telegraph Ave', m: 'With Teresa Reyes · ' + who + ' · BOV walk-through', date: '2026-11-17', time: '14:00' }];
        if (a[1] !== 'No, I’ll send it now') {
          var day = a[1] === 'Yes, today at 4 PM' ? ['Today, Nov 13', '2026-11-13', '4:00 PM', '16:00'] : ['Mon, Nov 16', '2026-11-16', '9:00 AM', '09:00'];
          items.push({ k: 'fu', t: 'Set a follow-up', d: day[0] + ' · ' + day[2] + ' · Email Teresa the recent Telegraph sales', m: 'Assigned to Nolan Jones', date: day[1], time: day[3] });
        }
        return items;
      },
      rows: [{ ch: 'Call', what: 'Appointment set · “Open to a BOV; wants recent Telegraph sales before the meeting”' }]
    },
    'reyes-owner': {
      owner: 'Reyes Family Trust', first: 'Teresa', mode: 'multi',
      said: 'Talked to Teresa Reyes just now. On 4512 Telegraph she’s open to a BOV, and we’re meeting there Tuesday at two. On the 41st Street building she’s not ready, two units are being renovated, so she said call her back in March.',
      ack: 'Got it. That covers two of her buildings. Two quick questions.',
      qs: [
        ['Who’s going to the meeting on Tuesday, Nov 17?', ['Me (Nolan)', 'David Weglarz', 'Me and David']],
        ['When in March should we call her back about 472 41st St?', ['Mon, Mar 1', 'Mon, Mar 15', 'Wed, Mar 31']]
      ],
      touches: [
        { prop: '4512 Telegraph Ave', how: 'Call', outcome: 'Appointment set', notes: 'Open to a BOV. Meeting at the property Tuesday at 2 PM.' },
        { prop: '472 41st St', how: 'Call', outcome: 'Callback requested', notes: 'Not ready; two units under renovation. Call back in March.' }
      ],
      tags: ['Open to a BOV', 'Renovating', 'Not ready yet'],
      found: function (a) {
        var who = a[0] === 'Me and David' ? 'Nolan Jones and David Weglarz' : (a[0] === 'David Weglarz' ? 'David Weglarz' : 'Nolan Jones');
        var mar = { 'Mon, Mar 1': '2027-03-01', 'Mon, Mar 15': '2027-03-15', 'Wed, Mar 31': '2027-03-31' }[a[1]];
        return [
          { k: 'appt', t: 'Create appointment', d: 'Tue, Nov 17, 2026 · 2:00 PM · at 4512 Telegraph Ave', m: 'With Teresa Reyes · ' + who + ' · BOV walk-through', date: '2026-11-17', time: '14:00' },
          { k: 'cb', t: 'Set a callback', d: a[1] + ', 2027 · 10:00 AM · 472 41st St', m: 'Call Teresa about the 41st St building after the renovation · Nolan Jones', date: mar, time: '10:00' }
        ];
      },
      rows: [
        { ch: 'Call', what: '<a href="Property_Detail.html">4512 Telegraph Ave</a> · Appointment set · “Open to a BOV”' },
        { ch: 'Call', what: '<a href="#">472 41st St</a> · Callback requested · “Two units under renovation; call back in March”' }
      ]
    },
    haddad: {
      owner: 'Haddad Properties LLC', first: 'Sam', mode: 'single', prop: '3120 Grand Ave',
      said: 'Got Sam Haddad on the line. He knows the loan’s coming due and he’s already talking to his lender, leaning toward a refi. Not looking to sell 3120 Grand right now, but he said check back in the spring once the refi is sorted.',
      ack: 'Got it. One question.',
      qs: [['When in the spring should we call Sam back?', ['Mon, Mar 1', 'Thu, Apr 1', 'Mon, May 3']]],
      touch: { how: 'Call', dir: 'We reached out', outcome: 'Callback requested', notes: 'Spoke with Sam Haddad. Aware the 3120 Grand loan is coming due; talking to his lender and leaning toward a refinance. Not selling now. Check back in the spring once the refi is done.' },
      tags: ['Refinancing', 'Not selling now'],
      found: function (a) {
        var d = { 'Mon, Mar 1': '2027-03-01', 'Thu, Apr 1': '2027-04-01', 'Mon, May 3': '2027-05-03' }[a[0]];
        return [{ k: 'cb', t: 'Set a callback', d: a[0] + ', 2027 · 10:00 AM · 3120 Grand Ave', m: 'Ask how the refinance went and offer a BOV for comparison · Nolan Jones', date: d, time: '10:00' }];
      },
      rows: []
    }
  };
  function genericDebrief(key) {
    var b = BRIEFS[key]; var first = (b.contact.split(/[ ,·]/)[0] || 'the owner');
    if (/^No$/.test(first)) first = 'the manager';
    return {
      owner: b.owner, first: first, mode: 'single', prop: b.prop,
      said: 'Called about ' + b.prop + '. No answer, left a short voicemail. I’ll try again Thursday morning.',
      ack: 'Got it. Nothing missing, so no questions.', qs: [],
      touch: { how: 'Call', dir: 'We reached out', outcome: 'Left message', notes: 'No answer. Left a short voicemail about ' + b.prop + '.' },
      tags: [],
      found: function () { return [{ k: 'fu', t: 'Set a follow-up', d: 'Thu, Nov 19 · 10:00 AM · Call again about ' + b.prop, m: 'Assigned to Nolan Jones', date: '2026-11-19', time: '10:00' }]; },
      rows: []
    };
  }

  /* ---------------- Helpers ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function body() { return document.getElementById('om-body'); }
  function foot() { return document.getElementById('om-foot'); }
  function setTitle(t) { document.getElementById('om-title').textContent = t; }
  function toast(msg) {
    var t = $('.ob-toast'); if (!t) { t = document.createElement('div'); t.className = 'ob-toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('on'); }, 3200);
  }
  function msg(log, cls, html) { var m = document.createElement('div'); m.className = 'ox-msg ' + cls; m.innerHTML = html; log.appendChild(m); scroll(); return m; }
  function scroll() { var ov = document.getElementById('om-ov'); if (ov) ov.scrollTop = ov.scrollHeight; }
  function who(log) { var w = document.createElement('div'); w.className = 'ox-who'; w.innerHTML = '✦ Orbit'; log.appendChild(w); }
  function pg() { return window.ORBIT_PAGE || {}; }

  /* ================= Moment 2: Attack Brief ================= */
  window.attackBrief = function (key) {
    var b = BRIEFS[key]; if (!b) return;
    window.openModal('✦ Attack Brief · ' + b.owner, '', '');
    var h = '<div class="ox-log" id="ox-log">' +
      '<div class="ox-who">✦ Orbit</div>' +
      '<div class="ox-msg a" style="max-width:100%;background:#F7F6F3">Here’s your brief for the call. Ask me anything below.' +
      '<div class="br"><h4>' + b.owner + ' · ' + b.prop + '</h4><div class="ct">' + b.contact + '</div><dl>' +
      '<dt>Who they are</dt><dd>' + b.who + '</dd>' +
      '<dt>Why now</dt><dd>' + b.why + '</dd>' +
      '<dt>What they got</dt><dd>' + b.got + '</dd>' +
      '<dt>Last touches</dt><dd>' + b.touches + '</dd>' +
      '<dt>Other buildings</dt><dd>' + b.others + '</dd></dl>' +
      '<div class="op"><b>Suggested opener</b>' + b.opener + '</div>' +
      '<div class="wf">⚑ ' + b.watch + '</div>' +
      '<div class="src">' + b.src + '</div></div></div></div>' +
      '<div class="ox-sugg" id="ox-sugg"><span class="lbl">Ask a follow-up</span></div>' +
      '<div class="ox-in"><input type="text" id="ox-q" placeholder="Ask Orbit about ' + b.owner + '…"><button id="ox-go">Ask</button></div>';
    body().innerHTML = h;
    var sugg = $('#ox-sugg'), log = $('#ox-log');
    b.sugg.forEach(function (s) { var bt = document.createElement('button'); bt.textContent = s[0]; bt.onclick = function () { bt.remove(); askB(s[0], s[1]); }; sugg.appendChild(bt); });
    function askB(q, a) {
      msg(log, 'u', q.replace(/</g, '&lt;'));
      setTimeout(function () { who(log); msg(log, 'a', a || 'In the live product I’d answer this from ' + b.owner + '’s records. In this demo, try one of the suggested questions.'); }, 350);
    }
    $('#ox-go').onclick = function () { var v = $('#ox-q').value.trim(); if (!v) return; $('#ox-q').value = ''; askB(v); };
    $('#ox-q').onkeydown = function (e) { if (e.key === 'Enter') $('#ox-go').click(); };
    foot().innerHTML = '<button class="btn" onclick="closeModal()">Close</button><button class="btn primary" id="ox-log-call">Log this call →</button>';
    $('#ox-log-call').onclick = function () { logThisCall(key); };
  };

  function logThisCall(key) {
    window.closeModal();
    var tp = $('[data-panel="touch"]');
    if (tp && (pg().brief === key)) {
      setTimeout(function () { window.panel('touch'); var s = $('.uo-strip'); if (s) { s.classList.remove('pulse'); void s.offsetWidth; s.classList.add('pulse'); } }, 60);
    } else {
      setTimeout(function () { debrief(key); }, 60);
    }
  }

  /* ================= Moment 1: Use Orbit in Log a touch ================= */
  function injectStrip() {
    var tp = $('[data-panel="touch"]'); if (!tp || $('.uo-strip', tp)) return;
    var strip = document.createElement('div'); strip.className = 'uo-strip';
    strip.innerHTML = '<div class="tx"><b>Just finished a call or a meeting?</b>Tell Orbit what happened. It fills this in and catches the appointment or callback too.</div><button type="button">✦ Use Orbit</button>';
    strip.querySelector('button').onclick = function () { window.closeModal(); setTimeout(function () { debrief(pg().debrief); }, 60); };
    var meta = $('.meta', tp); if (meta) meta.parentNode.insertBefore(strip, meta.nextSibling); else tp.insertBefore(strip, tp.firstChild);
  }

  function debrief(key) {
    var d = DEBRIEFS[key] || genericDebrief(key);
    var answers = [];
    window.openModal('✦ Log a touch with Orbit · ' + d.owner, '', '');
    body().innerHTML =
      '<div class="ox-log" id="ox-log"><div class="ox-who">✦ Orbit</div><div class="ox-msg a">Tell me how it went with ' + d.owner + '. Talk like you would to a teammate; I’ll fill in the log and ask only if something’s missing.</div></div>' +
      '<div class="cap" id="cap"><button class="mic" id="mic" aria-label="Start talking">' + MIC + '</button><div class="st" id="st">Click the mic and start talking</div>' +
      '<div class="tr" id="tr"></div>' +
      '<button class="lk" id="typeit">Or type it instead</button>' +
      '<div class="typ" id="typ"><textarea rows="3" id="typta" placeholder="What happened?"></textarea><div style="display:flex;justify-content:flex-end;margin-top:6px"><button class="btn primary" id="typgo">Send to Orbit</button></div></div></div>';
    foot().innerHTML = '<button class="lk lft" id="bk">Back to form</button><button class="btn" onclick="closeModal()">Cancel</button>';
    $('#bk').onclick = backToForm;
    var log = $('#ox-log'), mic = $('#mic'), tr = $('#tr'), st = $('#st'), timer = null, done = false;

    mic.onclick = function () {
      if (done) return;
      if (timer) { finish(); return; }
      mic.classList.add('on'); mic.setAttribute('aria-label', 'Stop'); st.textContent = 'Listening… click again to stop';
      $('#typeit').style.display = 'none';
      var words = d.said.split(' '), i = 0; tr.innerHTML = '<span id="trt"></span><span class="caret"></span>';
      timer = setInterval(function () { if (i >= words.length) { finish(); return; } $('#trt').textContent += (i ? ' ' : '') + words[i++]; }, 85);
    };
    function finish() {
      clearInterval(timer); timer = null; done = true;
      if ($('#trt')) $('#trt').textContent = d.said;
      var c = $('.caret', tr); if (c) c.remove();
      mic.classList.remove('on'); st.textContent = 'Got it';
      setTimeout(converse, 400);
    }
    $('#typeit').onclick = function () { $('#typeit').style.display = 'none'; $('#typ').style.display = 'block'; $('#typta').value = d.said; $('#typta').focus(); };
    $('#typgo').onclick = function () { tr.textContent = $('#typta').value; $('#typ').style.display = 'none'; mic.style.display = 'none'; st.textContent = 'Got it'; done = true; setTimeout(converse, 300); };

    function converse() {
      $('#cap').style.display = 'none';
      msg(log, 'u', tr.textContent.replace(/</g, '&lt;'));
      setTimeout(function () { who(log); msg(log, 'a', d.ack); ask(0); }, 450);
    }
    function ask(i) {
      if (i >= d.qs.length) { setTimeout(function () { who(log); msg(log, 'a', 'Here’s what I’ll save. Check it, untick anything that’s wrong, then Save all.'); setTimeout(function () { review(d, answers, tr.textContent); }, 900); }, 350); return; }
      var q = d.qs[i];
      setTimeout(function () {
        who(log); msg(log, 'a', q[0]);
        var ch = document.createElement('div'); ch.className = 'ox-chips';
        q[1].forEach(function (o) { var b = document.createElement('button'); b.textContent = o; b.onclick = function () { ch.remove(); answers[i] = o; msg(log, 'u', o); ask(i + 1); }; ch.appendChild(b); });
        log.appendChild(ch); scroll();
      }, 450);
    }
  }

  function backToForm() {
    window.closeModal();
    if ($('[data-panel="touch"]')) { setTimeout(function () { window.panel('touch'); }, 60); }
    else { toast('In the product this opens the regular Log a touch form.'); }
  }

  function opt(list, sel) { return list.map(function (o) { return '<option' + (o === sel ? ' selected' : '') + '>' + o + '</option>'; }).join(''); }
  var OUTCOMES = ['No answer', 'Left message', 'Spoke', 'Appointment set', 'Not interested', 'Wrong number', 'Do not contact', 'Callback requested'];

  function review(d, answers, said) {
    setTitle('✦ Log a touch with Orbit · ' + d.owner);
    var items = d.found(answers);
    var h = '<div class="rv-note">✦ Orbit filled this in from what you said. Fields marked <span class="of">✦ Orbit</span> came from your words. Change anything, untick what’s wrong, then Save all. <button class="lk" id="shtr">Show what you said</button><div class="trx" id="trx">“' + said.replace(/</g, '&lt;') + '”</div></div>';
    if (d.mode === 'single') {
      var t = d.touch;
      h += '<div class="rv-h">Touch · ' + d.prop + ' · ' + d.owner + '</div><div class="rv-form">' +
        '<div class="field"><label>How <span class="of">✦ Orbit</span></label><select class="filled">' + opt(['Call', 'Visit', 'Text', 'Mail', 'Note'], t.how) + '</select></div>' +
        '<div class="field"><label>Direction</label><select>' + opt(['We reached out', 'They reached out'], t.dir) + '</select></div>' +
        '<div class="field"><label>Outcome <span class="of">✦ Orbit</span></label><select class="filled">' + opt(OUTCOMES, t.outcome) + '</select></div>' +
        '<div class="field"><label>When <span class="of">✦ Orbit · just now</span></label><div class="dt"><input type="date" class="filled" value="' + NOW.date + '"><input type="time" class="filled" value="' + NOW.time + '"></div></div>' +
        '<div class="field full"><label>Notes <span class="of">✦ Orbit</span></label><textarea rows="3" class="filled">' + t.notes + '</textarea>' +
        (d.tags.length ? '<div class="tags">' + d.tags.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' : '') + '</div></div>';
    } else {
      h += '<div class="rv-h">Touches · one per property</div>';
      d.touches.forEach(function (t, i) {
        h += '<div class="it" data-it><input type="checkbox" checked aria-label="Save this touch"><div class="bd"><b>' + t.how + ' · ' + t.prop + '</b><div class="d">' + t.outcome + ' · ' + t.notes + '</div><div class="m">' + NOW.label + ' · Nolan Jones · We reached out</div>' +
          '<div class="edw"><select>' + opt(OUTCOMES, t.outcome) + '</select><input type="text" value="' + t.notes.replace(/"/g, '&quot;') + '" style="max-width:360px"></div></div><button class="ed" type="button">Edit</button></div>';
      });
      if (d.tags.length) h += '<div class="tags" style="margin:-2px 0 4px">' + d.tags.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>';
    }
    if (items.length) {
      h += '<div class="rv-h">✦ Orbit also found</div>';
      items.forEach(function (it) {
        h += '<div class="it' + (it.k === 'dnc' ? ' dnc' : '') + '" data-it><input type="checkbox" checked aria-label="Save this item"><div class="bd"><b>' + it.t + '</b><div class="d">' + it.d + '</div><div class="m">' + it.m + '</div>' +
          '<div class="edw"><input type="date" value="' + it.date + '"><input type="time" value="' + it.time + '"></div></div><button class="ed" type="button">Edit</button></div>';
      });
    }
    body().innerHTML = h;
    $('#shtr').onclick = function () { var x = $('#trx'); x.style.display = x.style.display === 'block' ? 'none' : 'block'; };
    Array.prototype.forEach.call(body().querySelectorAll('[data-it]'), function (row) {
      var cb = row.querySelector('input[type=checkbox]');
      cb.onchange = function () { row.classList.toggle('off', !cb.checked); count(); };
      row.querySelector('.ed').onclick = function () { var w = row.querySelector('.edw'); w.style.display = w.style.display === 'flex' ? 'none' : 'flex'; };
    });
    foot().innerHTML = '<button class="lk lft" id="bk2">Back to form</button><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" id="saveall"></button>';
    $('#bk2').onclick = backToForm;
    function count() {
      var n = body().querySelectorAll('[data-it] input[type=checkbox]:checked').length + (d.mode === 'single' ? 1 : 0);
      var b = $('#saveall'); b.textContent = 'Save all (' + n + ')'; b.disabled = n === 0;
    }
    count();
    $('#saveall').onclick = function () {
      var rows = body().querySelectorAll('[data-it]'), saved = [];
      var touchesSaved = d.mode === 'single' ? 1 : 0, extra = [];
      Array.prototype.forEach.call(rows, function (r, i) {
        if (!r.querySelector('input[type=checkbox]').checked) return;
        if (d.mode === 'multi' && i < d.touches.length) touchesSaved++; else extra.push(r.querySelector('b').textContent.toLowerCase().replace('create ', '').replace('set a ', ''));
      });
      saved.push(touchesSaved + (touchesSaved === 1 ? ' touch' : ' touches'));
      extra.forEach(function (e) { saved.push(e); });
      window.closeModal();
      addTimeline(d);
      toast('Saved ' + (saved.length + touchesSaved - 1) + ' items: ' + saved.join(', ') + ' · logged with Orbit');
    };
  }

  function addTimeline(d) {
    var ul = document.getElementById('tl4') || document.getElementById('otl4'); if (!ul || !d.rows.length) return;
    var head = ul.firstElementChild;
    d.rows.slice().reverse().forEach(function (r) {
      var li = document.createElement('li'); li.className = 'new';
      li.innerHTML = '<span class="when">' + NOW.label + '</span><span>' + r.ch + '</span><span>Nolan Jones</span><span>' + r.what + ' <span class="of">✦ Orbit</span></span>';
      head.parentNode.insertBefore(li, head.nextSibling);
    });
    // make sure the touch list is the visible tab
    var tabs = document.querySelectorAll('.tabs button');
    var tb = document.getElementById('tl4') ? tabs[0] : tabs[1];
    if (tb && !tb.classList.contains('on')) tb.click();
  }


  /* ================= Moment 4: How To Attack This (plan in a modal, saved by name) ================= */
  function planCard(P) {
    var h = '<div class="pc"><div class="pch"><h4>' + P.name + '</h4><span class="sv">✓ Saved</span></div><div class="sub">' + P.zip + ' ' + P.area + ' · saved ' + P.saved + ' · built from sales, loans, signals and your team’s touches in this ZIP</div>' +
      '<div class="gl"><b>Goal.</b> ' + P.goal + '</div><div class="gl"><b>Why this ZIP now.</b> ' + P.why + '</div>';
    P.steps.forEach(function (st, i) {
      h += '<div class="ps' + (st.added ? ' new' : '') + '"><div class="n">' + (i + 1) + '</div><div class="tt">' + st.t + (st.when ? '<span class="wh">' + st.when + '</span>' : '') + '</div>' +
        (st.who ? '<dl><dt>Who</dt><dd>' + st.who + '</dd><dt>What to say</dt><dd>' + st.say + '</dd><dt>Target</dt><dd>' + st.target + '</dd></dl>' : '<div class="bd">' + st.body + '</div>') + '</div>';
    });
    return h + '<div class="gl" style="border-top:1px solid #E6E3DE;padding-top:10px;margin:6px 0 0"><b>What to track.</b> ' + P.track + '</div></div>';
  }
  window.attackPlan = function (P) {
    P.saved = 'Nov 13, 2026';
    if (window.orbitSavePlan) window.orbitSavePlan(P);
    window.openModal('✦ How To Attack This · ' + P.zip + ' ' + P.area, '', '');
    body().innerHTML = '<div class="ox-log" id="ox-log"><div class="ox-msg u">' + P.prompt + '</div>' +
      '<div class="ox-who">✦ Orbit</div><div class="ox-msg a" style="max-width:100%;background:#F7F6F3">Here’s a plan for ' + P.zip + ' ' + P.area + '. Ask me to change anything, or expand a step.<div id="pcard">' + planCard(P) + '</div></div>' +
      '<div class="ox-who">✦ Orbit</div><div class="ox-msg a">I saved this as <b>' + P.name + '</b>. You don’t need to keep this window open. While you build the list, set up the campaign or make the calls, open Orbit from any screen and ask for “' + P.name + '” to see it again.</div></div>' +
      '<div class="ox-sugg" id="ox-sugg"><span class="lbl">Ask a follow-up</span></div>' +
      '<div class="ox-in"><input type="text" id="ox-q" placeholder="Ask Orbit about this plan…"><button id="ox-go">Ask</button></div>';
    var log = $('#ox-log'), sugg = $('#ox-sugg');
    function save() { if (window.orbitSavePlan) window.orbitSavePlan(P); $('#pcard').innerHTML = planCard(P); }
    var F = [
      ['Add a step for owners who don’t respond', function () {
        P.steps.push({ added: true, t: 'Send a second letter to owners who didn’t scan, reply or pick up', when: 'Week 5', body: 'Use a different angle from the first piece, such as a recent nearby sale. Then call the Tier A owners on that list one more time.' });
        save(); return 'Added step ' + P.steps.length + ' and updated <b>' + P.name + '</b>. Owners who have already said no or asked not to be contacted are left out of it.';
      }],
      ['Turn step 1 into a call script', function () {
        var s1 = P.steps[0];
        return '<b>Opening.</b> ' + (s1.say || '“Hi, this is Nolan with Prescott. I work with owners in ' + P.zip + ' and wanted to share what buildings near yours are selling for.”') + '<br><b>If they’re curious.</b> “I can put together a free, no-obligation look at where your building stands. Would next week work?”<br><b>If they’re not selling.</b> “Totally fair. Can I send you the recent sales on your street so you have them?”<br>Say “add this to the plan” if you want it saved with step 1.';
      }],
      ['Shorten the plan to two weeks', function () {
        var w = ['Days 1 to 5', 'Day 3', 'Days 8 to 14', 'Day 14'];
        P.steps.forEach(function (st, i) { st.when = w[i] || st.when; }); save();
        return 'Done. Calls start right away, the mailer goes out on day 3, and BOV follow-ups run in the second week. I updated the timing in <b>' + P.name + '</b>. Expect fewer BOV meetings, because owners get less time to respond to the mailer.';
      }],
      ['What should I do first today?', function () {
        return 'Start step 1. Build the call list of the ' + (P.zip === '94608' ? '38 owners with 2027 loans' : 'Hot and Warm owners') + ' from Prospecting or Owner lists, then call the Hot owners first. Come back and tell me how the first calls went, and I’ll mark step 1 as started.';
      }]
    ];
    F.forEach(function (f) { var b = document.createElement('button'); b.textContent = f[0]; b.onclick = function () { b.remove(); askP(f[0], f[1]); }; sugg.appendChild(b); });
    function askP(q, fnA) {
      msg(log, 'u', q.replace(/</g, '&lt;'));
      setTimeout(function () { who(log); msg(log, 'a', fnA ? fnA() : 'In the live product I’d answer this from your ' + P.zip + ' data and update the plan if you ask me to. In this demo, try one of the suggested follow-ups.'); }, 350);
    }
    $('#ox-go').onclick = function () { var v = $('#ox-q').value.trim(); if (!v) return; $('#ox-q').value = ''; askP(v); };
    $('#ox-q').onkeydown = function (e) { if (e.key === 'Enter') $('#ox-go').click(); };
    foot().innerHTML = '<span class="meta lft" style="font-size:12px;color:#6B6A66">Saved as ' + P.name + ' · find it in Orbit on any screen</span><button class="btn primary" onclick="closeModal()">Done</button>';
  };


  /* ================= Moment 8: Campaign Orbit AI Summary (chat modal) ================= */
  var CAMPAIGNS = {
    telegraph: {
      name: 'Loan maturity · Telegraph corridor', status: 'Calling · about 1 week to go',
      meta: 'Owner list: Absentee 2–4 units · 94609, 94610 · MVI letter plus a follow-up letter · Goal: 3 listing appointments by Dec 15',
      lead: 'This campaign is still running. The letters have landed, the team has called a little under half the list, and it has booked 3 appointments so far, which matches the goal of 3 by Dec 15. None has turned into a listing yet.',
      funnel: [['423', 'letters sent'], ['371', 'delivered (88%)'], ['186', 'owners called, 45% of 411'], ['41', 'spoke, 22% of called'], ['3', 'appointments, 7% of spoke'], ['0', 'listings so far']],
      stood: [
        'Owners in 94609 picked up more often than owners in 94610. The team spoke with 27 of the 104 called in 94609 (26%), compared with 14 of 82 in 94610 (17%).',
        'All 3 appointments came from Tier A owners, who are about a third of the list.',
        'Calls made within 5 days of a letter landing reached the owner 31% of the time. Calls made later reached them 15% of the time.',
        '29 owners scanned the QR code on the letter. 18 of them have not been reached by phone yet.',
        '52 letters came back undeliverable, mostly to old mailing addresses.'
      ],
      themes: [['Not selling, asked about rents', 14], ['Refinancing with their current lender', 9], ['Wants to know what the building is worth', 6], ['Call back after the new year', 5]],
      src: 'From this campaign’s mailings, call log, QR scans and call notes · updated today at 6:00 AM. Groups smaller than 5 owners are not shown as rates.',
      sugg: [
        ['Give me suggestions for how we can improve', '<b>Here’s what I’d try, based on this campaign’s own numbers.</b> These are suggestions, not certainties.<ol style="margin:6px 0 0;padding-left:18px"><li><b>Call the 18 owners who scanned the QR code but haven’t been reached.</b> They looked at the letter on purpose, so they’re the warmest people left on the list.</li><li><b>Call sooner after each letter lands.</b> Calls in the first 5 days reached owners about twice as often. For the follow-up letter, plan the calling days around the delivery date.</li><li><b>Give the 9 owners who are refinancing a reason to compare.</b> A short note showing what a sale would net next to what the new loan would cost gives them something useful instead of a pitch.</li><li><b>Send the 14 owners who asked about rents a rent update for their block.</b> They told us what they care about.</li><li><b>Fix the 52 returned addresses before the next run.</b> That’s about 1 in 8 letters that never reached anyone.</li></ol>'],
        ['What does this campaign tell me for future campaigns?', '<b>Four lessons worth carrying forward.</b> This is one campaign, so treat them as early signs rather than rules.<ol style="margin:6px 0 0;padding-left:18px"><li><b>The loan-maturity angle works better in 94609 than in 94610.</b> Next time in 94610, try leading with recent sales or rents instead.</li><li><b>Tier A owners are where the appointments come from.</b> Call them first in every campaign, and consider sending them a second letter.</li><li><b>Timing matters as much as the letter.</b> Line up the calling days with the expected delivery date when you schedule a send.</li><li><b>Refinancing is the most common reason owners aren’t selling.</b> A refinance-versus-sell comparison could become a standard follow-up piece.</li></ol>Orbit AI Learning will also pick these up as more campaigns finish.'],
        ['Who should we call next?', 'Start with the <b>18 owners who scanned the QR code but haven’t been reached</b>, then the <b>Tier A owners in 94609</b> who haven’t been called yet (23 of them). After that, keep working down the call queue. At the current pace the team will finish the list in about a week.']
      ]
    }
  };
  window.campaignSummary = function (key) {
    var c = CAMPAIGNS[key]; if (!c) return;
    window.openModal('✦ Orbit AI Summary · ' + c.name, '', '');
    body().innerHTML = '<div class="ox-log" id="ox-log"><div class="ox-who">✦ Orbit</div>' +
      '<div class="ox-msg a" style="max-width:100%;background:#F7F6F3">Here’s where this campaign stands. Ask me anything below.' +
      '<div class="br"><h4>' + c.name + '</h4><div class="ct">' + c.status + ' · ' + c.meta + '</div>' +
      '<div style="font-size:13px;line-height:1.55">' + c.lead + '</div>' +
      '<div class="fn">' + c.funnel.map(function (f) { return '<div><b>' + f[0] + '</b><span>' + f[1] + '</span></div>'; }).join('') + '</div>' +
      '<div class="sh">What stood out</div><ul>' + c.stood.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<div class="sh">What owners told us on the phone</div><div class="thm">' + c.themes.map(function (t) { return '<span>' + t[0] + '<b>' + t[1] + '</b></span>'; }).join('') + '</div>' +
      '<div class="src">' + c.src + '</div></div></div></div>' +
      '<div class="ox-sugg" id="ox-sugg"><span class="lbl">Ask a follow-up</span></div>' +
      '<div class="ox-in"><input type="text" id="ox-q" placeholder="Ask Orbit about this campaign…"><button id="ox-go">Ask</button></div>';
    var sugg = $('#ox-sugg'), log = $('#ox-log');
    c.sugg.forEach(function (s) { var bt = document.createElement('button'); bt.textContent = s[0]; bt.onclick = function () { bt.remove(); askC(s[0], s[1]); }; sugg.appendChild(bt); });
    function askC(q, a) {
      msg(log, 'u', q.replace(/</g, '&lt;'));
      setTimeout(function () { who(log); msg(log, 'a', a || 'In the live product I’d answer this from this campaign’s records. In this demo, try one of the suggested questions.'); }, 350);
    }
    $('#ox-go').onclick = function () { var v = $('#ox-q').value.trim(); if (!v) return; $('#ox-q').value = ''; askC(v); };
    $('#ox-q').onkeydown = function (e) { if (e.key === 'Enter') $('#ox-go').click(); };
    foot().innerHTML = '<button class="btn primary" onclick="closeModal()">Done</button>';
  };

  var styled = false;
  function init() {
    if (!styled) { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); styled = true; }
    if (typeof window.openModal !== 'function' || !document.getElementById('om-body')) return setTimeout(init, 40);
    injectStrip();
  }
  window.orbitDebrief = debrief;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
