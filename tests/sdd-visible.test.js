const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { JSDOM } = require('jsdom');

async function abrir() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) { w.alert = () => {}; w.confirm = () => true; w.prompt = () => null; },
  });
  if (dom.window.document.readyState !== 'complete') await new Promise((r) => dom.window.addEventListener('load', r));
  return dom.window;
}
const txt = (w, id) => w.document.getElementById(id).textContent;

test('CA16: el segmento Spec muestra los 4 requisitos y los criterios CA1 a CA5', async () => {
  const w = await abrir();
  const panel = w.document.querySelector('.spec-top-panel');
  assert.ok(panel.contains(w.document.getElementById('sddDetalle')));
  assert.ok(txt(w, 'txtSddTitulo').includes('Spec Driven Development'));
  const metodo = txt(w, 'txtSddMetodo');
  ['AGENTS.md', 'Entrega única por ciclo', 'marca-sycchile', 'prueba automática'].forEach((p) => assert.ok(metodo.includes(p), p));
  ['CA1.', 'CA2.', 'CA3.', 'CA4.', 'CA5.'].forEach((c) => assert.ok(txt(w, 'txtSddCriterios').includes(c), c));
});

test('CA17: cambia con el idioma; Mapudungun queda en español', async () => {
  const w = await abrir();
  const es = txt(w, 'txtSddTitulo');
  const idioma = (l) => { w.document.getElementById('idiomaSelect').value = l; w.cambiarIdioma(); };
  idioma('en'); assert.ok(txt(w, 'txtSddTitulo').includes('how this system was built'));
  idioma('fr'); assert.ok(txt(w, 'txtSddTitulo').includes('comment ce système'));
  idioma('pt'); assert.ok(txt(w, 'txtSddTitulo').includes('como este sistema'));
  idioma('ht'); assert.ok(txt(w, 'txtSddTitulo').includes('ki jan'));
  idioma('map'); assert.equal(txt(w, 'txtSddTitulo'), es);
});

test('CA18: el bloque arranca cerrado', async () => {
  const w = await abrir();
  assert.equal(w.document.getElementById('sddDetalle').open, false);
});
