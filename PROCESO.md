# Cómo se construyó SYCCHILE 3.000 (Spec Driven Development)

Este documento resume el método de trabajo del proyecto. No contiene claves ni datos de personas.

## 1. Contexto
SYCCHILE 3.000 es el sistema del Banco Solidario de Alimentos: controla existencias con salida por vencimiento (agente KALLPA)
y audita la entrega justa a las familias (agente AURA), siempre con aprobación humana.
Jorge Almendares Aros, en calidad de autor, tenía la página casi terminada y la reconstruyó con Spec Driven Development.

## 2. Método
1. Contexto persistente: `AGENTS.md`.
2. Especificación de un solo feature: `specs/001-entrega-unica-por-ciclo.md` (entrega única por ciclo, 5 criterios verificables).
3. Skill de marca: `.claude/skills/marca-sycchile/SKILL.md`, con los colores y reglas de la propia aplicación.
4. Implementación con un agente de IA, usando el contexto y la spec, y una prueba automática por criterio (`npm test`).

## 3. Ejemplos en que la especificación fue primero
- **Agentes conectados:** al revisar el despacho "FIFO" se vio que sacaba la última donación y no el lote que vence antes.
  Se escribió en la spec (problema y criterio CA10) y después se corrigió el código y se agregó la prueba.
- **Mesa de agentes interactiva:** el autor planteó que los agentes debían ser interactivos.
  Se redactó primero la spec con sus criterios y luego se escribió el código.
- **Correcciones sin cambiar la spec:** dos pruebas fallaron por un límite del entorno de pruebas y por términos dudosos de Mapudungun
  que seguían en el código. Se corrigió el código, porque la spec ya decía lo correcto.

## 4. Decisiones del autor
Elegir este proyecto como base, exigir idiomas correctos para cada lengua, pedir agentes conectados e interactivos
y publicar el resultado en GitHub y GitHub Pages.

## 5. Aportes del autor a la especificación
- Ajustes del autor a la spec 001: sin modificaciones; el autor revisó la especificación y la valida conforme.
- Propuesta del agente modificada por el autor: se sustituyó el término "ejercicio de capacitación" del aviso de la aplicación por "prototipo de demostración", con el fin de adoptar un lenguaje corporativo.

## 6. Mejoras previstas
- Inicio de sesión para la persona que aprueba como Validation Lead.
- Validación de los textos en Mapudungun y Kreyòl por personas hablantes.
- Prueba de la conexión con Azure con credenciales reales (hoy se probó con un servicio simulado).
- Revisión legal del tratamiento de datos personales (Ley 21.719) antes de usarlo con familias reales.
