# SYCCHILE 3.000 — Instrucciones para el agente

## Qué es
Sistema Integrado de Gestión Logística del Banco Solidario de Alimentos.
Una sola página (`index.html`) servida con Nginx dentro de Docker.
Gobernanza humana: Jorge Almendares Aros (Validation Lead).

## Agentes del dominio
- KALLPA: bodega. Salida FIFO estricta y trazabilidad hacia atrás.
- AURA: auditoría. Equidad y trazabilidad hacia adelante (distribución final).

## Reglas de código
- Un solo archivo `index.html`. Sin frameworks ni librerías externas. JavaScript simple, sin módulos.
- Textos visibles en español de Chile. Sin términos en inglés nuevos.
- Prohibido `innerHTML` con texto escrito por personas. Usar `textContent` o `createElement`.
- Datos de familias: solo en el navegador (`localStorage`, clave con versión). Nunca enviarlos por red.
- Toda operación sensible exige la aprobación humana (`aprobadoLead`) y termina llamando a `resetearSupervisionHumana()`.
- Marca y estilo: usar la skill `marca-sycchile`. No inventar colores.

## Forma de trabajar (Spec Driven Development)
1. La spec manda (la del ejercicio es `specs/001`; las demás están en `specs/mejoras-posteriores/`). Si un criterio falla, se corrige la spec antes que el prompt.
2. Antes de dar algo por terminado: `npm test` debe pasar.
3. Cambios pequeños y explicados en pocas líneas.

## Seguridad y autoría (no relajar sin autorización)
- No quitar de `nginx.conf` ni `docker-compose.yml`: solo lectura, sin permisos especiales, acceso solo desde `127.0.0.1`.
- Mantener `© 2026 Jorge Almendares Aros` en el pie de página y `LICENSE.txt`.

## Respuestas al usuario
Español, tono cercano, pasos cortos y un comando a la vez.

## Agentes conectados (spec 002)
- Las reglas deciden, la IA recomienda, el humano aprueba. Nunca dejar que la IA decida un bloqueo o un despacho.
- A la nube solo van lotes y conteos. Jamás nombres ni RUT. La lista blanca está en `agentes/server.js`.
- Las claves de Azure solo en `.env` (no se sube). El HTML nunca lleva claves.
- Todo texto nuevo visible va en el diccionario de idiomas (`textosNuevos`). No inventar palabras en Mapudungun: si no está verificado, queda en español.

## Spec visible en la app
El segmento "Spec" de `index.html` resume la spec 001 (`textosSdd`). Si cambia la spec 001, actualizar también ese segmento y sus traducciones.
