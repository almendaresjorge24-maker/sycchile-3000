const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { JSDOM } = require('jsdom');

const RUTA = path.join(__dirname, '..', 'index.html');
const CLAVE = 'sycchile_padron_v2';

async function abrir(guardado) {
  const avisos = [];
  const dom = await JSDOM.fromFile(RUTA, {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) {
      w.alert = (m) => avisos.push(String(m));
      w.confirm = () => true;
      w.prompt = () => w.__resp;
      if (guardado) w.localStorage.setItem(CLAVE, guardado);
    },
  });
  if (dom.window.document.readyState !== 'complete')
    await new Promise((r) => dom.window.addEventListener('load', r));
  return { w: dom.window, avisos };
}
const filas = (w) => w.document.querySelectorAll('#listaBeneficiariosBody tr').length;
const registrar = (w, t) => { w.__resp = t; w.verificarBeneficiario(); };

test('CA1: bloquea duplicados ignorando tildes, mayúsculas, espacios, puntos y guion', async () => {
  const { w, avisos } = await abrir();
  registrar(w, 'María González');
  const base = filas(w);
  registrar(w, '  maria   GONZALEZ ');
  assert.equal(filas(w), base);
  registrar(w, '12.345.678-5');
  const conRut = filas(w);
  registrar(w, '123456785');
  assert.equal(filas(w), conRut);
  assert.ok(avisos.filter((a) => a.includes('ya figura')).length >= 2);
});

test('CA2: rechaza RUT con dígito verificador incorrecto', async () => {
  const { w, avisos } = await abrir();
  const base = filas(w);
  registrar(w, '12.345.678-9');
  assert.equal(filas(w), base);
  assert.ok(avisos.some((a) => a.includes('RUT inválido')));
  registrar(w, '12.345.678-5');
  assert.equal(filas(w), base + 1);
});

test('CA3: el código escrito se muestra como texto y no se ejecuta', async () => {
  const { w } = await abrir();
  const malo = '<img src=x onerror="window.__pwn=1">';
  registrar(w, malo);
  const tb = w.document.getElementById('listaBeneficiariosBody');
  assert.equal(tb.querySelector('img'), null);
  assert.ok(tb.textContent.includes(malo));
  assert.equal(w.__pwn, undefined);
});

test('CA4: al recargar aparece el padrón del ciclo activo', async () => {
  const a = await abrir();
  registrar(a.w, 'Ana Soto');
  registrar(a.w, '12.345.678-5');
  const guardado = a.w.localStorage.getItem(CLAVE);
  const b = await abrir(guardado);
  const texto = b.w.document.getElementById('listaBeneficiariosBody').textContent;
  assert.ok(texto.includes('Ana Soto') && texto.includes('12.345.678-5'));
  assert.equal(filas(b.w), filas(a.w));
});

test('CA5: cerrar ciclo exige aprobación; luego la familia puede recibir de nuevo', async () => {
  const { w, avisos } = await abrir();
  registrar(w, '12.345.678-5');
  w.cerrarCiclo();
  assert.ok(avisos.some((a) => a.includes('Validation Lead')));
  assert.equal(w.document.getElementById('cicloActivo').textContent, '1');
  w.eval('aprobadoLead = true');
  w.cerrarCiclo();
  assert.equal(w.document.getElementById('cicloActivo').textContent, '2');
  assert.equal(filas(w), 0);
  registrar(w, '12.345.678-5');
  assert.equal(filas(w), 1);
});
