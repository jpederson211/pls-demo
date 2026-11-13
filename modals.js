/* Converts in-page edit/create "panel(id)" columns into modal dialogs, and
   native confirm() deletes into modal confirms. Loads after orbit.js. */
(function () {
  var CSS = '#om-body .in-modal{display:block!important;position:static!important;width:auto!important;max-width:none!important;flex:none!important;top:auto!important;border:0!important;padding:0!important;box-shadow:none!important;background:transparent!important}';
  var s = document.createElement('style'); s.textContent = CSS; (document.head || document.documentElement).appendChild(s);

  var moved = null, parent = null, next = null, hidden = null, origClose = null;

  function embed(node) {
    if (!node) return;
    parent = node.parentNode; next = node.nextSibling; moved = node;
    node.style.display = '';
    hidden = node.querySelector('h2, h3');
    var title = hidden ? hidden.textContent.replace(/[×✕✖x]\s*$/i, '').trim() : '';
    window.openModal(title, '', '');
    if (hidden) hidden.style.display = 'none';
    var body = document.getElementById('om-body');
    body.innerHTML = '';
    node.classList.add('in-modal');
    body.appendChild(node);
    document.getElementById('om-foot').style.display = 'none';
  }
  function restore() {
    document.getElementById('om-foot').style.display = '';
    if (moved) {
      moved.classList.remove('in-modal');
      if (hidden) { hidden.style.display = ''; hidden = null; }
      moved.style.display = 'none';
      if (parent) { if (next && next.parentNode === parent) parent.insertBefore(moved, next); else parent.appendChild(moved); }
      moved = null;
    }
    if (origClose) origClose();
  }

  function install() {
    if (typeof window.openModal !== 'function') { return setTimeout(install, 40); }
    origClose = window.closeModal;
    // Panels (in-page edit/create columns) -> modal
    window.panel = function (id) { if (id == null) { restore(); return; } var n = document.querySelector('[data-panel="' + id + '"]'); if (n) embed(n); };
    // Closing the modal (X / backdrop) also restores an embedded panel
    window.closeModal = function () { if (moved) { restore(); } else if (origClose) origClose(); };
    // Modal confirm for deletes
    window.M = window.M || {};
    window.M.confirm = function (msg, onOk) {
      window.__ok = onOk || function () { };
      window.openModal('Please confirm',
        '<p style="font-size:14px;line-height:1.55;margin:0">' + msg + '</p>',
        '<button class="btn" onclick="closeModal()">Cancel</button> <button class="btn danger" onclick="closeModal();window.__ok&&window.__ok()">Confirm</button>');
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();

  /* ---------- ⓘ explainer tooltips: <span class="xi" data-tip="One sentence.">i</span> ---------- */
  var XCSS = '.xi{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;border:1px solid #9A9892;color:#6B6A66;font:600 9.5px/1 Georgia,serif;font-style:italic;margin-left:4px;cursor:help;vertical-align:1px;background:#fff;text-transform:none;letter-spacing:0}' +
    '.xi:hover,.xi.on{border-color:#2D2E41;color:#2D2E41}' +
    '#xi-tip{position:fixed;z-index:1000;max-width:260px;background:#1E1E1E;color:#fff;font:400 12px/1.45 inherit;font-family:inherit;padding:8px 10px;border-radius:4px;box-shadow:0 6px 18px rgba(0,0,0,.2);pointer-events:none;opacity:0;transition:opacity .12s;text-transform:none;letter-spacing:0;font-style:normal;text-align:left;white-space:normal}' +
    '#xi-tip.on{opacity:1}';
  var xs = document.createElement('style'); xs.textContent = XCSS; (document.head || document.documentElement).appendChild(xs);
  var tip = null, pinned = null;
  function showTip(x) {
    if (!tip) { tip = document.createElement('div'); tip.id = 'xi-tip'; document.body.appendChild(tip); }
    tip.textContent = x.getAttribute('data-tip') || '';
    tip.classList.add('on');
    var r = x.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
    var top = r.top - h - 8; if (top < 8) top = r.bottom + 8;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  }
  function hideTip() { if (tip) tip.classList.remove('on'); if (pinned) { pinned.classList.remove('on'); pinned = null; } }
  document.addEventListener('mouseover', function (e) { var x = e.target.closest && e.target.closest('.xi'); if (x) showTip(x); });
  document.addEventListener('mouseout', function (e) { var x = e.target.closest && e.target.closest('.xi'); if (x && !pinned) hideTip(); });
  document.addEventListener('click', function (e) {
    var x = e.target.closest && e.target.closest('.xi');
    if (x) { e.stopPropagation(); e.preventDefault(); if (pinned === x) { hideTip(); return; } hideTip(); pinned = x; x.classList.add('on'); showTip(x); return; }
    if (pinned) hideTip();
  }, true);
  window.addEventListener('scroll', function () { if (!pinned) hideTip(); else showTip(pinned); }, true);
})();
