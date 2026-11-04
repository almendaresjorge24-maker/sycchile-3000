# Spec 003 — Mesa de agentes interactiva (KALLPA ⇄ AURA y el operador)

Estado: borrador para validación de Jorge.

## 1. Problema
Hoy KALLPA y AURA solo reaccionan a eventos: nadie puede preguntarles algo y no se revisan entre sí.
La "validación cruzada" del panel la hace en silencio la persona que lee dos mensajes sueltos.

## 2. Solución
- **Diálogo:** en cada consulta KALLPA propone (qué lote sale primero) y AURA revisa esa propuesta desde la equidad. Ambos mensajes quedan en la "mesa" en ese orden.
- **Preguntas:** el operador elige KALLPA o AURA, escribe una pregunta corta y recibe respuesta en la mesa.
- **Privacidad:** antes de enviar se ocultan secuencias parecidas a un RUT, y el servicio vuelve a limpiarlas. El cuadro avisa "no escribas nombres ni RUT".
- **Sin servicio:** el diálogo sigue con reglas locales y las preguntas muestran el estado local con el aviso "modo contingencia: sin conversación libre".
- Los agentes nunca ejecutan acciones: recomiendan y la persona aprueba.

## 3. Criterios de aceptación (con prueba en `tests/`)
- CA12. En cada consulta, la propuesta de KALLPA viaja a AURA y la mesa muestra primero a KALLPA y luego a AURA revisándola.
- CA13. Al preguntar, la pregunta sale sin secuencias tipo RUT y la respuesta aparece en la mesa.
- CA14. Sin servicio, preguntar muestra el estado con reglas locales y el aviso de modo contingencia.
- CA15. El servicio limpia la pregunta y la propuesta (RUT y HTML) antes de enviarlas a Azure.
