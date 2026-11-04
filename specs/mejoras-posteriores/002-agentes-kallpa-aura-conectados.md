# Spec 002 — KALLPA y AURA como agentes conectados

Estado: borrador para validación de Jorge.

## 1. Problema
La etiqueta "Conectado a la Nube (Azure AI Foundry)" era solo texto: no había conexión ni agentes reales.
Además el despacho "FIFO" entregaba la primera fila de la tabla, que es la donación más reciente, y dejaba para después el lote que vence en 3 días.
Los textos nuevos del sistema estaban solo en español y varios idiomas tenían errores (Mapudungun con palabras dudosas, portugués con palabras en español).

## 2. Solución
- Un servicio interno (`agentes/`) recibe las consultas de KALLPA y AURA y las envía a un modelo desplegado en Azure. Las claves viven en `.env`, nunca en el HTML.
- Principio: **las reglas deciden, la IA recomienda, el humano aprueba.** El bloqueo de doble entrega y el orden de despacho se calculan siempre en la página con reglas fijas.
- Privacidad: a la nube solo viajan lotes (código, alimento, kg, días) y conteos del ciclo. Nunca nombres ni RUT. El servicio descarta cualquier otro campo.
- Si el servicio no responde en 6 segundos, la página sigue con reglas locales ("modo contingencia") y lo dice con verdad en la etiqueta de estado.
- La respuesta de la IA se muestra como texto y con el aviso "requiere aprobación humana".
- Despacho por vencimiento: sale primero el lote que vence antes, y se despacha su stock real.
- Idiomas: textos nuevos en español, Kreyòl, inglés, francés y portugués. Mapudungun solo con lo verificado; lo demás cae al español hasta que lo valide una persona hablante.

## 3. Criterios de aceptación (con prueba en `tests/`)
- CA6. Con el servicio disponible, la etiqueta dice "Conectado" y se ve la recomendación de KALLPA con el aviso de aprobación humana.
- CA7. Sin servicio, la etiqueta dice "contingencia" y KALLPA y AURA responden con reglas locales.
- CA8. Los datos enviados a los agentes no contienen nombres ni RUT de familias, y el servicio descarta campos no permitidos.
- CA9. El texto devuelto por la IA nunca se ejecuta como HTML.
- CA10. "Procesar Despacho" despacha el lote que vence antes, no la última donación registrada.
- CA11. Al cambiar de idioma, los avisos y botones nuevos aparecen en ese idioma, y Mapudungun no muestra términos sin verificar.
