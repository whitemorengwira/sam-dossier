/**
 * Document Engine — SAM Dossier
 * Handles: editing toolbar, autosaving (Google Docs style), canvas signature pads.
 */
(function () {
  'use strict';

  var slug = document.body.getAttribute('data-document-slug');
  var isEditing = false;
  var saveTimeout = null;
  var isSaving = false;

  /* ── Save Document (Google Docs style) ──────────────────────── */
  function saveDocument() {
    if (!slug) return;
    isSaving = true;
    updateSaveStatus('Saving...');

    // Clone the document to clean it up before saving
    var clone = document.documentElement.cloneNode(true);
    
    // Remove the toolbar from the saved HTML
    var toolbar = clone.querySelector('.doc-toolbar');
    if (toolbar) toolbar.remove();

    // Turn off contentEditable in the saved HTML
    var content = clone.querySelector('#doc-content');
    if (content) content.removeAttribute('contenteditable');

    // Remove any dynamic data from canvas (signatures are saved separately in Supabase)
    var canvases = clone.querySelectorAll('canvas');
    canvases.forEach(function(c) {
      var ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, c.width, c.height);
      }
    });

    var html = '<!DOCTYPE html>\n<html lang="en">\n' + clone.innerHTML + '\n</html>';

    fetch('/api/validated-documents/' + slug + '/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: html })
    }).then(function(res) {
      if (res.ok) {
        updateSaveStatus('Saved to Cloud');
        setTimeout(function() { updateSaveStatus(''); }, 3000);
      } else {
        updateSaveStatus('Save Failed');
      }
      isSaving = false;
    }).catch(function() {
      updateSaveStatus('Save Error');
      isSaving = false;
    });
  }

  function scheduleSave() {
    if (!isEditing) return;
    updateSaveStatus('Unsaved changes');
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveDocument, 2000); // Auto-save after 2s of inactivity
  }

  function updateSaveStatus(text) {
    var statusEl = document.getElementById('doc-save-status');
    if (statusEl) statusEl.textContent = text;
  }

  /* ── Toolbar creation ───────────────────────────────────────── */
  function createToolbar() {
    var bar = document.createElement('div');
    bar.className = 'doc-toolbar';

    var tools = [
      { cmd: 'bold', icon: '<b>B</b>', title: 'Bold' },
      { cmd: 'italic', icon: '<i>I</i>', title: 'Italic' },
      { cmd: 'underline', icon: '<u>U</u>', title: 'Underline' },
      { sep: true },
      { cmd: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
      { cmd: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
      { sep: true },
      { cmd: 'justifyLeft', icon: '⇤', title: 'Align Left' },
      { cmd: 'justifyCenter', icon: '⇔', title: 'Align Centre' },
      { cmd: 'justifyRight', icon: '⇥', title: 'Align Right' },
      { sep: true },
      { cmd: 'undo', icon: '↶', title: 'Undo' },
      { cmd: 'redo', icon: '↷', title: 'Redo' },
    ];

    tools.forEach(function (t) {
      if (t.sep) {
        var s = document.createElement('div');
        s.className = 'toolbar-sep format-tool';
        bar.appendChild(s);
        return;
      }
      var btn = document.createElement('button');
      btn.className = 'toolbar-btn format-tool';
      btn.title = t.title;
      btn.innerHTML = t.icon;
      btn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand(t.cmd, false, null);
        scheduleSave();
      });
      bar.appendChild(btn);
    });

    // Save Status
    var status = document.createElement('div');
    status.id = 'doc-save-status';
    status.style.cssText = 'margin-left: 16px; font-size: 11px; color: #94a3b8; font-family: "Inter", sans-serif;';
    bar.appendChild(status);

    // Spacer
    var spacer = document.createElement('div');
    spacer.style.flex = '1';
    bar.appendChild(spacer);

    // Edit toggle
    var editBtn = document.createElement('button');
    editBtn.className = 'toolbar-btn edit-toggle off';
    editBtn.textContent = '✎ Enable Editing';
    editBtn.addEventListener('click', function () { toggleEditing(editBtn); });
    bar.appendChild(editBtn);

    // Force save button
    var saveBtn = document.createElement('button');
    saveBtn.className = 'toolbar-btn edit-toggle off';
    saveBtn.style.marginLeft = '8px !important';
    saveBtn.textContent = '💾 Save Now';
    saveBtn.addEventListener('click', saveDocument);
    bar.appendChild(saveBtn);

    document.body.insertBefore(bar, document.body.firstChild);

    // Hide format tools initially
    document.querySelectorAll('.format-tool').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  function toggleEditing(btn) {
    isEditing = !isEditing;
    btn.className = isEditing ? 'toolbar-btn edit-toggle on' : 'toolbar-btn edit-toggle off';
    btn.textContent = isEditing ? '✓ Editing Active' : '✎ Enable Editing';

    var content = document.getElementById('doc-content');
    if (content) {
      content.contentEditable = isEditing ? 'true' : 'false';
      if (isEditing) {
        content.addEventListener('input', scheduleSave);
      } else {
        content.removeEventListener('input', scheduleSave);
        if (saveTimeout) { clearTimeout(saveTimeout); saveDocument(); }
      }
    }

    document.querySelectorAll('.format-tool').forEach(function (el) {
      el.style.display = isEditing ? '' : 'none';
    });
  }

  /* ── Canvas signature pads ──────────────────────────────────── */
  function initPad(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var drawing = false;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.strokeStyle = '#0A1128';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    function pos(e) {
      var r = canvas.getBoundingClientRect();
      var src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    }

    canvas.addEventListener('mousedown', function (e) {
      drawing = true; var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    });
    canvas.addEventListener('mousemove', function (e) {
      if (!drawing) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke();
    });
    canvas.addEventListener('mouseup', function () { drawing = false; });
    canvas.addEventListener('mouseleave', function () { drawing = false; });
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault(); drawing = true; var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    }, { passive: false });
    canvas.addEventListener('touchmove', function (e) {
      e.preventDefault(); if (!drawing) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke();
    }, { passive: false });
    canvas.addEventListener('touchend', function () { drawing = false; });
  }

  /* ── Clear pad (global) ─────────────────────────────────────── */
  window.clearSignaturePad = function (id) {
    var c = document.getElementById(id);
    if (!c) return;
    var ctx = c.getContext('2d');
    if (!ctx) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    ctx.strokeStyle = '#0A1128';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    // Also delete from Supabase
    if (slug) {
      fetch('/api/validated-documents/' + slug + '/signatures', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ padId: id }),
        credentials: 'same-origin',
      }).catch(function() { /* ignore */ });
    }
  };

  /* ── Height reporting to parent frame ───────────────────────── */
  function reportHeight() {
    if (window.parent === window) return;
    if (!slug) return;
    window.parent.postMessage(
      { source: 'sam-dossier-bridge', type: 'resize', height: document.documentElement.scrollHeight, slug: slug },
      window.location.origin
    );
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    // Only create toolbar if it doesn't already exist
    if (!document.querySelector('.doc-toolbar')) {
      createToolbar();
    }
    document.querySelectorAll('.sig-canvas').forEach(initPad);
    reportHeight();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(reportHeight).observe(document.body);
    }
    window.addEventListener('resize', reportHeight);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
