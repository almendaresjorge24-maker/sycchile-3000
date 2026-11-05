# SYCCHILE 3.000 — Banco Solidario de Alimentos
Gestión logística con salida por vencimiento (Kallpa) y auditoría de equidad (Aura).
Principio: las reglas deciden, la IA recomienda, el humano aprueba.

## Entrega del ejercicio "De prompt a especificación"
| Requisito | Dónde está |
|---|---|
| 1. Contexto persistente | `AGENTS.md` (y `CLAUDE.md`, que apunta a él) |
| 2. Especificación de un feature | `specs/001-entrega-unica-por-ciclo.md` (5 criterios verificables) |
| 3. Skill de diseño de marca | `.claude/skills/marca-sycchile/SKILL.md` |
| 4. Implementación del feature | `index.html` y pruebas en `tests/criterios.test.js` |
| Cómo se trabajó | `PROCESO.md` |

Para ejecutar las pruebas: `npm install` y luego `npm test`. En GitHub corren solas en la pestaña Actions.

## Prueba rápida (regla técnica: validar familia)
Abre `index.html` y comprueba en un minuto los criterios de la spec 001, sin leer código:
1. Presiona **🔍 Validar Familia / Beneficiario** y escribe "María González". Queda registrada.
2. Repite escribiendo "maria gonzalez". Se bloquea como duplicada (CA1).
3. Prueba con el RUT `12.345.678-9`. Se rechaza por dígito verificador incorrecto (CA2).
4. Recarga la página. El padrón sigue ahí (CA4).

Usa solo datos ficticios.

## Mejoras posteriores
En `specs/mejoras-posteriores/`: agentes Kallpa y Aura conectados a Azure, idiomas e interacción entre agentes y el detalle de Spec Driven Development visible en la app.
El servicio de los agentes está en `agentes/` (las claves van en `.env`, que no se sube).

## Despliegue seguro
`Dockerfile`, `docker-compose.yml` y `nginx.conf`: la aplicación queda en `http://localhost:8080`, en solo lectura y sin permisos especiales.

## Pendientes antes de uso real
- Validar los textos en Mapudungun y Kreyòl con personas hablantes.
- Inicio de sesión real para el Validation Lead.
- Revisar el tratamiento de datos personales con un abogado (Ley 21.719).

© 2026 Jorge Almendares Aros. Todos los derechos reservados (ver `LICENSE.txt`).

Demo: https://almendaresjorge24-maker.github.io/sycchile-3000/
