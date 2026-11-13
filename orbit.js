/* Orbit shared UI: Ask Orbit slide-out + generic modal. Injected on every screen. */
(function () {
  var CSS = `
  .orbit-launch{display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:13px;font-weight:600;
    padding:7px 13px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:999px;cursor:pointer}
  .orbit-launch:hover{background:#3b3c54}
  .orbit-launch svg{width:15px;height:15px}
  .orbit-ov{position:fixed;inset:0;background:rgba(20,20,22,.28);opacity:0;visibility:hidden;transition:opacity .22s;z-index:900}
  .orbit-ov.on{opacity:1;visibility:visible}
  .orbit-panel{position:fixed;top:0;right:0;height:100vh;width:392px;max-width:92vw;background:#fff;border-left:1px solid #D3D0CB;
    box-shadow:-8px 0 28px rgba(0,0,0,.12);transform:translateX(100%);transition:transform .26s ease;z-index:901;display:flex;flex-direction:column}
  .orbit-panel.on{transform:translateX(0)}
  .orbit-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #E6E3DE}
  .orbit-head .t{font-weight:600;display:flex;align-items:center;gap:8px}
  .orbit-head .t svg{width:16px;height:16px}
  .orbit-head .sub{font-size:11px;color:#6B6A66;margin-top:1px}
  .orbit-x{margin-left:auto;background:none;border:none;font-size:18px;color:#6B6A66;cursor:pointer;line-height:1;padding:4px 6px}
  .orbit-x:hover{color:#1E1E1E}
  .orbit-ctx{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px 0}
  .orbit-ctx .c{font-size:11.5px;border:1px solid #B5B2AC;background:#F7F6F3;color:#1E1E1E;border-radius:999px;padding:2px 9px}
  .orbit-log{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px}
  .orbit-msg{max-width:84%;padding:8px 11px;border-radius:12px;font-size:13px;line-height:1.5}
  .orbit-msg.u{align-self:flex-end;background:#2D2E41;color:#fff;border-bottom-right-radius:3px}
  .orbit-msg.a{align-self:flex-start;background:#F0EEEA;color:#1E1E1E;border-bottom-left-radius:3px}
  .orbit-sugg{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px}
  .orbit-sugg button{font:inherit;font-size:11.5px;border:1px solid #B5B2AC;background:#fff;color:#2D2E41;border-radius:999px;padding:3px 9px;cursor:pointer}
  .orbit-sugg button:hover{background:#F7F6F3}
  .orbit-in{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #E6E3DE}
  .orbit-in input{flex:1;font:inherit;font-size:13px;padding:8px 10px;border:1px solid #B5B2AC;border-radius:6px}
  .orbit-in button{font:inherit;font-size:13px;font-weight:600;padding:8px 13px;border:1px solid #2D2E41;background:#2D2E41;color:#fff;border-radius:6px;cursor:pointer}
  .om-ov{position:fixed;inset:0;background:rgba(20,20,22,.4);opacity:0;visibility:hidden;transition:opacity .18s;z-index:950;display:flex;align-items:flex-start;justify-content:center;padding:48px 16px;overflow-y:auto}
  .om-ov.on{opacity:1;visibility:visible}
  .om{background:#fff;border:1px solid #D3D0CB;border-radius:6px;box-shadow:0 20px 50px rgba(0,0,0,.2);width:720px;max-width:100%;transform:translateY(-8px);transition:transform .18s}
  .om-ov.on .om{transform:translateY(0)}
  .om-head{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #E6E3DE}
  .om-head .t{font-weight:600;font-size:15px}
  .om-x{margin-left:auto;background:none;border:none;font-size:18px;color:#6B6A66;cursor:pointer;padding:2px 6px}
  .om-body{padding:16px 18px}
  .om-foot{display:flex;gap:10px;justify-content:flex-end;padding:12px 18px;border-top:1px solid #E6E3DE}
  @media(max-width:520px){.orbit-panel{width:100vw;max-width:100vw}}
  `;
  var SPARK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 14l.9 2.6L22.5 17l-2.6.9L19 20.5l-.9-2.6L15.5 17l2.6-.9L19 14z"/></svg>';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function answerFor(q) {
    q = (q || '').toLowerCase();
    if (q.indexOf('call first') > -1 || q.indexOf('who should') > -1) return 'Your strongest call right now is <b>Haddad Properties LLC</b> (3120 Grand Ave) — loan maturing within 60 days and no touch in 74 days. Then <b>1840 Park LLC</b> (held 19 years, never contacted).';
    if (q.indexOf('matur') > -1 || q.indexOf('loan') > -1) return '7 owners in your targets have a loan likely maturing within 12 months and no touch in 60+ days — 4 of them in 94611 (5+ unit). Want them added to a call list?';
    if (q.indexOf('talk track') > -1 || q.indexOf('temescal') > -1 || q.indexOf('say') > -1) return 'For Temescal this week: "Rents on rent-controlled units can only rise 2.3% this year, and buyers are paying up for that upside — 45% of nearby sales drew 3+ offers."';
    if (q.indexOf('touch') > -1 || q.indexOf('recent') > -1 || q.indexOf('team') > -1) return '2 owners on your current list were contacted by a teammate in the last 7 days: <b>Haddad</b> (Marissa · call · 2 days ago) and <b>Alcatraz Partners</b> (Edson · email · 5 days ago). Both stay on your list with the history.';
    if (q.indexOf('market') > -1 || q.indexOf('sale') > -1 || q.indexOf('zip') > -1) return 'In 94610 (2-unit): median $512k/unit, DOM 24, sales +6% vs last quarter. In 94611 (5+ unit): median $291k/unit, DOM 61, flat. A 12-unit on Piedmont Ave just set a 5.4% cap benchmark.';
    return 'I can pull owners, signals, recent sales, and talk tracks, draft outreach, or build a target list. Try asking who to call first, which loans are maturing, or for a talk track for a ZIP.';
  }

  var logEl, inEl, panelEl, ovEl;
  function addMsg(cls, html) { var m = el('div', 'orbit-msg ' + cls, html); logEl.appendChild(m); logEl.scrollTop = logEl.scrollHeight; }
  function ask(q) { if (!q) { q = inEl.value.trim(); if (!q) return; } addMsg('u', q); inEl.value = ''; var a = answerFor(q); setTimeout(function () { addMsg('a', a); }, 260); }

  function build() {
    // launch button into topbar actions (or topbar)
    var btn = el('button', 'orbit-launch', SPARK + 'Ask Orbit');
    btn.onclick = function () { window.openOrbit(); };
    var actions = document.querySelector('.topbar .actions') || document.querySelector('.topbar');
    if (actions) { if (actions.classList.contains('actions')) actions.insertBefore(btn, actions.firstChild); else actions.appendChild(btn); }

    ovEl = el('div', 'orbit-ov'); ovEl.onclick = window.closeOrbit;
    panelEl = el('div', 'orbit-panel');
    var head = el('div', 'orbit-head', '<div><div class="t">' + SPARK + 'Ask Orbit</div><div class="sub">Your CRE copilot</div></div>');
    var x = el('button', 'orbit-x', '&rsaquo;'); x.title = 'Close'; x.onclick = window.closeOrbit; head.appendChild(x);
    panelEl.appendChild(head);
    var ctx = el('div', 'orbit-ctx'); ctx.id = 'orbit-ctx'; panelEl.appendChild(ctx);
    logEl = el('div', 'orbit-log'); panelEl.appendChild(logEl);
    var sugg = el('div', 'orbit-sugg');
    ['Who should I call first?', 'Loans maturing, untouched 60 days?', 'Talk track for Temescal', 'What is the market doing?'].forEach(function (s) {
      var b = el('button', null, s); b.onclick = function () { ask(s); }; sugg.appendChild(b);
    });
    panelEl.appendChild(sugg);
    var inWrap = el('div', 'orbit-in');
    inEl = el('input'); inEl.type = 'text'; inEl.placeholder = 'Ask about owners, signals, sales, outreach…';
    inEl.onkeydown = function (e) { if (e.key === 'Enter') ask(); };
    var go = el('button', null, 'Ask'); go.onclick = function () { ask(); };
    inWrap.appendChild(inEl); inWrap.appendChild(go); panelEl.appendChild(inWrap);
    document.body.appendChild(ovEl); document.body.appendChild(panelEl);

    // generic modal container
    var mov = el('div', 'om-ov'); mov.id = 'om-ov';
    mov.onclick = function (e) { if (e.target === mov) window.closeModal(); };
    mov.innerHTML = '<div class="om"><div class="om-head"><span class="t" id="om-title"></span><button class="om-x" onclick="closeModal()">&times;</button></div><div class="om-body" id="om-body"></div><div class="om-foot" id="om-foot"></div></div>';
    document.body.appendChild(mov);
  }

  window.openOrbit = function (ctxChips, seed) {
    var ctx = document.getElementById('orbit-ctx'); ctx.innerHTML = '';
    if (ctxChips && ctxChips.length) { ctxChips.forEach(function (c) { ctx.appendChild(el('span', 'c', c)); }); }
    if (!logEl.dataset.greeted) { addMsg('a', 'Hi Nolan — ask me anything about your targets, owners, the market, or outreach.'); logEl.dataset.greeted = '1'; }
    if (seed) ask(seed);
    ovEl.classList.add('on'); panelEl.classList.add('on'); setTimeout(function () { inEl.focus(); }, 300);
  };
  window.closeOrbit = function () { ovEl.classList.remove('on'); panelEl.classList.remove('on'); };
  window.openModal = function (title, bodyHTML, footHTML) {
    document.getElementById('om-title').textContent = title || '';
    document.getElementById('om-body').innerHTML = bodyHTML || '';
    document.getElementById('om-foot').innerHTML = footHTML || '<button class="btn" onclick="closeModal()">Close</button>';
    document.getElementById('om-ov').classList.add('on');
  };
  window.closeModal = function () { document.getElementById('om-ov').classList.remove('on'); };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  function init() { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); build(); }
})();
