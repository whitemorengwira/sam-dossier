/**
 * Document Enhancer — SAM Dossier
 *
 * Injected at render-time into each validated document. This script:
 * 1. Replaces existing basic signing pads with polished versions (full credentials).
 * 2. Adds signing pads to documents that lack them.
 * 3. Adds a toggle-editing button so the document content becomes editable.
 * 4. Handles canvas drawing for all enhanced pads.
 *
 * Original document content is NEVER modified on disc.
 * British English throughout.
 */

(function () {
  'use strict';

  /* ── Signatory credentials map ──────────────────────────────────── */
  var CRED = {
    'sig-md':      { name: 'Ms Jabulile Dladla',           title: 'Managing Director' },
    'sig-ceo':     { name: 'Mr Whitemore Ngwira',          title: 'Chief Executive Officer' },
    'sig-chair':   { name: 'Mr Tsekane Lukie Tshabalala',  title: 'Chairperson' },
    'sig-cfo':     { name: 'Mr Mike Dotsey',               title: 'Chief Financial Officer' },
    'sig-jabu':    { name: 'Ms Jabulile Dladla',           title: 'Managing Director' },
    'sig-mike':    { name: 'Mr Mike Dotsey',               title: 'Chief Financial Officer' },
    'sig-white':   { name: 'Mr Whitemore Ngwira',          title: 'Chief Executive Officer' },
    'sig-tsekane': { name: 'Mr Tsekane Lukie Tshabalala',  title: 'Chairperson' }
  };

  var DEFAULT_SIGNATORIES = [
    { id: 'sig-md',    name: 'Ms Jabulile Dladla',           title: 'Managing Director' },
    { id: 'sig-cfo',   name: 'Mr Mike Dotsey',               title: 'Chief Financial Officer' },
    { id: 'sig-ceo',   name: 'Mr Whitemore Ngwira',          title: 'Chief Executive Officer' },
    { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala',  title: 'Chairperson' }
  ];

  /* ── Inject enhancement styles ──────────────────────────────────── */
  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '.enh-signing-section { margin-top: 48px; border-top: 3px solid #D4AF37; padding-top: 32px; }',
      '.enh-signing-title { font-family: "Playfair Display", Georgia, serif; font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 8px; text-align: center; text-transform: uppercase; letter-spacing: 1px; }',
      '.enh-signing-subtitle { font-size: 13px; color: #64748b; margin-bottom: 24px; text-align: center; }',
      '.enh-sig-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }',
      '.enh-sig-block { padding: 16px; background: #fafbfc; border: 1px solid #e2e8f0; }',
      '.enh-sig-block canvas { display: block; width: 100%; height: 120px; border: 1px solid #0A1128; cursor: crosshair; background: #ffffff; touch-action: none; }',
      '.enh-sig-label { font-size: 12px; font-weight: 700; color: #0A1128; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.5px; }',
      '.enh-sig-date { font-size: 11px; color: #94a3b8; margin-top: 4px; }',
      '.enh-sig-clear { font-size: 10px; color: #ef4444; cursor: pointer; border: none; background: none; float: right; margin-top: -20px; font-weight: 600; }',
      '.enh-sig-clear:hover { color: #b91c1c; }',
      '.enh-gold-bar { height: 3px; background: linear-gradient(90deg, #D4AF37, #F0D060, #D4AF37); margin-top: 32px; }',
      '.enh-footer { text-align: center; margin-top: 16px; font-size: 11px; color: #94a3b8; }',
      /* Edit toggle */
      '.enh-edit-bar { position: sticky; top: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 8px 16px; background: #0A1128; border-bottom: 2px solid #D4AF37; font-family: "Inter", sans-serif; }',
      '.enh-edit-btn { padding: 6px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; border: 1px solid #D4AF37; transition: all 0.2s; font-family: "JetBrains Mono", "Inter", monospace; }',
      '.enh-edit-btn.off { background: transparent; color: #D4AF37; }',
      '.enh-edit-btn.on { background: #D4AF37; color: #0A1128; }',
      '.enh-edit-label { font-size: 11px; color: rgba(245,240,232,0.5); font-family: "Inter", sans-serif; }',
      /* Editable highlight */
      '[contenteditable="true"] { outline: 2px dashed rgba(212,175,55,0.3); outline-offset: 2px; min-height: 1em; }',
      '[contenteditable="true"]:focus { outline-color: rgba(212,175,55,0.6); background: rgba(212,175,55,0.03); }',
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ── Build an enhanced signing block ────────────────────────────── */
  function createSigBlock(id, cred) {
    var block = document.createElement('div');
    block.className = 'enh-sig-block';

    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = 400;
    canvas.height = 120;

    var label = document.createElement('div');
    label.className = 'enh-sig-label';
    label.textContent = cred.name + ' — ' + cred.title;

    var dateLine = document.createElement('p');
    dateLine.className = 'enh-sig-date';
    dateLine.textContent = 'Date: _______________';

    var clearBtn = document.createElement('button');
    clearBtn.className = 'enh-sig-clear';
    clearBtn.textContent = '✕ Clear';
    clearBtn.type = 'button';
    clearBtn.addEventListener('click', function () {
      var ctx = canvas.getContext('2d');
      if (ctx) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.beginPath(); }
    });

    block.appendChild(canvas);
    block.appendChild(clearBtn);
    block.appendChild(label);
    block.appendChild(dateLine);

    return block;
  }

  /* ── Build the full enhanced signing section ────────────────────── */
  function buildSigningSection(signatories) {
    var section = document.createElement('div');
    section.className = 'enh-signing-section';

    var title = document.createElement('h3');
    title.className = 'enh-signing-title';
    title.textContent = 'Duly Signed and Approved';

    var subtitle = document.createElement('p');
    subtitle.className = 'enh-signing-subtitle';
    subtitle.textContent = 'By affixing their signatures below, the undersigned confirm that this document has been duly approved by the Board of Directors of Socinga Africa.';

    var grid = document.createElement('div');
    grid.className = 'enh-sig-grid';

    signatories.forEach(function (sig) {
      grid.appendChild(createSigBlock(sig.id, { name: sig.name, title: sig.title }));
    });

    // Footer elements
    var goldBar = document.createElement('div');
    goldBar.className = 'enh-gold-bar';

    var footer = document.createElement('p');
    footer.className = 'enh-footer';
    footer.innerHTML = '&copy; 2026 Socinga Africa Mining (Pty) Ltd. All rights reserved. Confidential &amp; Proprietary.';

    section.appendChild(title);
    section.appendChild(subtitle);
    section.appendChild(grid);
    section.appendChild(goldBar);
    section.appendChild(footer);

    return section;
  }

  /* ── Replace existing signing section or add one ────────────────── */
  function enhanceSigningPads() {
    var existingCanvases = document.querySelectorAll('canvas[id^="sig-"]');

    if (existingCanvases.length > 0) {
      // Collect signatory info from existing canvases
      var signatories = [];
      var seen = {};
      existingCanvases.forEach(function (c) {
        if (seen[c.id]) return;
        seen[c.id] = true;
        var cred = CRED[c.id];
        if (cred) {
          signatories.push({ id: c.id, name: cred.name, title: cred.title });
        }
      });

      // Find the signing section container — walk up from first canvas
      var container = existingCanvases[0];
      for (var i = 0; i < 10; i++) {
        if (!container.parentElement) break;
        container = container.parentElement;
        // Stop at the main content div or at a border-t (common signing section marker)
        if (container.className && (
          container.className.indexOf('border-t') > -1 ||
          container.className.indexOf('mt-16') > -1 ||
          container.className.indexOf('mt-12') > -1
        )) break;
      }

      // Build the enhanced section
      var enhanced = buildSigningSection(signatories);

      // Replace
      if (container && container.parentElement) {
        container.parentElement.replaceChild(enhanced, container);
      }

      // Remove old script-based clear functions from global scope
      if (typeof window.clearPad === 'function') {
        try { delete window.clearPad; } catch (e) { /* ignore */ }
      }
    } else {
      // No existing signing pads — append default section
      var mainContainer =
        document.querySelector('.max-w-4xl') ||
        document.querySelector('.max-w-5xl') ||
        document.querySelector('.container') ||
        document.querySelector('body > div') ||
        document.body;

      var enhanced = buildSigningSection(DEFAULT_SIGNATORIES);
      mainContainer.appendChild(enhanced);
    }
  }

  /* ── Initialise canvas drawing on all enhanced pads ─────────────── */
  function initAllPads() {
    document.querySelectorAll('.enh-sig-block canvas').forEach(function (canvas) {
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      var drawing = false;

      // Size canvas to its CSS dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.strokeStyle = '#0A1128';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        var r = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
      });
      canvas.addEventListener('mousemove', function (e) {
        if (!drawing) return;
        var r = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
        ctx.stroke();
      });
      canvas.addEventListener('mouseup', function () { drawing = false; });
      canvas.addEventListener('mouseleave', function () { drawing = false; });
      canvas.addEventListener('touchstart', function (e) {
        e.preventDefault(); drawing = true;
        var r = canvas.getBoundingClientRect();
        var t = e.touches[0];
        ctx.beginPath();
        ctx.moveTo(t.clientX - r.left, t.clientY - r.top);
      }, { passive: false });
      canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (!drawing) return;
        var r = canvas.getBoundingClientRect();
        var t = e.touches[0];
        ctx.lineTo(t.clientX - r.left, t.clientY - r.top);
        ctx.stroke();
      }, { passive: false });
      canvas.addEventListener('touchend', function () { drawing = false; });
    });
  }

  /* ── Add the edit toggle bar ────────────────────────────────────── */
  function addEditToggle() {
    var bar = document.createElement('div');
    bar.className = 'enh-edit-bar';

    var label = document.createElement('span');
    label.className = 'enh-edit-label';
    label.textContent = 'DOCUMENT EDITING';

    var btn = document.createElement('button');
    btn.className = 'enh-edit-btn off';
    btn.textContent = '✎ Enable Editing';
    btn.type = 'button';

    var isEditing = false;

    btn.addEventListener('click', function () {
      isEditing = !isEditing;
      btn.className = isEditing ? 'enh-edit-btn on' : 'enh-edit-btn off';
      btn.textContent = isEditing ? '✓ Editing Active' : '✎ Enable Editing';

      // Make all text content editable (but NOT canvases, scripts, styles)
      var editableNodes = document.querySelectorAll(
        'p, li, td, th, h1, h2, h3, h4, h5, h6, span.editable, div.editable'
      );
      editableNodes.forEach(function (node) {
        // Skip nodes inside the edit bar or signing blocks
        if (node.closest('.enh-edit-bar') || node.closest('.enh-sig-block')) return;
        node.contentEditable = isEditing ? 'true' : 'false';
      });
    });

    bar.appendChild(label);
    bar.appendChild(btn);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ── Main initialisation ────────────────────────────────────────── */
  function init() {
    injectStyles();
    enhanceSigningPads();
    initAllPads();
    addEditToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
