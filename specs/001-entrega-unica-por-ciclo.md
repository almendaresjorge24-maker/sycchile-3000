# Spec 001 — Entrega única por ciclo (equidad en la distribución final)

Estado: validada por Jorge Almendares Aros.
Origen: generada con IA a partir de un prompt de Jorge. Debe ser mejorada y validada por él.

## 1. Problema
La promesa central de SYCCHILE 3.000 es la equidad: ninguna familia recibe dos veces en un mismo ciclo.
Hoy el padrón falla en cuatro puntos:
- "María González" y "maria  gonzalez" cuentan como familias distintas, y un RUT con puntos o sin ellos también.
- Un RUT con dígito verificador errado se acepta, así que el duplicado no se detecta.
- El aviso habla de "este ciclo", pero el ciclo no existe: una familia quedaría bloqueada para siempre.
- Lo guardado no se ve al recargar la página, y lo escrito se inserta como HTML (riesgo de código malicioso).

Usuario: la persona de entrega final en bodega, bajo la supervisión del Validation Lead.
Si falla, AURA no puede garantizar equidad ante donantes ni familias.

## 2. Solución
- Se ingresa un RUT o un nombre. Si parece RUT (7 u 8 dígitos y dígito verificador), se valida con módulo 11.
- Identidad para comparar: RUT sin puntos ni guion; o nombre sin tildes, en minúscula y con espacios simples.
- Si la identidad ya figura en el ciclo activo, se bloquea y no se agrega fila.
- Cada registro guarda nombre, fecha y hora, y número de ciclo en `localStorage` (clave `sycchile_padron_v2`).
- Al abrir la página se dibuja el padrón del ciclo activo.
- Botón "Cerrar Ciclo": solo si el Validation Lead ya aprobó y confirma. Archiva los registros y sube el ciclo.
- Las filas se arman con `textContent`, nunca con `innerHTML`.

Fuera de alcance: cifrado, servidor, varios usuarios, exportar a Excel.

## 3. Criterios de aceptación
- CA1. Si el RUT o nombre ya figura en el ciclo activo, ignorando mayúsculas, tildes, espacios dobles, puntos y guion, se bloquea y el padrón no suma filas.
- CA2. Un RUT con dígito verificador incorrecto se rechaza con aviso y no se registra. `12.345.678-5` es válido y `12.345.678-9` no.
- CA3. Un nombre con código (por ejemplo `<img src=x onerror=...>`) se muestra como texto y no se ejecuta.
- CA4. Al recargar la página, el padrón del ciclo activo aparece completo.
- CA5. "Cerrar Ciclo" no hace nada sin aprobación del Validation Lead. Con aprobación y confirmación, sube el ciclo, vacía el padrón activo y la misma familia puede recibir de nuevo.

## 4. Cómo se verifica
Cada criterio tiene una prueba automática en `tests/criterios.test.js` (nombres CA1 a CA5). Se ejecutan con `npm test`
y también en GitHub, en la pestaña Actions, cada vez que se sube un cambio.

## 5. Validación (la completa Jorge)
- [x] Leí el problema y la solución, y reflejan cómo se trabaja en terreno.
- Ajustes que hice yo a esta spec: Sin cambios: la revisé y estoy de acuerdo.
- Validada por: Jorge Almendares Aros — Fecha:   04/ 11/ 2026 
