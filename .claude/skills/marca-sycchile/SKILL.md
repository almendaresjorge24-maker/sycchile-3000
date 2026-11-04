---
name: marca-sycchile
description: Diseño de marca de SYCCHILE 3.000 (Banco Solidario de Alimentos). Úsala siempre que se cree o cambie algo visible de la interfaz: colores, botones, tablas, mensajes o pie de página.
---

# Marca SYCCHILE 3.000

Personalidad: seria, solidaria y transparente. Tema oscuro, información clara, cero adornos.

## Colores (usar solo variables, nunca códigos sueltos)
| Variable | Valor | Uso |
|---|---|---|
| `--bg-dark` | #0f172a | Fondo de la página |
| `--card-bg` | #1e293b | Tarjetas y tablas |
| `--border-color` | #334155 | Bordes |
| `--text-main` | #f8fafc | Texto principal |
| `--text-muted` | #94a3b8 | Texto secundario |
| `--accent-blue` | #38bdf8 | Información, trazabilidad |
| `--accent-green` | #22c55e | Éxito, entregado, aprobado |
| `--accent-orange` | #f97316 | Pendiente, atención |
| `--accent-red` | #ef4444 | Alerta máxima, bloqueo |
| `--accent-purple` | #a855f7 | Gobernanza humana |

Semáforo de prioridad: normal = verde, media = naranja, alta = rojo. Nunca usar el color como única señal: acompañar con texto.

## Tipografía
`'Inter', system-ui, sans-serif`. Datos tipo código (lotes, RUT) en `monospace`.

## Componentes
- Botones de acción: clase `btn-action`, un solo emoji al inicio, verbo en infinitivo ("Cerrar Ciclo de Distribución").
- Aprobación humana: clase `btn-approve`, verde.
- Tablas: dentro de `table-container`, fondo `--card-bg`.

## Tono de los mensajes
- Español de Chile, directo y cercano. Frases cortas.
- Éxito: "✅ Distribución final exitosa". Bloqueo: "⚠️ Esta familia ya figura en este ciclo".
- Mensajes de AURA y KALLPA empiezan con su nombre: "AURA: ...", "KALLPA: ...".

## Firma obligatoria (pie de página)
`SYCCHILE 3.000 - JORGE ALMENDARES AROS © 2026 | Kallpa / AURA`
