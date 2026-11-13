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
})();
