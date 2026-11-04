const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { JSDOM } = require('jsdom');

const RUTA = path.join(__dirname, '..', 'index.html');

async function abrir(fetchFalso) {
  const avisos = [];
  const dom = await JSDOM.fromFile(RUTA, {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) {
      w.alert = (m) => avisos.push(String(m));
      w.confirm = () => true;
      w.prompt = () => w.__resp;
      // jsdom no implementa innerText (los navegadores sí): se iguala a textContent
      Object.defineProperty(w.HTMLElement.prototype, 'innerText', {
        get() { return this.textContent; }, set(v) { this.textContent = v; }, configurable: true,
      });
      if (fetchFalso) w.fetch = fetchFalso;
    },
  });
  if (dom.window.document.readyState !== 'complete') await new Promise((r) => dom.window.addEventListener('load', r));
  return { w: dom.window, avisos };
}
const ok = (texto) => Promise.resolve({ ok: true, json: () => Promise.resolve({ texto }) });
const el = (w, id) => w.document.getElementById(id);
const registrar = (w, t) => { w.__resp = t; w.verificarBeneficiario(); };

test('CA6: con el servicio disponible dice Conectado y muestra la recomendación con aviso humano', async () => {
  const enviados = [];
  const { w } = await abrir((url, op) => { enviados.push(op.body); return ok('Despachar #LOT-8842 primero.'); });
  registrar(w, 'Ana Soto');
  await w.consultarAgentes();
  assert.ok(el(w, 'statusBadge').textContent.includes('Conectado'));
  assert.ok(el(w, 'kallpaIA').textContent.includes('Despachar #LOT-8842'));
  assert.ok(el(w, 'kallpaIA').textContent.includes('requiere aprobación humana'));
  assert.ok(enviados.length >= 2);
  // CA8 en la página: nunca viajan nombres ni RUT
  assert.ok(enviados.every((b) => !/Ana|Soto|rut|nom:/i.test(b)));
});

test('CA7: sin servicio dice contingencia y los agentes responden con reglas locales', async () => {
  const { w } = await abrir(() => Promise.reject(new Error('sin red')));
  await w.consultarAgentes();
  assert.ok(el(w, 'statusBadge').textContent.includes('contingencia'));
  assert.ok(!el(w, 'statusBadge').textContent.includes('Conectado'));
  assert.ok(el(w, 'kallpaIA').textContent.includes('reglas locales'));
  assert.ok(el(w, 'kallpaIA').textContent.includes('#LOT-8842'));
  assert.ok(el(w, 'auraIA').textContent.includes('reglas locales'));
});

test('CA9: el texto de la IA no se ejecuta como HTML', async () => {
  const { w } = await abrir(() => ok('<img src=x onerror="window.__pwn=1">'));
  await w.consultarAgentes();
  assert.equal(el(w, 'kallpaIA').querySelector('img'), null);
  assert.ok(el(w, 'kallpaIA').textContent.includes('<img'));
  assert.equal(w.__pwn, undefined);
});

test('CA10: el despacho saca primero el lote que vence antes, no la última donación', async () => {
  const { w } = await abrir();
  w.__resp = 'Arroz';
  w.registrarIngresoInteractive();
  w.procesarDespachoInteractive();
  const filas = Array.from(w.document.querySelectorAll('#tablaInventario tbody tr'));
  const filaLeche = filas.find((f) => f.cells[0].textContent.includes('#LOT-8842'));
  const filaArroz = filas.find((f) => f.cells[1].textContent.includes('Arroz'));
  assert.ok(filaLeche.cells[4].textContent.includes('Despachado'));
  assert.ok(!filaArroz.cells[4].textContent.includes('Despachado'));
});

test('CA11: avisos y botones nuevos cambian de idioma; Mapudungun no muestra términos sin verificar', async () => {
  const { w, avisos } = await abrir();
  const idioma = (l) => { el(w, 'idiomaSelect').value = l; w.cambiarIdioma(); };
  idioma('en');
  registrar(w, '12.345.678-9');
  assert.ok(avisos.at(-1).includes('Invalid RUT'));
  assert.equal(el(w, 'btnCerrarCiclo').textContent, '🔒 Close Distribution Cycle');
  idioma('fr');
  assert.ok(el(w, 'btnCerrarCiclo').textContent.includes('Clôturer'));
  idioma('pt');
  assert.ok(!el(w, 'txtBtnBeneficiario').textContent.includes('Distribución'));
  idioma('ht');
  assert.ok(el(w, 'txtCiclo').textContent === 'Sik');
  idioma('map');
  assert.equal(el(w, 'btnIngreso').textContent, '➕ Registrar Nueva Donación');
  assert.ok(!/Pewma|Kimeltun|Koyaktun/.test(w.document.body.textContent));
  assert.equal(w.document.documentElement.lang, 'arn');
});

test('CA12: KALLPA propone, AURA revisa esa propuesta y la mesa los muestra en ese orden', async () => {
  const enviados = [];
  const { w } = await abrir((url, op) => {
    const agente = url.split('/').pop();
    enviados.push({ agente, cuerpo: JSON.parse(op.body) });
    return ok(agente === 'kallpa' ? 'Despachar #LOT-8842 primero.' : 'De acuerdo con KALLPA.');
  });
  await w.consultarAgentes();
  const aura = enviados.filter((e) => e.agente === 'aura').at(-1);
  assert.equal(aura.cuerpo.propuesta, 'Despachar #LOT-8842 primero.');
  const mesa = el(w, 'mesaLog').textContent;
  assert.ok(mesa.indexOf('KALLPA (IA') !== -1 && mesa.indexOf('AURA revisa a KALLPA') > mesa.indexOf('KALLPA (IA'));
});

test('CA13: la pregunta sale sin RUT y la respuesta aparece en la mesa', async () => {
  const enviados = [];
  const { w } = await abrir((url, op) => { enviados.push({ agente: url.split('/').pop(), cuerpo: JSON.parse(op.body) }); return ok('Hoy sale la leche.'); });
  el(w, 'agenteDestino').value = 'kallpa';
  el(w, 'preguntaAgente').value = '¿Qué lote sale hoy? Mi RUT es 12.345.678-5';
  await w.preguntarAgente();
  const q = enviados.filter((e) => e.cuerpo.pregunta).at(-1);
  assert.equal(q.agente, 'kallpa');
  assert.ok(!q.cuerpo.pregunta.includes('12.345'));
  assert.ok(el(w, 'mesaLog').textContent.includes('Hoy sale la leche.'));
  assert.equal(el(w, 'preguntaAgente').value, '');
});

test('CA14: sin servicio, preguntar muestra el estado local y el aviso de contingencia', async () => {
  const { w } = await abrir(() => Promise.reject(new Error('sin red')));
  el(w, 'agenteDestino').value = 'aura';
  el(w, 'preguntaAgente').value = '¿Cómo va la equidad?';
  await w.preguntarAgente();
  const mesa = el(w, 'mesaLog').textContent;
  assert.ok(mesa.includes('reglas locales'));
  assert.ok(mesa.includes('Modo contingencia'));
});
