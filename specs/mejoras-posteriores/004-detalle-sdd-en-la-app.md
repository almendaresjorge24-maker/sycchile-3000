# Spec 004 — Detalle de Spec Driven Development visible en la aplicación

Estado: borrador para validación de Jorge.

## 1. Problema
El segmento "Prompts Base y Especificación del Sistema (Spec)" solo mostraba el prompt original.
Quien usa o revisa la aplicación no podía ver cómo se construyó: ni los requisitos del método ni los criterios de aceptación.

## 2. Solución
- Dentro de ese mismo segmento, un bloque desplegable "Spec Driven Development: cómo se construyó este sistema".
- Contenido: los 4 requisitos (contexto, spec, skill, implementación), el problema y la solución de la spec 001, sus criterios CA1 a CA5 y el principio "las reglas deciden, la IA recomienda, la persona aprueba".
- Arranca cerrado, para no empujar hacia abajo la interfaz de los voluntarios.
- Se traduce con el selector de idioma. Mapudungun usa español hasta que lo valide una persona hablante.

## 3. Criterios de aceptación
- CA16. El segmento muestra el bloque con los 4 requisitos y los criterios CA1 a CA5.
- CA17. Al cambiar de idioma el bloque cambia; en Mapudungun queda en español.
- CA18. El bloque arranca cerrado.
