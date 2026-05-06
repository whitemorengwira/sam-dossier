/**
 * Signing Bridge — SAM Dossier
 *
 * A self-contained vanilla JavaScript shim that persists canvas-based
 * digital signatures to the SAM Dossier Supabase back-end. This script
 * is injected into each validated document's HTML at request-time by the
 * render route; it is NEVER baked into the original HTML files on disc.
 *
 * Contract:
 *   - The host document's <body> tag carries a `data-document-slug` attribute
 *     (set by the render route).
 *   - Every <canvas> with an `id` attribute is treated as a signature pad.
 *   - On mouseup / touchend the canvas data is POSTed to the signatures API.
 *   - On load, existing signatures are fetched and painted back onto canvases.
 *   - A small toast provides user feedback (bottom-right, square corners).
 *   - If the API returns 401, the bridge silently does nothing.
 *   - This script also reports the document's scrollHeight to the parent frame
 *     via postMessage so the viewer page can size the iframe dynamically.
 *
 * Language: ES2020, no modules, browser-globals only.
 * Copy: British English throughout.
 */

(function () {
  'use strict';

  var slug = document.body.getAttribute('data-document-slug');
  if (!slug) return;

  var API_BASE = '/api/validated-documents/' + slug + '/signatures';

  /* ── Toast helper ────────────────────────────────────────────────── */
  function showToast(message) {
    var el = document.createElement('div');
    el.textContent = message;
    el.style.cssText =
      'position:fixed;bottom:24px;right:24px;z-index:99999;' +
      'background:#0A1128;color:#D4AF37;padding:10px 18px;' +
      'font-family:Inter,sans-serif;font-size:12px;font-weight:600;' +
      'border:1px solid rgba(212,175,55,0.3);box-shadow:0 4px 16px rgba(0,0,0,0.3);' +
      'opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.style.opacity = '1'; });
    setTimeout(function () {
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 350);
    }, 2500);
  }

  /* ── Load existing signatures from the API ───────────────────────── */
  function loadSignatures() {
    fetch(API_BASE, { credentials: 'same-origin' })
      .then(function (res) {
        if (res.status === 401) return null;
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data)) return;
        data.forEach(function (sig) {
          var canvas = document.getElementById(sig.pad_id || sig.padId);
          if (!canvas) return;
          var ctx = canvas.getContext('2d');
          if (!ctx) return;
          var img = new Image();
          img.onload = function () {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = sig.signature_data_url || sig.dataUrl;
        });
        if (data.length > 0) showToast('Signatures loaded');
      })
      .catch(function () { /* silently fail */ });
  }

  /* ── Save a signature to the API ─────────────────────────────────── */
  function saveSignature(padId, dataUrl) {
    fetch(API_BASE, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ padId: padId, dataUrl: dataUrl }),
    })
      .then(function (res) {
        if (res.status === 401) return;
        if (res.ok) showToast('Signature saved');
      })
      .catch(function () { /* silently fail */ });
  }

  /* ── Attach listeners to every canvas ────────────────────────────── */
  function attachListeners() {
    var canvases = document.querySelectorAll('canvas[id]');
    canvases.forEach(function (canvas) {
      canvas.addEventListener('mouseup', function () {
        var dataUrl = canvas.toDataURL('image/png');
        saveSignature(canvas.id, dataUrl);
      });
      canvas.addEventListener('touchend', function () {
        var dataUrl = canvas.toDataURL('image/png');
        saveSignature(canvas.id, dataUrl);
      });
    });
  }

  /* ── Report scroll height to parent frame ────────────────────────── */
  function reportHeight() {
    if (window.parent === window) return;
    var height = document.documentElement.scrollHeight;
    window.parent.postMessage(
      { source: 'sam-dossier-bridge', type: 'resize', height: height, slug: slug },
      window.location.origin
    );
  }

  function setupResizeReporting() {
    reportHeight();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () { reportHeight(); }).observe(document.body);
    }
    window.addEventListener('resize', reportHeight);
  }

  /* ── Initialise on DOMContentLoaded ──────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachListeners();
      loadSignatures();
      setupResizeReporting();
    });
  } else {
    attachListeners();
    loadSignatures();
    setupResizeReporting();
  }
})();
