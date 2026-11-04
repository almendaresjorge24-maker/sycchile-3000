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

test('CA19: el aviso de modo demostración se ve al cargar, antes del segmento Spec', async () => {
  const w = await abrir();
  const aviso = w.document.getElementById('avisoDemo');
  assert.ok(aviso.textContent.includes('Prototipo de demostración'));
  assert.ok(aviso.textContent.includes('no identifica a nadie'));
  const spec = w.document.querySelector('.spec-top-panel');
  assert.ok(aviso.compareDocumentPosition(spec) & w.Node.DOCUMENT_POSITION_FOLLOWING);
});

test('CA20: el aviso cambia con el idioma; en Mapudungun queda en español', async () => {
  const w = await abrir();
  const es = w.document.getElementById('avisoDemo').textContent;
  const idioma = (l) => { w.document.getElementById('idiomaSelect').value = l; w.cambiarIdioma(); return w.document.getElementById('avisoDemo').textContent; };
  assert.ok(idioma('en').includes('Demonstration prototype'));
  assert.ok(idioma('fr').includes('Prototype de démonstration'));
  assert.ok(idioma('pt').includes('Protótipo de demonstração'));
  assert.ok(idioma('ht').includes('Pwototip demonstrasyon'));
  assert.equal(idioma('map'), es);
});
